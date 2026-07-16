/**
 * Typed-array allocation that prefers SharedArrayBuffer so the debris
 * worker can read collider state (building aliveFlags/gridIdx, rubble
 * grid) with zero copying. Falls back to a plain backing buffer when SAB
 * is unavailable (browser without COOP/COEP headers) — the game then runs
 * the synchronous debris path and nothing else changes: a view over SAB
 * behaves exactly like one over ArrayBuffer.
 */

const HAS_SAB = typeof SharedArrayBuffer !== 'undefined';

export function sharedUint8(length: number): Uint8Array {
  return HAS_SAB ? new Uint8Array(new SharedArrayBuffer(length)) : new Uint8Array(length);
}

export function sharedInt32(length: number): Int32Array {
  return HAS_SAB ? new Int32Array(new SharedArrayBuffer(length * 4)) : new Int32Array(length);
}

export function sharedFloat32(length: number): Float32Array {
  return HAS_SAB ? new Float32Array(new SharedArrayBuffer(length * 4)) : new Float32Array(length);
}

/** True when views produced by this module are actually shareable with a
 *  worker (SAB exists AND, in a browser, the page is cross-origin
 *  isolated — SAB postMessage throws otherwise). */
export function canShareMemory(): boolean {
  if (!HAS_SAB) return false;
  if (typeof crossOriginIsolated !== 'undefined') return crossOriginIsolated;
  return true;
}
