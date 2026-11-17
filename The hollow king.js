
import * as THREE from 'three';

// ==========================================
// THE SEVEN HELLGATES
// THE HOLLOW KING — BOSS MODULE
// ==========================================

export function createHollowKing(scene, player) {

  const boss = new THREE.Group();

  boss.name = "THE_HOLLOW_KING";

  boss.userData = {
    dying: false,
    deathTimer: 0,
    deathDuration: 1.8
    arms: bossArms,
    health: 1500,
    maxHealth: 1500,

    phase: 1,
    alive: true,

    attackCooldown: 2,
    attackType: "idle",

    vulnerable: false,
    vulnerabilityTimer: 0,

    hitFlash: 0,
    attackAnimation: 0
  };

  const armor = new THREE.MeshStandardMaterial({
    color: 0x171316,
    metalness: 0.85,
    roughness: 0.32
  });

  const bone = new THREE.MeshStandardMaterial({
    color: 0x82706a,
    roughness: 0.85
  });

  const darkBone = new THREE.MeshStandardMaterial({
    color: 0x302124,
    roughness: 0.9
  });

  const heartMaterial = new THREE.MeshStandardMaterial({
    color: 0xff2415,
    emissive: 0xc90000,
    emissiveIntensity: 3.5
  });

  const eyeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff1600
  });

  // ==========================================
  // BODY PART HELPER
  // ==========================================

  function part(geometry, material, x, y, z) {

    const mesh = new THREE.Mesh(
      geometry,
      material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    boss.add(mesh);

    return mesh;
  }

  // ==========================================
  // TORSO
  // ==========================================

  const torso = part(
    new THREE.CapsuleGeometry(
      0.85, 1.3, 8, 12
    ),
    armor,
    0, 3.0, 0
  );

  torso.scale.set(1.25, 1.15, 0.85);

  // Chest armor
  part(
    new THREE.BoxGeometry(2.2, 0.65, 1.1),
    darkBone,
    0, 3.85, 0
  );

  // ==========================================
  // HEAD
  // ==========================================

  part(
    new THREE.SphereGeometry(0.68, 16, 16),
    bone,
    0, 5.05, 0
  );

  // Jaw
  part(
    new THREE.BoxGeometry(0.85, 0.3, 0.65),
    darkBone,
    0, 4.58, -0.12
  );

  // Eyes
  for (const side of [-1, 1]) {

    part(
      new THREE.SphereGeometry(0.12, 12, 12),
      eyeMaterial,
      side * 0.27,
      5.12,
      -0.59
    );

    // Horns
    const horn = part(
      new THREE.ConeGeometry(0.22, 1.65, 8),
      bone,
      side * 0.48,
      6.05,
      0
    );

    horn.rotation.z = side * -0.45;
  }

  // Crown spikes
  for (let i = -2; i <= 2; i++) {

    const spike = part(
      new THREE.ConeGeometry(0.14, 0.8, 6),
      armor,
      i * 0.25,
      5.85,
      0
    );

    spike.rotation.z = -i * 0.12;
  }

  // ==========================================
  // ARMS AND LEGS
  // ==========================================

  for (const side of [-1, 1]) {

    const shoulder = part(
      new THREE.SphereGeometry(0.55, 12, 12),
      armor,
      side * 1.25,
      3.8,
      0
    );

    shoulder.scale.set(1.25, 1, 1);

    const arm = part(
      new THREE.CapsuleGeometry(
        0.28, 1.1, 5, 8
      ),
      armor,
      side * 1.45,
      2.85,
      0
    );

    arm.rotation.z = side * 0.15;

    part(
      new THREE.CapsuleGeometry(
        0.28, 0.85, 5, 8
      ),
      bone,
      side * 1.5,
      1.95,
      0
    );

    part(
      new THREE.CapsuleGeometry(
        0.38, 1.0, 5, 8
      ),
      armor,
      side * 0.5,
      0.9,
      0
    );

    part(
      new THREE.BoxGeometry(0.75, 0.25, 1),
      bone,
      side * 0.5,
      0.25,
      -0.1
    );
  }

  // ==========================================
  // GLOWING HEART
  // ==========================================

  const heart = part(
    new THREE.IcosahedronGeometry(0.42, 2),
    heartMaterial,
    0, 3.45, -0.78
  );

  heart.scale.set(0.9, 1.1, 0.7);

  boss.userData.heart = heart;

  const heartLight = new THREE.PointLight(
    0xff2200,
    3,
    7
  );

  heartLight.position.set(0, 3.5, -1);

  boss.add(heartLight);

  boss.userData.heartLight = heartLight;

  // ==========================================
  // RIB ARMOR
  // ==========================================

  const ribs = [];

  for (let i = 0; i < 5; i++) {

    const rib = new THREE.Mesh(
      new THREE.TorusGeometry(
        0.65 + i * 0.06,
        0.075,
        8,
        24,
        Math.PI
      ),
      bone
    );

    rib.position.set(
      0,
      3.0 + i * 0.17,
      -0.75
    );

    rib.rotation.z = Math.PI;

    boss.add(rib);

    ribs.push(rib);
  }

  boss.userData.ribs = ribs;

  // ==========================================
  // KING'S RUIN HAMMER
  // ==========================================

  const hammer = new THREE.Group();

  hammer.position.set(1.9, 2.1, -0.1);

  boss.add(hammer);

  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.13, 0.17, 3.3, 12
    ),
    darkBone
  );

  handle.position.y = -0.3;

  hammer.add(handle);

  const hammerHead = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.35, 1.25),
    armor
  );

  hammerHead.position.y = 1.45;

  hammer.add(hammerHead);

  const hammerGlow = new THREE.PointLight(
    0xff3000,
    1.5,
    5
  );

  hammerGlow.position.y = 1.5;

  hammer.add(hammerGlow);

  boss.userData.hammer = hammer;

  // ==========================================
  // DEMONIC AURA
  // ==========================================

  const aura = new THREE.PointLight(
    0x9e120c,
    3,
    12
  );

  aura.position.y = 3.5;

  boss.add(aura);

  boss.userData.aura = aura;

  // ==========================================
  // BOSS POSITION
  // ==========================================

  boss.position.set(0, 0, -18);

  scene.add(boss);

  return boss;
}


// ==========================================
// DAMAGE SYSTEM
// ==========================================

export function damageHollowKing(boss, damage) {

  if (!boss || !boss.userData.alive) return;

  const data = boss.userData;

  const multiplier = data.vulnerable ? 1.5 : 0.5;

  data.health -= damage * multiplier;

  data.health = Math.max(0, data.health);

  if (data.phase === 1 &&
      data.health <= data.maxHealth * 0.65) {

    data.phase = 2;
    data.vulnerable = true;
    data.vulnerabilityTimer = 4;

  }

  if (data.phase === 2 &&
      data.health <= data.maxHealth * 0.30) {

    data.phase = 3;
    data.vulnerable = true;
    data.vulnerabilityTimer = 5;

  }

  if (data.health <= 0) {

    data.alive = false;

    return true;
  }

  return false;
}


// ==========================================
// BOSS AI AND ANIMATIONS
// ==========================================

export function updateHollowKing(
  boss,
  player,
  delta:
  updateHollowKing(
    hollowKing,
    camera,
    delta,
    {
      onAttack: (type, damage) => {

        console.log(
          "HOLLOW KING ATTACK:",
          type,
          damage
        );

      }
    }
  );
  callbacks = {}
) {

  if (!boss || !boss.userData.alive) return;

  const data = boss.userData;

  const time = performance.now() * 0.001;

  const dx = player.position.x - boss.position.x;
  const dz = player.position.z - boss.position.z;

  const distance = Math.hypot(dx, dz);

  // Face player
  boss.rotation.y = Math.atan2(dx, dz);

  // Slow intimidating pursuit
  if (distance > 5.5) {

    boss.position.x +=
      (dx / distance) * 1.0 * delta;

    boss.position.z +=
      (dz / distance) * 1.0 * delta;
  }

  // Breathing
  boss.scale.y =
    1 + Math.sin(time * 2) * 0.012;

  // Heartbeat
  const pulse =
    3 + Math.sin(time * 7) * 1.2;

  boss.userData.heartLight.intensity = pulse;

  boss.userData.heart.scale.setScalar(
    1 + Math.sin(time * 7) * 0.08
  );

  // Vulnerability timer
  if (data.vulnerable) {

    data.vulnerabilityTimer -= delta;

    if (data.vulnerabilityTimer <= 0) {

      data.vulnerable = false;
    }
  }

  // Expose heart
  boss.userData.ribs.forEach(rib => {

    rib.visible = !data.vulnerable;

  });

  data.attackCooldown -= delta;

  if (data.attackCooldown <= 0 && distance < 13) {

    if (data.phase === 1) {

      data.attackCooldown = 2.7;

      data.attackType = "hammer";

      boss.userData.hammer.rotation.x = -1.2;

      if (callbacks.onAttack) {
        callbacks.onAttack("hammer", 18);
      }

    } else if (data.phase === 2) {

      data.attackCooldown = 2.3;

      data.attackType = "quake";

      if (callbacks.onAttack) {
        callbacks.onAttack("quake", 23);
      }

    } else {

      data.attackCooldown = 1.8;

      data.attackType = "hellfire";

      if (callbacks.onAttack) {
        callbacks.onAttack("hellfire", 28);
      }

    }
  }
const defeated = damageHollowKing(
  hollowKing,
  100
);

if (defeated) {

  console.log(
    "THE HOLLOW KING HAS FALLEN"
  );

}
  // Reset hammer pose
  boss.userData.hammer.rotation.x =
    THREE.MathUtils.damp(
      boss.userData.hammer.rotation.x,
      0,
      5,
      delta
    );

  // Glowing vulnerable heart
  boss.userData.heart.material.emissiveIntensity =
    data.vulnerable ? 7 : 3.5;

  boss.userData.aura.intensity =
    data.vulnerable ? 5 : 3;
}
import {
  createHollowKing,
  updateHollowKing,
  damageHollowKing
} from './hollow-king.js';
const hollowKing = createHollowKing(
  scene,
  camera
);
export function triggerHammerImpact(boss) {
  const anim = boss.userData.animations.hammerImpact;

  if (anim.active) return;

  anim.active = true;
  anim.time = 0;

  boss.userData.vulnerable = false;
}
function updateHammerImpact(boss, delta, callbacks = {}) {
  const anim = boss.userData.animations.hammerImpact;
  const hammer = boss.userData.parts.hammer;

  if (!anim.active || !hammer) return;

  anim.time += delta;

  const t = anim.time / anim.duration;

  // Stage 1: Raise hammer
  if (t < 0.45) {
    const lift = t / 0.45;

    hammer.rotation.x = -lift * 1.8;
    hammer.position.y = anim.originalY + lift * 2.2;
  }

  // Stage 2: Hold before impact
  else if (t < 0.65) {
    hammer.rotation.x = -1.8;
  }

  // Stage 3: Smash down
  else if (t < 0.85) {
    const slam = (t - 0.65) / 0.2;

    hammer.rotation.x = -1.8 + slam * 2.8;
    hammer.position.y =
      anim.originalY + 2.2 - slam * 2.2;
  }

  // Impact!
  if (t >= 0.85 && !anim.impactTriggered) {
    anim.impactTriggered = true;

    if (callbacks.onHammerImpact) {
      callbacks.onHammerImpact();
    }

    // Violent recoil
    boss.position.y += 0.15;
  }

  // Reset
  if (t >= 1) {
    anim.active = false;
    anim.time = 0;
    anim.impactTriggered = false;

    hammer.position.y = anim.originalY;
    hammer.rotation.x = 0;
  }
}
export function triggerHeartExposure(boss) {
  const anim = boss.userData.animations.heartExposure;

  if (anim.active) return;

  anim.active = true;
  anim.time = 0;

  boss.userData.vulnerable = true;
}
function updateHeartExposure(boss, delta) {
  const anim = boss.userData.animations.heartExposure;
  const parts = boss.userData.parts;

  if (!anim.active) return;

  anim.time += delta;

  const t = Math.min(anim.time / anim.duration, 1);

  // Slowly spread the ribs
  if (parts.ribs) {
    parts.ribs.forEach((rib, index) => {
      const side = index % 2 === 0 ? -1 : 1;

      rib.position.x +=
        side * delta * 0.45;

      rib.rotation.z +=
        side * delta * 0.35;
    });
  }

  // Heart begins to glow
  if (parts.heart) {
    const pulse =
      1 + Math.sin(anim.time * 9) * 0.16;

    parts.heart.scale.setScalar(pulse);

    if (parts.heart.material.emissive) {
      parts.heart.material.emissive.setHex(0xff1600);
      parts.heart.material.emissiveIntensity =
        2.5 + Math.sin(anim.time * 8) * 1.5;
    }
  }

  // Finish opening
  if (t >= 1) {
    anim.active = false;
  }
}
updateHammerImpact(boss, delta, callbacks);
updateHeartExposure(boss, delta);
if (
  boss.userData.phase === 3 &&
  !boss.userData.heartExposureStarted
) {
  boss.userData.heartExposureStarted = true;

  triggerHeartExposure(boss);
}
triggerHammerImpact(boss);
updateHollowKing(boss, camera, delta, {
  onHammerImpact: () => {
    console.log("THE HOLLOW KING HAS SMASHED THE GROUND!");

    // Connect your player damage and shockwave system here.
    // Example:
    // damagePlayer(35);
    // createGroundShockwave(boss.position);
    // shakeCamera(0.8);
  }
});