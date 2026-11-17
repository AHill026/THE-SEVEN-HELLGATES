
// ============================================
// THE SEVEN HELLGATES
// DEVIL GUNS — HYBRID WEAPON SYSTEM
// ============================================

export function createDevilGunRig(THREE) {

  const rig = new THREE.Group();

  const blackIron = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.95,
    roughness: 0.28
  });

  const ancientBrass = new THREE.MeshStandardMaterial({
    color: 0xb07832,
    metalness: 0.9,
    roughness: 0.25
  });

  const infernalRed = new THREE.MeshStandardMaterial({
    color: 0x8c1018,
    emissive: 0xff1600,
    emissiveIntensity: 2.5
  });

  const celestialPurple = new THREE.MeshStandardMaterial({
    color: 0x501080,
    emissive: 0x8900ff,
    emissiveIntensity: 2
  });

  // ==================================
  // CREATE ONE INFERNAL PISTOL
  // ==================================

  function createPistol(side) {

    const pistol = new THREE.Group();

    // Main weapon body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.24, 0.48),
      blackIron
    );

    pistol.add(body);

    // Brass barrel
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.065, 0.38, 12),
      ancientBrass
    );

    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.34;
    pistol.add(barrel);

    // Infernal barrel opening
    const muzzle = new THREE.Mesh(
      new THREE.TorusGeometry(0.06, 0.018, 8, 16),
      infernalRed
    );

    muzzle.position.z = -0.54;
    pistol.add(muzzle);

    // Rotating ammunition chamber
    const chamber = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.105, 0.17, 12),
      ancientBrass
    );

    chamber.rotation.x = Math.PI / 2;
    chamber.position.set(0, -0.08, -0.04);
    pistol.add(chamber);

    // Celestial energy core
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.065, 1),
      celestialPurple
    );

    core.position.set(0, 0.13, 0.02);
    pistol.add(core);

    // Mechanical grip
    const grip = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.27, 0.15),
      blackIron
    );

    grip.position.set(0, -0.23, 0.12);
    grip.rotation.x = -0.2;
    pistol.add(grip);

    // Brass grip decoration
    const gripPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.125, 0.18, 0.025),
      ancientBrass
    );

    gripPlate.position.set(0, -0.24, 0.2);
    pistol.add(gripPlate);

    // Steam mechanism
    const steamValve = new THREE.Mesh(
      new THREE.TorusGeometry(0.055, 0.018, 8, 12),
      ancientBrass
    );

    steamValve.position.set(
      side * 0.1,
      0.08,
      0.12
    );

    pistol.add(steamValve);

    // Infernal light
    const glow = new THREE.PointLight(
      0x9d00ff,
      1.4,
      2
    );

    glow.position.set(0, 0.1, 0);
    pistol.add(glow);

    pistol.userData = {
      core,
      glow,
      chamber,
      muzzle,
      side
    };

    return pistol;
  }

  // ==================================
  // DUAL DEVIL GUNS
  // ==================================

  
  // ==================================
  // HELLFIRE REVOLVER — SINGLE SIDEARM
  // ==================================

  const revolver = createPistol(1);

  // Position in Azrael's right hand
  revolver.position.set(0.38, -0.32, -0.75);

  revolver.rotation.set(0, 0.08, 0);

  rig.add(revolver);
  rig.add(saw);

  rig.visible = false;

  rig.userData = {

    weaponName: 'Infernal Ripper MK-I',

    weaponType: 'hell_saw',

    saw,

    blade,

    core,

    glow,

    active: false

  };
};
  rig.userData = { weaponName: 'Infernal Ripper MK-I',
  toothGroup,
  
    weaponName: 'Infernal Ripper MK-I',
    weaponType: 'devil_guns',
    weaponName: 'Hellfire Revolver',
    activeWeapon: 'hellfire_revolver',
    revolver
  };

  return rig;
  