

export function createAzrael() {

  const azrael = new THREE.Group();

  // =====================================
  // AZRAEL — INFERNAL KNIGHT MATERIALS
  // =====================================

  const armor = azraelArmorMaterial;

  const darkSteel = new THREE.MeshStandardMaterial({
    color: 0x171116,
    metalness: 0.95,
    roughness: 0.3
  });

  const crimson = new THREE.MeshStandardMaterial({
    color: 0x590909,
    metalness: 0.45,
    roughness: 0.55
  });

  const infernalGlow = new THREE.MeshBasicMaterial({
    color: 0xff1600
  });

  const goldTrim = new THREE.MeshStandardMaterial({
    color: 0xb87932,
    metalness: 0.9,
    roughness: 0.24
  });

  // Helper for adding armor pieces
  function addArmor(geometry, material, position, scale) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);

    if (scale) {
      mesh.scale.set(...scale);
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    azrael.add(mesh);
    return mesh;
  }

  // =====================================
  // CHEST ARMOR
  // =====================================

  addArmor(
    new THREE.BoxGeometry(1.05, 1.35, 0.55),
    armor,
    [0, 2.15, 0]
  );

  // Chest centerpiece
  addArmor(
    new THREE.SphereGeometry(0.19, 24, 24),
    infernalGlow,
    [0, 2.3, 0.32]
  );

  // Chest armor trim
  addArmor(
    new THREE.BoxGeometry(0.12, 0.95, 0.08),
    goldTrim,
    [0, 2.2, 0.3]
  );

  // =====================================
  // HELMET
  // =====================================

  addArmor(
    new THREE.SphereGeometry(0.42, 24, 24),
    armor,
    [0, 3.12, 0]
  );

  // Helmet faceplate
  addArmor(
    new THREE.BoxGeometry(0.48, 0.34, 0.16),
    darkSteel,
    [0, 3.02, 0.34]
  );

  // Glowing eyes
  for (const side of [-1, 1]) {
    addArmor(
      new THREE.SphereGeometry(0.065, 16, 16),
      infernalGlow,
      [side * 0.15, 3.14, 0.44]
    );
  }

  // Helmet horns
  for (const side of [-1, 1]) {
    const horn = addArmor(
      new THREE.ConeGeometry(0.13, 0.75, 8),
      darkSteel,
      [side * 0.32, 3.65, 0]
    );

    horn.rotation.z = side * -0.35;
  }

  // =====================================
  // SPIKED SHOULDER ARMOR
  // =====================================

  for (const side of [-1, 1]) {

    addArmor(
      new THREE.SphereGeometry(0.38, 16, 16),
      armor,
      [side * 0.68, 2.65, 0]
    );

    const spike = addArmor(
      new THREE.ConeGeometry(0.13, 0.65, 8),
      darkSteel,
      [side * 0.78, 3.03, 0]
    );

    spike.rotation.z = side * -0.5;
  }

  // =====================================
  // ARMORED ARMS AND GAUNTLETS
  // =====================================

  for (const side of [-1, 1]) {

    addArmor(
      new THREE.CylinderGeometry(0.17, 0.22, 0.85, 12),
      darkSteel,
      [side * 0.78, 1.95, 0]
    );

    addArmor(
      new THREE.BoxGeometry(0.3, 0.32, 0.32),
      armor,
      [side * 0.78, 1.42, 0.05]
    );
  }

  // =====================================
  // ARMORED LEGS AND GREAVES
  // =====================================

  for (const side of [-1, 1]) {

    addArmor(
      new THREE.CylinderGeometry(0.23, 0.19, 0.8, 12),
      armor,
      [side * 0.28, 0.85, 0]
    );

    addArmor(
      new THREE.BoxGeometry(0.3, 0.32, 0.48),
      darkSteel,
      [side * 0.28, 0.3, 0.12]
    );
  }

  // =====================================
  // INFERNAL WAIST ARMOR
  // =====================================

  addArmor(
    new THREE.BoxGeometry(0.85, 0.35, 0.5),
    darkSteel,
    [0, 1.4, 0]
  );

  // Crimson front tabard
  addArmor(
    new THREE.BoxGeometry(0.55, 0.85, 0.08),
    crimson,
    [0, 0.95, 0.3]
  );

  /// Character metadata
  azrael.userData.character = 'Azrael';
  azrael.userData.health = 1000;
  azrael.userData.maxHealth = 1000;
  azrael.userData.isBoss = true;

  return azrael;
}
