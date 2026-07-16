import type { BuildingCluster } from './BuildingCluster';

/**
 * Structural integrity tracker for the voxel building.
 *
 * INSTANT-CRUMB detector — the fast, synchronous half of the structural
 * model. A block stays attached iff:
 *   - gy === 0 (grounded), OR
 *   - the block directly below is supported (vertical chain), OR
 *   - it has ANY alive lateral 4-neighbor (cohesion with a piece whose
 *     real load-bearing fate the deferred span sweep decides).
 *
 * Division of labor: this solver instantly drops loose crumbs with no
 * cohesion (checkerboard lattices left by blasts, lone hanging blocks) —
 * they have no lateral ties. Everything structural (whether a wall strip,
 * slab or whole section can actually carry itself) is decided by
 * BuildingCluster's span sweep: vertical grounding + cantilever distance
 * limit, the discrete cousin of GeoMod-style stress propagation. The old
 * below-only cantilever rule lived here and unzipped full-height wall
 * strips the moment their base died — before the sweep could re-anchor
 * them through the slabs.
 *
 * Lateral cohesion is checked against aliveFlags, not `supported`, so the
 * initial bottom-up sweep stays order-independent.
 *
 * Maintained incrementally via `applyDestruction()`: instead of re-sweeping
 * 500k blocks per shot, we BFS UPWARD only from blocks that had their
 * support removed. O(detached) — typically tens to a few thousand cells.
 */
export class Integrity {
  private readonly supported: Uint8Array;
  /** Reusable scratch buffer for the upward propagation frontier. */
  private readonly frontier: Int32Array;
  private readonly nextFrontier: Int32Array;
  /** Per-level dedup mask. Without it a wide flip wave enqueues each block
   *  up to ~5×; once the write cursor passes the typed-array length, JS
   *  DROPS the writes silently — missed re-evals leave stale supported=1
   *  flags, i.e. floating islands. */
  private readonly queuedMark: Uint8Array;
  private readonly flippedBuf: number[] = [];

  constructor(private readonly cluster: BuildingCluster) {
    const total = cluster.totalCount();
    this.supported = new Uint8Array(total);
    this.frontier = new Int32Array(total);
    this.nextFrontier = new Int32Array(total);
    this.queuedMark = new Uint8Array(total);
    this.computeInitial();
  }

  /**
   * Bottom-up sweep used once at construction to seed the supported flags.
   * O(W × D × H), runs at startup only.
   */
  private computeInitial(): void {
    const cluster = this.cluster;
    const supported = this.supported;
    for (let gy = 0; gy < cluster.gridSizeY; gy++) {
      for (let gx = 0; gx < cluster.gridSizeX; gx++) {
        for (let gz = 0; gz < cluster.gridSizeZ; gz++) {
          const idx = cluster.indexAtFast(gx, gy, gz);
          if (idx < 0 || !cluster.isAlive(idx)) continue;
          supported[idx] = this.computeSupportFlag(gx, gy, gz) ? 1 : 0;
        }
      }
    }
  }

  /** Evaluate the support rule at (gx, gy, gz) — assumes block is alive.
   *  A neighbor only counts as a supporter if it is BOTH alive in the
   *  cluster and marked supported. Without the alive check, freshly
   *  destroyed blocks (whose supported flag is stale = 1 until applyDestruction
   *  flips it) would still appear to support anything resting on them — and
   *  the entire cantilever propagation would be a lie. */
  private computeSupportFlag(gx: number, gy: number, gz: number): boolean {
    if (gy === 0) return true;
    const cluster = this.cluster;
    const supported = this.supported;
    // Direct vertical support.
    const direct = cluster.indexAtFast(gx, gy - 1, gz);
    if (direct >= 0 && cluster.isAlive(direct) && supported[direct] === 1) return true;
    // Lateral cohesion: any alive 4-neighbor on the same level keeps the
    // block attached for now — whether the piece it belongs to can really
    // carry itself is decided by the structural span sweep (grounding +
    // cantilever limit) a fraction of a second later. Without this, the
    // old below-only cantilever rule unzipped full-height wall strips the
    // instant their base was shot out, before the sweep could re-anchor
    // them through the slabs. Loose crumbs (checkerboard lattices, lone
    // blocks) have no lateral ties and still drop instantly.
    const lxm = cluster.indexAtFast(gx - 1, gy, gz);
    if (lxm >= 0 && cluster.isAlive(lxm)) return true;
    const lxp = cluster.indexAtFast(gx + 1, gy, gz);
    if (lxp >= 0 && cluster.isAlive(lxp)) return true;
    const lzm = cluster.indexAtFast(gx, gy, gz - 1);
    if (lzm >= 0 && cluster.isAlive(lzm)) return true;
    const lzp = cluster.indexAtFast(gx, gy, gz + 1);
    return lzp >= 0 && cluster.isAlive(lzp);
  }

  /**
   * Notify that the given block indices were just destroyed. Returns the
   * indices of *alive* blocks that lost support as a result (caller
   * destroys them as cascade). Implementation: BFS upward from every
   * destroyed block, re-evaluating support for blocks that depended on it.
   */
  /**
   * Cheap flag sync for cells removed OUTSIDE the incremental solver (the
   * vehicle bore carve): just clear their supported flag so a later
   * applyDestruction() doesn't treat dead cells as load-bearing. No upward
   * propagation — the deferred ground-connectivity sweep is the authority for
   * what detaches. O(destroyed), no cascade.
   */
  markDestroyed(destroyed: number[]): void {
    for (const d of destroyed) {
      if (d >= 0 && d < this.supported.length) this.supported[d] = 0;
    }
  }

  applyDestruction(destroyed: number[]): number[] {
    const cluster = this.cluster;
    const supported = this.supported;
    const flipped = this.flippedBuf;
    flipped.length = 0;

    // Step 1: clear supported flag for the freshly-destroyed blocks. Without
    // this, the propagation below would consult a stale `supported = 1` for
    // dead cells and decide that ceilings above them are still held up.
    for (const dead of destroyed) {
      supported[dead] = 0;
    }

    // Step 2: blocks ABOVE each destroyed block (5-fan above) need re-eval.
    let frontierSize = 0;
    const queued = this.queuedMark;
    const enqueue = (idx: number): void => {
      if (idx < 0) return;
      if (!cluster.isAlive(idx)) return;
      if (supported[idx] === 0) return; // already lost support, skip
      if (queued[idx] === 1) return; // dedup — keeps frontier ≤ total
      queued[idx] = 1;
      this.frontier[frontierSize++] = idx;
    };
    for (const dead of destroyed) {
      // dead block had its own (gx, gy, gz). The block directly above could
      // have used it as direct support, and the same-level 4-neighbors as
      // their lateral cohesion tie.
      const b = cluster.blocks[dead]!;
      const gx = b.gx;
      const gy = b.gy;
      const gz = b.gz;
      enqueue(cluster.indexAtFast(gx, gy + 1, gz));
      enqueue(cluster.indexAtFast(gx - 1, gy, gz));
      enqueue(cluster.indexAtFast(gx + 1, gy, gz));
      enqueue(cluster.indexAtFast(gx, gy, gz - 1));
      enqueue(cluster.indexAtFast(gx, gy, gz + 1));
    }

    while (frontierSize > 0) {
      let nextSize = 0;
      const pushNext = (nIdx: number): void => {
        if (nIdx < 0) return;
        if (!cluster.isAlive(nIdx)) return;
        if (supported[nIdx] !== 1) return;
        if (queued[nIdx] === 1) return; // dedup — keeps frontier ≤ total
        queued[nIdx] = 1;
        this.nextFrontier[nextSize++] = nIdx;
      };
      for (let f = 0; f < frontierSize; f++) {
        const idx = this.frontier[f]!;
        queued[idx] = 0; // allow re-enqueue on a later level if needed
        if (!cluster.isAlive(idx)) continue;
        if (supported[idx] === 0) continue;
        const b = cluster.blocks[idx]!;
        const stillSupported = this.computeSupportFlag(b.gx, b.gy, b.gz);
        if (stillSupported) continue;
        // Block flipped to unsupported.
        supported[idx] = 0;
        flipped.push(idx);
        // Propagate: only the block directly above depends on this one's
        // supported flag (lateral cohesion reads aliveness, not flags).
        pushNext(cluster.indexAtFast(b.gx, b.gy + 1, b.gz));
      }
      // Swap frontier ↔ nextFrontier by copying the live span.
      for (let i = 0; i < nextSize; i++) this.frontier[i] = this.nextFrontier[i]!;
      frontierSize = nextSize;
    }

    return flipped;
  }
}
