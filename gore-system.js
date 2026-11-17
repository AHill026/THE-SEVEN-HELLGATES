
export function createGoreSystem(THREE, world) {

  const goreEffects = [];
  const bloodPools = [];
  function spawnBlood(position, amount = 12) }
  
  function spawnSparks(position, amount = 10) {

    for (let i = 0; i < amount; i++) {

      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xff4400 : 0xffaa22,
        transparent: true
      });

      const spark = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 5, 5),
        material
      );

      spark.position.copy(position);

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        Math.random() * 4,
        (Math.random() - 0.5) * 5
      );

      world.add(spark);

      goreEffects.push({
        mesh: spark,
        velocity,
        life: 0.55
      });
    }
  }
  
  function createBloodPool(position, size = 0.8) {

    const material = new THREE.MeshBasicMaterial({
      color: 0x590000,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    const pool = new THREE.Mesh(
      new THREE.CircleGeometry(size, 24),
      material
    );

    pool.rotation.x = -Math.PI / 2;
    pool.position.set(
      position.x,
      0.035,
      position.z
    );

    pool.scale.set(0.15, 0.15, 1);

    world.add(pool);

    bloodPools.push({
      mesh: pool,
      life: 30,
      maxLife: 30
    });
  }
  

    for (let i = 0; i < amount; i++) {

      const material = new THREE.MeshBasicMaterial({
        color: 0x8b0000,
        transparent: true
      });

      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 6, 6),
        material
      );

      particle.position.copy(position);

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        Math.random() * 2.5,
        (Math.random() - 0.5) * 3
      );

      world.add(particle);

      goreEffects.push({
        mesh: particle,
        velocity,
        life: 1.2
      });
    }
  }

  function update(dt) {

    for (let i = goreEffects.length - 1; i >= 0; i--) {

      const effect = goreEffects[i];

      effect.life -= dt;

      effect.velocity.y -= 5 * dt;

      effect.mesh.position.addScaledVector(
        effect.velocity,
        dt
      );

      effect.mesh.material.opacity =
        Math.max(0, effect.life / 1.2);

      if (effect.life <= 0) {

        world.remove(effect.mesh);
        effect.mesh.geometry.dispose();
        effect.mesh.material.dispose();

        goreEffects.splice(i, 1);
      }
    }
  }

  return {
    spawnBlood,
    update
  };
}
return {
  spawnBlood,
  createBloodPool,
  update
};