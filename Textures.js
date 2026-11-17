import * as THREE from 'three';

// =====================================
// AZRAEL — INFERNAL ARMOR TEXTURES
// =====================================

const textureLoader = new THREE.TextureLoader();

export const azraelArmorTexture = textureLoader.load(
  './textures/azrael_armor_albedo.png'
);

azraelArmorTexture.colorSpace = THREE.SRGBColorSpace;

export const azraelArmorMaterial = new THREE.MeshStandardMaterial({
  map: azraelArmorTexture,
  metalness: 0.85,
  roughness: 0.38
});