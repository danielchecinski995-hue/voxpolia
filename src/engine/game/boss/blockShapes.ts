import * as THREE from 'three';

export type BlockShape =
  | { kind: 'box'; width: number; height: number; depth: number }
  | { kind: 'capsule'; radius: number; height: number };

export interface GeneratedBlock {
  position: THREE.Vector3;
  size: number;
  rotation: THREE.Euler;
}

export function generateBlocks(shape: BlockShape, blockSize: number): GeneratedBlock[] {
  const step = blockSize * 1.05;
  const half = halfExtents(shape);
  const result: GeneratedBlock[] = [];

  const xCount = Math.max(1, Math.round((half.x * 2) / step));
  const yCount = Math.max(1, Math.round((half.y * 2) / step));
  const zCount = Math.max(1, Math.round((half.z * 2) / step));
  const xStep = (half.x * 2) / xCount;
  const yStep = (half.y * 2) / yCount;
  const zStep = (half.z * 2) / zCount;

  for (let xi = 0; xi <= xCount; xi++) {
    for (let yi = 0; yi <= yCount; yi++) {
      for (let zi = 0; zi <= zCount; zi++) {
        const px = -half.x + xi * xStep;
        const py = -half.y + yi * yStep;
        const pz = -half.z + zi * zStep;
        const p = new THREE.Vector3(px, py, pz);
        if (!isInside(p, shape)) continue;

        p.x += (Math.random() - 0.5) * step * 0.18;
        p.y += (Math.random() - 0.5) * step * 0.18;
        p.z += (Math.random() - 0.5) * step * 0.18;

        const sizeJitter = 0.86 + Math.random() * 0.26;
        const rot = new THREE.Euler(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
        );
        result.push({ position: p, size: blockSize * sizeJitter, rotation: rot });
      }
    }
  }
  return result;
}

function halfExtents(shape: BlockShape): THREE.Vector3 {
  switch (shape.kind) {
    case 'box':
      return new THREE.Vector3(shape.width / 2, shape.height / 2, shape.depth / 2);
    case 'capsule':
      return new THREE.Vector3(shape.radius, shape.height / 2 + shape.radius, shape.radius);
  }
}

function isInside(p: THREE.Vector3, shape: BlockShape): boolean {
  switch (shape.kind) {
    case 'box':
      return (
        Math.abs(p.x) <= shape.width / 2 &&
        Math.abs(p.y) <= shape.height / 2 &&
        Math.abs(p.z) <= shape.depth / 2
      );
    case 'capsule': {
      const halfH = shape.height / 2;
      const r2 = shape.radius * shape.radius;
      if (p.y >= -halfH && p.y <= halfH) {
        return p.x * p.x + p.z * p.z <= r2;
      }
      const dy = p.y > halfH ? p.y - halfH : p.y + halfH;
      return p.x * p.x + dy * dy + p.z * p.z <= r2;
    }
  }
}
