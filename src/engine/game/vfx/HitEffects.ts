import * as THREE from 'three';

interface Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  material: THREE.MeshBasicMaterial;
}

export class HitEffects {
  private particles: Particle[] = [];

  constructor(private readonly scene: THREE.Scene) {}

  burst(position: THREE.Vector3, color: number, count = 14): void {
    const geom = new THREE.SphereGeometry(0.08, 6, 6);
    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
      const mesh = new THREE.Mesh(geom.clone(), mat);
      mesh.position.copy(position);
      this.scene.add(mesh);
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        Math.random() * 4 + 1,
        (Math.random() - 0.5) * 6,
      );
      this.particles.push({ mesh, velocity, life: 0, maxLife: 0.7 + Math.random() * 0.4, material: mat });
    }
  }

  update(delta: number): void {
    const survivors: Particle[] = [];
    for (const p of this.particles) {
      p.life += delta;
      p.velocity.y -= 6 * delta;
      p.mesh.position.addScaledVector(p.velocity, delta);
      const t = p.life / p.maxLife;
      p.material.opacity = Math.max(0, 1 - t);
      if (p.life < p.maxLife) {
        survivors.push(p);
      } else {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.material.dispose();
      }
    }
    this.particles = survivors;
  }

  clear(): void {
    for (const p of this.particles) {
      this.scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.material.dispose();
    }
    this.particles = [];
  }
}
