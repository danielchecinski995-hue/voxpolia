import * as THREE from 'three';
import type { BlockShape, GeneratedBlock } from './blockShapes';
import { generateBlocks } from './blockShapes';

export interface VoxelClusterConfig {
  shape: BlockShape;
  blockSize: number;
  color: number;
}

/** Minimal payload per destroyed voxel. Deliberately lean — a single rocket
 *  destroys 10–20k blocks, so every extra object here is GC pressure that
 *  shows up as a frame hitch. */
export interface DestroyedBlock {
  worldPosition: THREE.Vector3;
  color: number;
  size: number;
}

const HIDDEN_MATRIX = new THREE.Matrix4().makeScale(0, 0, 0);

export class VoxelCluster {
  readonly pivot: THREE.Group;
  readonly instances: THREE.InstancedMesh;
  readonly material: THREE.MeshStandardMaterial;

  private readonly blocks: GeneratedBlock[];
  private readonly aliveFlags: boolean[];
  private readonly originalCount: number;
  private currentAlive: number;

  private readonly tmpMatrix = new THREE.Matrix4();
  private readonly tmpQuat = new THREE.Quaternion();
  private readonly tmpScale = new THREE.Vector3();
  private readonly tmpLocalPoint = new THREE.Vector3();

  constructor(private readonly config: VoxelClusterConfig) {
    this.pivot = new THREE.Group();

    this.blocks = generateBlocks(config.shape, config.blockSize);
    this.originalCount = this.blocks.length;
    this.currentAlive = this.originalCount;
    this.aliveFlags = new Array(this.originalCount).fill(true);

    const geom = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshStandardMaterial({
      color: config.color,
      roughness: 0.78,
      metalness: 0.05,
      flatShading: true,
    });
    this.instances = new THREE.InstancedMesh(geom, this.material, Math.max(1, this.originalCount));
    this.instances.castShadow = true;
    this.instances.receiveShadow = true;

    for (let i = 0; i < this.blocks.length; i++) {
      const b = this.blocks[i]!;
      this.tmpQuat.setFromEuler(b.rotation);
      this.tmpScale.set(b.size, b.size, b.size);
      this.tmpMatrix.compose(b.position, this.tmpQuat, this.tmpScale);
      this.instances.setMatrixAt(i, this.tmpMatrix);
    }
    this.instances.instanceMatrix.needsUpdate = true;
    this.pivot.add(this.instances);
  }

  aliveCount(): number {
    return this.currentAlive;
  }

  maxCount(): number {
    return this.originalCount;
  }

  /** Count alive blocks within `radius` of `centerLocal` (body-local space, before pivot scale). */
  aliveCountInSphere(centerLocal: THREE.Vector3, radius: number): number {
    const r2 = radius * radius;
    let count = 0;
    for (let i = 0; i < this.blocks.length; i++) {
      if (!this.aliveFlags[i]) continue;
      if (this.blocks[i]!.position.distanceToSquared(centerLocal) <= r2) count++;
    }
    return count;
  }

  damageRatio(): number {
    return 1 - this.currentAlive / this.originalCount;
  }

  hitAt(worldPoint: THREE.Vector3, count: number): DestroyedBlock[] {
    if (count <= 0 || this.currentAlive === 0) return [];

    this.instances.updateMatrixWorld(true);
    this.tmpLocalPoint.copy(worldPoint);
    this.instances.worldToLocal(this.tmpLocalPoint);

    const candidates: { i: number; d: number }[] = [];
    for (let i = 0; i < this.blocks.length; i++) {
      if (!this.aliveFlags[i]) continue;
      const b = this.blocks[i]!;
      candidates.push({ i, d: b.position.distanceToSquared(this.tmpLocalPoint) });
    }
    candidates.sort((a, b) => a.d - b.d);

    return this.destroyByIndices(candidates.slice(0, count).map((c) => c.i));
  }

  destroyAll(): DestroyedBlock[] {
    const indices: number[] = [];
    for (let i = 0; i < this.aliveFlags.length; i++) {
      if (this.aliveFlags[i]) indices.push(i);
    }
    return this.destroyByIndices(indices);
  }

  private destroyByIndices(indices: number[]): DestroyedBlock[] {
    const destroyed: DestroyedBlock[] = [];
    for (const idx of indices) {
      if (!this.aliveFlags[idx]) continue;
      this.aliveFlags[idx] = false;
      this.currentAlive--;

      this.instances.getMatrixAt(idx, this.tmpMatrix);
      this.tmpMatrix.premultiply(this.instances.matrixWorld);
      const wp = new THREE.Vector3().setFromMatrixPosition(this.tmpMatrix);
      destroyed.push({
        worldPosition: wp,
        color: this.config.color,
        size: this.blocks[idx]!.size,
      });
      this.instances.setMatrixAt(idx, HIDDEN_MATRIX);
    }
    if (destroyed.length > 0) {
      this.instances.instanceMatrix.needsUpdate = true;
    }
    return destroyed;
  }

  setVisible(visible: boolean): void {
    this.pivot.visible = visible;
  }

  dispose(): void {
    this.instances.geometry.dispose();
    this.material.dispose();
  }
}
