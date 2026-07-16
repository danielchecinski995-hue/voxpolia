/**
 * ── EXTRACTED FROM THE GAME ──────────────────────────────────────────────
 * Vendored verbatim from Demolition-Town `src/building/sweepCore.ts`.
 * This is the shared source of truth for structural collapse (WEBSITE_PLAN §3).
 * Keep it a pure copy — do NOT hand-edit the algorithm here; if the game's
 * sweep changes, re-copy. It has zero THREE/DOM deps, which is exactly why the
 * plan singles it out for reuse on the site.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Structural sweep core for the sweep worker — the same three-phase
 * algorithm as BuildingCluster's time-sliced sweep (vertical/diagonal
 * grounding → cantilever span BFS → load flow with lateral redistribution
 * and crush), ported to flat typed arrays with no THREE and no DOM.
 *
 * Inputs are zero-copy SAB views owned by the main thread (aliveFlags,
 * gridIdx) plus a one-time transferred packed-coords array. The worker
 * runs a FULL sweep in one burst (it has its own thread — no time
 * slicing), which makes crush cascades converge in a few 100-ms beats
 * instead of multi-second nibbling.
 *
 * PARITY: sweepCore.test.ts asserts this port and the cluster's sweep
 * return identical results on the same state — keep them in lockstep.
 */

/** One-sided cantilever reach cap — MUST equal BuildingCluster.MAX_CANTILEVER
 *  (parity asserted by sweepCore.test.ts). */
const MAX_CANTILEVER = 18;
/** Cantilever scan reach — MUST equal BuildingCluster.CANT_SCAN (parity). */
const CANT_SCAN = 96;

export interface SweepInit {
  /** gx | gy<<10 | gz<<20, blocks order (gy-ascending). */
  coords: Int32Array;
  aliveFlags: Uint8Array;
  gridIdx: Int32Array;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  maxSpan: number;
  diagonalGrounding: boolean;
  crushLoad: number;
}

export interface SweepResult {
  /** Alive blocks that detached (unreachable) or crushed (overload). */
  detached: Int32Array;
  /** True when any cell crushed — the caller re-arms a follow-up sweep. */
  crushed: boolean;
}

export class SweepCore {
  private readonly coords: Int32Array;
  private readonly alive: Uint8Array;
  private readonly gridIdx: Int32Array;
  private readonly sizeX: number;
  private readonly sizeY: number;
  private readonly sizeZ: number;
  private readonly maxSpan: number;
  private readonly diagonalGrounding: boolean;
  private readonly crushLoad: number;

  private readonly visited: Uint8Array;
  private readonly grounded: Uint8Array;
  private readonly spanOf: Uint8Array;
  private readonly queue: Int32Array;
  private readonly loadOf: Float32Array | null;

  constructor(init: SweepInit) {
    this.coords = init.coords;
    this.alive = init.aliveFlags;
    this.gridIdx = init.gridIdx;
    this.sizeX = init.sizeX;
    this.sizeY = init.sizeY;
    this.sizeZ = init.sizeZ;
    this.maxSpan = init.maxSpan;
    this.diagonalGrounding = init.diagonalGrounding;
    this.crushLoad = init.crushLoad;
    const n = init.coords.length;
    this.visited = new Uint8Array(n);
    this.grounded = new Uint8Array(n);
    this.spanOf = new Uint8Array(n);
    this.queue = new Int32Array(n);
    this.loadOf = Number.isFinite(init.crushLoad) ? new Float32Array(n) : null;
  }

  /** Alive-cell index at grid coords, or -1. */
  private aliveAt(gx: number, gy: number, gz: number): number {
    if (gx < 0 || gy < 0 || gz < 0 || gx >= this.sizeX || gy >= this.sizeY || gz >= this.sizeZ) {
      return -1;
    }
    const idx = this.gridIdx[gx + gy * this.sizeX + gz * this.sizeX * this.sizeY]!;
    return idx >= 0 && this.alive[idx] === 1 ? idx : -1;
  }

  /** A cell rests on the ground, on an alive cell directly below, or on an
   *  alive below-diagonal (stair tread / slope). Parity with
   *  BuildingCluster.isAnchor — checked always. */
  private isAnchor(gx: number, gy: number, gz: number): boolean {
    if (gy === 0) return true;
    return this.aliveAt(gx, gy - 1, gz) >= 0
      || this.aliveAt(gx - 1, gy - 1, gz) >= 0
      || this.aliveAt(gx + 1, gy - 1, gz) >= 0
      || this.aliveAt(gx, gy - 1, gz - 1) >= 0
      || this.aliveAt(gx, gy - 1, gz + 1) >= 0
      || this.aliveAt(gx - 1, gy - 1, gz - 1) >= 0
      || this.aliveAt(gx - 1, gy - 1, gz + 1) >= 0
      || this.aliveAt(gx + 1, gy - 1, gz - 1) >= 0
      || this.aliveAt(gx + 1, gy - 1, gz + 1) >= 0;
  }

  /** Lateral support classification going (dx,dz): step to nearest anchor
   *  (1..CANT_SCAN), 0 = OPEN (void/edge first), CANT_SCAN+1 = FAR (material
   *  continues, supported). Parity with BuildingCluster.anchorDist. */
  private anchorDist(gx: number, gy: number, gz: number, dx: number, dz: number): number {
    for (let s = 1; s <= CANT_SCAN; s++) {
      const cx = gx + dx * s;
      const cz = gz + dz * s;
      if (this.aliveAt(cx, gy, cz) < 0) return 0; // OPEN: void/edge
      if (this.isAnchor(cx, gy, cz)) return s;
    }
    return CANT_SCAN + 1; // FAR: continuous material
  }

  run(): SweepResult {
    const coords = this.coords;
    const alive = this.alive;
    const visited = this.visited;
    const grounded = this.grounded;
    const spanOf = this.spanOf;
    const queue = this.queue;
    const n = coords.length;
    visited.fill(0);
    grounded.fill(0);
    let tail = 0;

    // Phase 0: vertical (+ optional diagonal) grounding, gy-ascending.
    for (let idx = 0; idx < n; idx++) {
      if (alive[idx] !== 1) continue;
      const c = coords[idx]!;
      const gx = c & 1023;
      const gy = (c >> 10) & 1023;
      const gz = (c >> 20) & 1023;
      if (gy === 0) {
        grounded[idx] = 1;
      } else {
        const below = this.aliveAt(gx, gy - 1, gz);
        if (below >= 0 && grounded[below] === 1) {
          grounded[idx] = 1;
        } else if (this.diagonalGrounding) {
          const g1 = this.aliveAt(gx - 1, gy - 1, gz);
          const g2 = this.aliveAt(gx + 1, gy - 1, gz);
          const g3 = this.aliveAt(gx, gy - 1, gz - 1);
          const g4 = this.aliveAt(gx, gy - 1, gz + 1);
          if (
            (g1 >= 0 && grounded[g1] === 1) || (g2 >= 0 && grounded[g2] === 1)
            || (g3 >= 0 && grounded[g3] === 1) || (g4 >= 0 && grounded[g4] === 1)
          ) {
            grounded[idx] = 1;
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
      visited[idx] = 1;
      spanOf[idx] = this.maxSpan;
      queue[tail++] = idx;
    }

    // Phase 1: cantilever span BFS from grounded seeds.
    let head = 0;
    while (head < tail) {
      const idx = queue[head++]!;
      const span = spanOf[idx]! - 1;
      if (span < 0) continue;
      const c = coords[idx]!;
      const gx = c & 1023;
      const gy = (c >> 10) & 1023;
      const gz = (c >> 20) & 1023;
      let m = this.aliveAt(gx + 1, gy, gz);
      if (m >= 0 && visited[m] === 0) { visited[m] = 1; spanOf[m] = span; if (span > 0) queue[tail++] = m; }
      m = this.aliveAt(gx - 1, gy, gz);
      if (m >= 0 && visited[m] === 0) { visited[m] = 1; spanOf[m] = span; if (span > 0) queue[tail++] = m; }
      m = this.aliveAt(gx, gy + 1, gz);
      if (m >= 0 && visited[m] === 0) { visited[m] = 1; spanOf[m] = span; if (span > 0) queue[tail++] = m; }
      m = this.aliveAt(gx, gy - 1, gz);
      if (m >= 0 && visited[m] === 0) { visited[m] = 1; spanOf[m] = span; if (span > 0) queue[tail++] = m; }
      m = this.aliveAt(gx, gy, gz + 1);
      if (m >= 0 && visited[m] === 0) { visited[m] = 1; spanOf[m] = span; if (span > 0) queue[tail++] = m; }
      m = this.aliveAt(gx, gy, gz - 1);
      if (m >= 0 && visited[m] === 0) { visited[m] = 1; spanOf[m] = span; if (span > 0) queue[tail++] = m; }
    }

    // Phase 3: cantilever cull (see BuildingCluster.stepCantilever) — detach
    // long one-sided overhangs so caps left on a central spine fall. BEFORE
    // load flow: it reads spanOf (distance-from-grounded), which runLoad reuses
    // as scratch. Anchor = a cell on the ground / alive cell below (incl.
    // diagonals). minSpan gate keeps decorative cantilevers near support.
    const minSpan = this.maxSpan - MAX_CANTILEVER;
    for (let i = 0; i < n; i++) {
      if (alive[i] !== 1 || visited[i] !== 1) continue;
      if (spanOf[i]! >= minSpan) continue; // near grounded support → keep
      const c = coords[i]!;
      const gx = c & 1023;
      const gy = (c >> 10) & 1023;
      const gz = (c >> 20) & 1023;
      if (this.isAnchor(gx, gy, gz)) continue;
      const dxp = this.anchorDist(gx, gy, gz, 1, 0);
      const dxn = this.anchorDist(gx, gy, gz, -1, 0);
      const dzp = this.anchorDist(gx, gy, gz, 0, 1);
      const dzn = this.anchorDist(gx, gy, gz, 0, -1);
      // SPAN (supported both opposing sides — anchor or continuing material).
      if ((dxp !== 0 && dxn !== 0) || (dzp !== 0 && dzn !== 0)) continue;
      // CANTILEVER: keep only if a concrete near anchor is within reach.
      let near = 1e9;
      if (dxp >= 1 && dxp <= CANT_SCAN && dxp < near) near = dxp;
      if (dxn >= 1 && dxn <= CANT_SCAN && dxn < near) near = dxn;
      if (dzp >= 1 && dzp <= CANT_SCAN && dzp < near) near = dzp;
      if (dzn >= 1 && dzn <= CANT_SCAN && dzn < near) near = dzn;
      if (near <= MAX_CANTILEVER) continue;
      visited[i] = 0; // overturns → detach (collected below; cascades next run)
    }

    // Phase 2: load flow with lateral redistribution (see
    // BuildingCluster.stepLoad — same passes A/B/C per layer).
    if (this.loadOf) this.runLoad();

    // Collect: unreachable + crushed.
    const lo = this.loadOf;
    const crush = this.crushLoad;
    let crushed = false;
    let outCount = 0;
    for (let i = 0; i < n; i++) {
      if (alive[i] !== 1) continue;
      if (visited[i] === 0) {
        queue[outCount++] = i;
      } else if (lo !== null && lo[i]! > crush) {
        queue[outCount++] = i;
        crushed = true;
      }
    }
    return { detached: queue.slice(0, outCount), crushed };
  }

  private runLoad(): void {
    const coords = this.coords;
    const alive = this.alive;
    const lo = this.loadOf!;
    const dist = this.spanOf; // free after phase 1
    const queue = this.queue; // free after phase 1
    const lateralCap = this.maxSpan;
    lo.fill(0);
    let cursor = coords.length - 1;
    while (cursor >= 0) {
      const gy = (coords[cursor]! >> 10) & 1023;
      let start = cursor;
      while (start >= 0 && ((coords[start]! >> 10) & 1023) === gy) start--;
      if (gy === 0) break; // ground absorbs everything

      // Pass A: classify support, seed the lateral BFS.
      let tail = 0;
      for (let i = start + 1; i <= cursor; i++) {
        if (alive[i] !== 1) continue;
        const c = coords[i]!;
        const gx = c & 1023;
        const gz = (c >> 20) & 1023;
        if (
          this.aliveAt(gx, gy - 1, gz) >= 0
          || this.aliveAt(gx - 1, gy - 1, gz) >= 0
          || this.aliveAt(gx + 1, gy - 1, gz) >= 0
          || this.aliveAt(gx, gy - 1, gz - 1) >= 0
          || this.aliveAt(gx, gy - 1, gz + 1) >= 0
        ) {
          dist[i] = 0;
          queue[tail++] = i;
        } else {
          dist[i] = 255;
        }
      }
      // Pass B: lateral BFS outward from supported cells…
      let head = 0;
      while (head < tail) {
        const i = queue[head++]!;
        const d = dist[i]!;
        if (d >= lateralCap || d >= 254) continue;
        const c = coords[i]!;
        const gx = c & 1023;
        const gz = (c >> 20) & 1023;
        let m = this.aliveAt(gx + 1, gy, gz);
        if (m >= 0 && dist[m] === 255) { dist[m] = d + 1; queue[tail++] = m; }
        m = this.aliveAt(gx - 1, gy, gz);
        if (m >= 0 && dist[m] === 255) { dist[m] = d + 1; queue[tail++] = m; }
        m = this.aliveAt(gx, gy, gz + 1);
        if (m >= 0 && dist[m] === 255) { dist[m] = d + 1; queue[tail++] = m; }
        m = this.aliveAt(gx, gy, gz - 1);
        if (m >= 0 && dist[m] === 255) { dist[m] = d + 1; queue[tail++] = m; }
      }
      // …then push orphan loads down the gradient, farthest first.
      for (let q = tail - 1; q >= 0; q--) {
        const i = queue[q]!;
        const d = dist[i]!;
        if (d === 0) continue;
        const c = coords[i]!;
        const gx = c & 1023;
        const gz = (c >> 20) & 1023;
        const total = 1 + lo[i]!;
        let m = this.aliveAt(gx + 1, gy, gz);
        if (m >= 0 && dist[m]! < d) { lo[m]! += total; continue; }
        m = this.aliveAt(gx - 1, gy, gz);
        if (m >= 0 && dist[m]! < d) { lo[m]! += total; continue; }
        m = this.aliveAt(gx, gy, gz + 1);
        if (m >= 0 && dist[m]! < d) { lo[m]! += total; continue; }
        m = this.aliveAt(gx, gy, gz - 1);
        if (m >= 0 && dist[m]! < d) { lo[m]! += total; }
      }
      // Pass C: supported cells split their total across the below-fan.
      for (let i = start + 1; i <= cursor; i++) {
        if (alive[i] !== 1 || dist[i] !== 0) continue;
        const c = coords[i]!;
        const gx = c & 1023;
        const gz = (c >> 20) & 1023;
        const total = 1 + lo[i]!;
        const n0 = this.aliveAt(gx, gy - 1, gz);
        const n1 = this.aliveAt(gx - 1, gy - 1, gz);
        const n2 = this.aliveAt(gx + 1, gy - 1, gz);
        const n3 = this.aliveAt(gx, gy - 1, gz - 1);
        const n4 = this.aliveAt(gx, gy - 1, gz + 1);
        const count = (n0 >= 0 ? 1 : 0) + (n1 >= 0 ? 1 : 0) + (n2 >= 0 ? 1 : 0)
          + (n3 >= 0 ? 1 : 0) + (n4 >= 0 ? 1 : 0);
        const share = total / count;
        if (n0 >= 0) lo[n0]! += share;
        if (n1 >= 0) lo[n1]! += share;
        if (n2 >= 0) lo[n2]! += share;
        if (n3 >= 0) lo[n3]! += share;
        if (n4 >= 0) lo[n4]! += share;
      }
      // Pass D: STRANDED cells (alive, dist still 255) have no downward load
      // route — force an overload so they detach instead of silently
      // vanishing their weight (parity with BuildingCluster.stepLoad).
      for (let i = start + 1; i <= cursor; i++) {
        if (alive[i] === 1 && dist[i] === 255) lo[i] = this.crushLoad + 1;
      }
      cursor = start;
    }
  }
}
