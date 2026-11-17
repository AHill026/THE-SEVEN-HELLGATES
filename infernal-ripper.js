
export function createInfernalRipper(THREE) {
  const rig = new THREE.Group();
  const saw = new THREE.Group();

  const iron = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.95,
    roughness: 0.3
  });

  const brass = new THREE.MeshStandardMaterial({
    color: 0xa66b27,
    metalness: 0.9,
    roughness: 0.25
  });

  const hellfire = new THREE.MeshStandardMaterial({
    color: 0x7c1010,
    emissive: 0xff1600,
    emissiveIntensity: 2
  });

  const purple = new THREE.MeshStandardMaterial({
    color: 0x501080,
    emissive: 0x8500ff,
    emissiveIntensity: 2
  });

  // Main engine housing
  const engine = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.42, 0.55),
    iron
  );
  saw.add(engine);

  // Infernal power core
  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.13, 1),
    purple
  );
  core.position.set(0, 0.22, 0);
  saw.add(core);

  blade.position.set(0, 0, -0.68);
  saw.add(blade);
  
 

  for (let i = 0; i < 12; i++) {
    const tooth = new THREE.Mesh(
      new THREE.ConeGeometry(0.055, 0.13, 4),
      toothMaterial
    );

    const side = i % 2 === 0 ? 1 : -1;

    tooth.position.set(
      side * 0.115,
      0.09,
      -0.25 - Math.floor(i / 2) * 0.13
    );

    tooth.rotation.z =
      side === 1 ? -Math.PI / 2 : Math.PI / 2;

    toothGroup.add(tooth);
  }
  return rig;
}
import {
  createDevilGunRig
} from './devil-guns.js';
import {
  createInfernalRipper
} from './infernal-ripper.js';