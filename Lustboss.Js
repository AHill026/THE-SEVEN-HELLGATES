

/*
=========================================================
THE SEVEN HELLGATES
SOVEREIGN OF DESIRE — BACKUP FILE
=========================================================

This is a backup module, not a standalone game.

Requires your main game to define:
THREE, world, camera, clock, state,
showMessage(), hurtPlayer().

Keep only one copy of each function in the main game.
Do not create another renderer or animation loop.
*/

// =======================================================
// BOSS REFERENCE
// =======================================================

let lustBoss = null;


// =======================================================
// CREATE THE SOVEREIGN OF DESIRE
// =======================================================

function createLustBoss() {

  if (lustBoss) return;

  const boss = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({
    color: 0x190b18,
    metalness: 0.82,
    roughness: 0.3
  });

  const flesh = new THREE.MeshStandardMaterial({
    color: 0x54102f,
    metalness: 0.25,
    roughness: 0.55
  });

  const glow = new THREE.MeshStandardMaterial({
    color: 0x7b00c9,
    emissive: 0x6500ff,
    emissiveIntensity: 2.4
  });

  boss.userData = {
    health: 1200,
    maxHealth: 1200,
    alive: true,
    attackTimer: 2,
    phase: 1,
    speed: 1.05,
    arms: []
  };

  // TORSO

  const torso = new THREE.Mesh(
    new THREE.CapsuleGeometry(
      0.85, 1.35, 6, 10
    ),
    armor
  );

  torso.position.y = 2.3;
  boss.add(torso);

  // HEAD

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(
      0.55, 16, 12
    ),
    flesh
  );

  head.position.y = 3.8;
  boss.add(head);

  // EYES AND HORNS

  for (const side of [-1, 1]) {

    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.095, 10, 8
      ),
      glow
    );

    eye.position.set(
      side * 0.22,
      3.85,
      -0.46
    );

    boss.add(eye);

    const horn = new THREE.Mesh(
      new THREE.ConeGeometry(
        0.17, 0.85, 8
      ),
      armor
    );

    horn.position.set(
      side * 0.38,
      4.35,
      0
    );

    horn.rotation.z = side * -0.35;

    boss.add(horn);
  }

  // FOUR SPECTRAL ARMS

  const bossArms = [];

  for (let i = 0; i < 4; i++) {

    const side = i % 2 === 0 ? -1 : 1;

    const arm = new THREE.Mesh(
      new THREE.CapsuleGeometry(
        0.19, 1.05, 4, 8
      ),
      i < 2 ? flesh : armor
    );

    arm.position.set(
      side * (1.0 + (i >= 2 ? 0.35 : 0)),
      2.55 - (i >= 2 ? 0.45 : 0),
      0
    );

    arm.rotation.z =
      side * (i >= 2 ? -0.8 : -0.25);

    boss.add(arm);
    bossArms.push(arm);
  }

  // CHEST CORE

  const chestCore = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.42, 1),
    glow
  );

  chestCore.position.set(
    0, 2.5, -0.75
  );

  boss.add(chestCore);

  // PURPLE AURA

  const aura = new THREE.PointLight(
    0x8a00ff, 4, 10
  );

  aura.position.y = 2.7;
  boss.add(aura);

  boss.userData.arms = bossArms;

  boss.position.set(0, 0, -17);

  world.add(boss);

  lustBoss = boss;

  state.lustBossActive = true;

  showMessage(
    'THE SOVEREIGN OF DESIRE AWAKENS'
  );
}


// =======================================================
// CHAINS OF DESIRE — RANGED PROJECTILE
// =======================================================
function updateBossProjectiles(dt) {
  for (let i = state.bossProjectiles.length - 1; i >= 0; i--) {
    const projectile = state.bossProjectiles[i];

    projectile.mesh.position.addScaledVector(
      projectile.velocity,
      dt
    );

    projectile.life -= dt;

    // Hit Azrael
    if (
      projectile.mesh.position.distanceTo(camera.position) < 1.2
    ) {
      hurtPlayer(14);
      projectile.life = 0;
    }

    // Remove expired or collided projectiles
    if (projectile.life <= 0) {
      world.remove(projectile.mesh);
      projectile.mesh.geometry.dispose();
      projectile.mesh.material.dispose();

      state.bossProjectiles.splice(i, 1);
    }
  }
}

function launchDesireChain() {

  if (!lustBoss || !lustBoss.userData.alive) {
    return;
    function updateBossProjectiles(dt) {
      for (let i = state.bossProjectiles.length - 1; i >= 0; i--) {
        const projectile = state.bossProjectiles[i];

        projectile.mesh.position.addScaledVector(
          projectile.velocity,
          dt
        );

        projectile.life -= dt;

        // Hit Azrael
        if (
          projectile.mesh.position.distanceTo(camera.position) < 1.2
        ) {
          hurtPlayer(14);
          projectile.life = 0;
        }

        // Remove expired or collided projectiles
        if (projectile.life <= 0) {
          world.remove(projectile.mesh);
          projectile.mesh.geometry.dispose();
          projectile.mesh.material.dispose();

          state.bossProjectiles.splice(i, 1);
        }
      }
    }
  }

  const origin = lustBoss.position.clone();

  origin.y += 2.5;

  const direction = new THREE.Vector3()
    .subVectors(camera.position, origin)
    .normalize();

  const chain = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.09, 0.09, 2.2, 8
    ),
    new THREE.MeshStandardMaterial({
      color: 0x9d00ff,
      emissive: 0x7200ff,
      emissiveIntensity: 3,
      metalness: 0.7,
      roughness: 0.25
    })
  );

  chain.position.copy(origin);

  chain.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  world.add(chain);

  state.bossProjectiles.push({

    mesh: chain,

    velocity: direction.multiplyScalar(
      lustBoss.userData.phase >= 3 ? 17 : 13
    ),

    life: 3

  });
}


// =======================================================
// BOSS AI — THREE PHASES
// =======================================================

function launchDesireChain() {
  if (!lustBoss || !lustBoss.userData.alive) return;

  const origin = lustBoss.position.clone();
  origin.y += 2.5;

  const direction = new THREE.Vector3()
    .subVectors(camera.position, origin)
    .normalize();

  const material = new THREE.MeshStandardMaterial({
    color: 0x9d00ff,
    emissive: 0x7200ff,
    emissiveIntensity: 3,
    metalness: 0.7,
    roughness: 0.25
  });

  const chain = new THREE.Mesh(
    new THREE.CylinderGeometry(.09, .09, 2.2, 8),
    material
  );

  chain.position.copy(origin);

  chain.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  world.add(chain);

  state.bossProjectiles.push({
    mesh: chain,
    velocity: direction.multiplyScalar(13),
    life: 3
  });
}
function launchDesireChain() {
  if (!lustBoss || !lustBoss.userData.alive) return;

  const origin = lustBoss.position.clone();
  origin.y += 2.5;

  const direction = new THREE.Vector3()
    .subVectors(camera.position, origin)
    .normalize();

  const chain = new THREE.Mesh(
    new THREE.CylinderGeometry(.09, .09, 2.2, 8),
    new THREE.MeshStandardMaterial({
      color: 0x9d00ff,
      emissive: 0x7200ff,
      emissiveIntensity: 3
    })
  );

  chain.position.copy(origin);

  chain.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  world.add(chain);

  const projectileSpeed =
    lustBoss.userData.phase >= 3 ? 17 : 13;

  state.bossProjectiles.push({
    mesh: chain,
    velocity: direction.multiplyScalar(projectileSpeed),
    life: 3
  });
}

function defeatLustBoss() {
  unlockLustReward();
  // Award the Sovereign of Desire armor set
  awardBossArmor(state, 'sovereign', showMessage);
  if (!lustBoss || !lustBoss.userData.alive) return;

  const data = lustBoss.userData;

  // Prevent repeated defeat triggers
  data.alive = false;
  data.health = 0;

  state.lustBossActive = false;
  state.lustBossDefeated = true;
  // OPEN THE PATH TO GLUTTONY
  createGluttonyGate();

function updateGluttonyGate() {
  if (!gluttonyGate || !gluttonyGate.visible) return;

  const dx = camera.position.x - gluttonyGate.position.x;
  const dz = camera.position.z - gluttonyGate.position.z;

  const distance = Math.hypot(dx, dz);
  

  if (distance < 3.5) {
    showMessage('PRESS E TO ENTER GLUTTONY');
  }
}

  if (gluttonyGate) {
    gluttonyGate.visible = true;
  }

  showMessage('THE GATE OF GLUTTONY HAS AWAKENED');

  // Stop the boss health bar
  const bossHUD = document.getElementById('bossHUD');
  if (bossHUD) bossHUD.style.display = 'none';

  // Begin cinematic collapse
  showMessage('THE SOVEREIGN HAS FALLEN');

  // Release the Soul Reapers
  unlockLustReward();
  activeWeapon: 'hellchain',

  // Explode the chest core
  spawnBurst(
    lustBoss.position.clone().add(
      new THREE.Vector3(0, 2.5, 0)
    ),
    0xb000ff
  );

  // Dramatic purple explosion
  for (let i = 0; i < 4; i++) {
    spawnBurst(
      lustBoss.position.clone().add(
        new THREE.Vector3(
          (Math.random() - .5) * 2,
          1 + Math.random() * 3,
          (Math.random() - .5) * 2
        )
      ),
      0x7100ff
    );
  }

  // Remove active projectiles
  for (const projectile of state.bossProjectiles) {
    world.remove(projectile.mesh);
    projectile.mesh.geometry.dispose();
    projectile.mesh.material.dispose();
  }

  state.bossProjectiles.length = 0;
}

function updateLustBoss(dt)
data.attackTimer -= dt;

data.attackTimer -= dt;

// PHASE II AND III — RANGED CHAIN ATTACK
if (
  data.phase >= 2 &&
  distance <= 18 &&
  data.attackTimer <= 0
) {
  showMessage('CHAINS OF DESIRE!');
  launchDesireChain();
  data.attackTimer = attackRate;
}

// PHASE I — SPECTRAL ARM SLAM
else if (
  distance <= 5.5 &&
  data.attackTimer <= 0
) {
  showMessage('SPECTRAL ARM SLAM!');

  if (distance <= 4.2) {
    hurtPlayer(18);
  }

  data.attackTimer = attackRate;
}
}

let gluttonyGate = null;

function createGluttonyGate() {
  if (gluttonyGate) return;

  const gate = new THREE.Group();

  const darkStone = new THREE.MeshStandardMaterial({
    color: 0x17100e,
    roughness: 0.9
  });

  const infernalGlow = new THREE.MeshStandardMaterial({
    color: 0x680b12,
    emissive: 0xff1600,
    emissiveIntensity: 2.5
  });

  // Two massive stone pillars
  for (const x of [-3, 3]) {
    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 7, 1),
      darkStone
    );

    pillar.position.set(x, 3.5, 0);
    gate.add(pillar);
  }

  // Stone arch
  const arch = new THREE.Mesh(
    new THREE.BoxGeometry(6.8, 0.8, 1),
    darkStone
  );

  arch.position.set(0, 7, 0);
  gate.add(arch);

  // Glowing portal
  const portal = new THREE.Mesh(
    new THREE.PlaneGeometry(5.4, 6),
    new THREE.MeshBasicMaterial({
      color: 0x9b0717,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    })
  );

  portal.position.set(0, 3.3, -0.15);
  gate.add(portal);

  // Portal core light
  const light = new THREE.PointLight(
    0xff1600,
    5,
    12
  );

  light.position.set(0, 3.5, 1);
  gate.add(light);

  // Gate appears ahead of the arena
  gate.position.set(0, 0, -27);

  gate.visible = false;

  world.add(gate);

  gluttonyGate = gate;
}

updateLustBoss(dt);
updateBossProjectiles(dt);
updateGluttonyGate();
updateGluttonyEmbers(dt);
updateGluttonyLava(dt);
updateHollowFeasters(dt);

{}
function createHollowFeaster(x, z) 
  const feaster = new THREE.Group();
  function updateHollowFeasters(dt)
  function updateExecutionPrompt() function executeHollowFeaster() }
  
    const enemy = state.executionTarget;

    if (
      !enemy ||
      !enemy.userData.alive ||
      enemy.userData.health > enemy.userData.maxHealth * 0.25 ||
      state.executionActive ||
      state.executionCooldown > 0
    ) return;

    const distance = enemy.position.distanceTo(camera.position);

    if (distance > 3.5) return;

    state.executionActive = true;
    state.executionCooldown = 4;
    state.executionTarget = null;
    executionShakeTimer = 0.45;
    executionShakeIntensity = 0.12;

    state.executionActive = true;
    combatSlowMotionTimer = 0.8;
    state.executionCooldown = 4;
    state.executionTarget = null;
    state.kills++;

    setTimeout(() => {
      state.executionActive = false;
    }, 1800);
    window.addEventListener('keydown', (event) => {
      if (event.code !== 'KeyF') return;

      if (event.repeat) return;

      executeHollowFeaster();
    });
  }
    let prompt = document.getElementById('executionPrompt');

    if (!prompt) {
      prompt = document.createElement('div');
      prompt.id = 'executionPrompt';

      Object.assign(prompt.style, {
        position: 'fixed',
        left: '50%',
        bottom: '25%',
        transform: 'translateX(-50%)',
        color: '#ff3030',
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '3px',
        textShadow: '0 0 12px #ff0000',
        zIndex: '9999',
        display: 'none',
        pointerEvents: 'none'
      });

      document.body.appendChild(prompt);
    }

    if (
      state.executionTarget &&
      !state.executionActive &&
      state.executionCooldown <= 0
    ) {
      prompt.textContent = 'PRESS F TO EXECUTE';
      prompt.style.display = 'block';
    } else {
      prompt.style.display = 'none';
    }
  }
  }
  {
    feaster.userData = {

    health: 180,

    maxHealth: 180,

    speed: 1.8,

    attackTimer: 1.5,

    alive: true,

    dying: false,

    deathTimer: 0,

    deathDuration: 1.8,

    phase: Math.random() * Math.PI * 21.gluttonyEnvironment.userData.feasters =
    gluttonyEnvironment.userData.feasters.filter(
      enemy => enemy.userData.alive
    );
    
    
    function spawnHollowFeasterWave(count = 5) {
      
      function initializeGluttonyChapter() {
        
        function positionAzraelForGluttony() {
          // Place Azrael near the entrance of the cathedral
          camera.position.set(0, 1.72, -42);

          // Face deeper into the Gluttony realm
          state.yaw = 0;
          state.pitch = 0;

          camera.rotation.order = 'YXZ';
          camera.rotation.set(0, 0, 0);

          // Reset movement
          state.verticalVelocity = 0;
          state.grounded = true;

          // Reset combat cooldowns
          state.attackCooldown = 0;
          state.heavyCooldown = 0;
          state.hurtCooldown = 0;
        }
        
        if (state.gluttonyInitialized) return;

        // Build the environment
        createGluttonyEnvironment();

        // Reveal the new realm
        gluttonyEnvironment.visible = true;

        // Initialize atmospheric effects
        createGluttonyEmbers();

        // Spawn the first enemy wave
        spawnHollowFeasterWave(5);

        // Mark Chapter II as prepared
        state.gluttonyInitialized = true;

        showMessage('CHAPTER II — THE MAW OF ENDLESS HUNGER');
      }
      
      if (!gluttonyEnvironment) return;

      if (!gluttonyEnvironment.userData.feasters) {
        gluttonyEnvironment.userData.feasters = [];
      }

      const feasterPositions = [
        [-9, -52],
        [9, -58],
        [-14, -72],
        [14, -78],
        [0, -88],
        [-18, -95],
        [18, -95]
      ];

      for (let i = 0; i < count; i++) {
        const position = feasterPositions[
          i % feasterPositions.length
        ];

        const enemy = createHollowFeaster(
          position[0],
          position[1]
        );

        gluttonyEnvironment.userData.feasters.push(enemy);
      }

      showMessage('THE HOLLOW FEASTERS AWAKEN');
    }
    
    if (!gluttonyEnvironment || !gluttonyEnvironment.visible) return;

    if (!gluttonyEnvironment.userData.feasters) return;

    for (const enemy of gluttonyEnvironment.userData.feasters) {
      if (!enemy.userData.alive) continue;

      const data = enemy.userData;

      const dx = camera.position.x - enemy.position.x;
      const dz = camera.position.z - enemy.position.z;

      const distance = Math.hypot(dx, dz);

      // Face Azrael
      enemy.rotation.y = Math.atan2(dx, dz);

      // Hunt the player
      if (distance > 1.7) {
        enemy.position.x +=
          (dx / (distance || 1)) * data.speed * dt;

        enemy.position.z +=
          (dz / (distance || 1)) * data.speed * dt;
      } else {
        // Attack Azrael
        data.attackTimer -= dt;

        if (data.attackTimer <= 0) {
          showMessage('THE FEASTER BITES!');

          hurtPlayer(12);

          data.attackTimer = 1.6;
        }
      }

      // Horrifying body movement
      enemy.position.y =
        Math.abs(Math.sin(clock.elapsedTime * 5 + data.phase)) * 0.08;

      enemy.rotation.z =
        Math.sin(clock.elapsedTime * 3 + data.phase) * 0.035;
    }
  }
  
  const enemy = new THREE.Group();

  const flesh = new THREE.MeshStandardMaterial({
    color: 0x71605b,
    roughness: 0.95
  });

  const corruptedArmor = new THREE.MeshStandardMaterial({
    color: 0x211014,
    roughness: 0.85
  });

  const redGlow = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 3
  });

  // Hunched torso
  const torso = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.42, 0.9, 4, 8),
    flesh
  );

  torso.position.y = 1.45;
  torso.rotation.x = -0.25;
  enemy.add(torso);

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 12, 10),
    flesh
  );

  head.position.set(0, 2.35, -0.12);
  enemy.add(head);

  // Oversized mouth
  const mouth = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0x080000 })
  );

  mouth.scale.set(1.2, 1.5, 0.5);
  mouth.position.set(0, 2.2, -0.43);
  enemy.add(mouth);

  // Glowing eyes
  for (const xEye of [-0.16, 0.16]) {
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 8, 8),
      redGlow
    );

    eye.position.set(xEye, 2.43, -0.43);
    enemy.add(eye);
  }

  // Shoulder armor
  for (const side of [-1, 1]) {
    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 8, 8),
      corruptedArmor
    );

    shoulder.position.set(side * 0.48, 1.9, 0);
    enemy.add(shoulder);
  }

  enemy.position.set(x, 0, z);

  enemy.userData.health = 180;
  enemy.userData.maxHealth = 180;
  enemy.userData.speed = 1.8;
  enemy.userData.attackTimer = 1.5;
  enemy.userData.alive = true;
  enemy.userData.phase = Math.random() * Math.PI * 2;

  gluttonyEnvironment.add(enemy);

  return enemy;
}


function updateGluttonyFlesh(dt);

function updateGluttonyLava(dt) {
  if (!gluttonyEnvironment) return;
  if (!gluttonyEnvironment.visible) return;
state.executionTarget = null;

if (state.executionCooldown > 0) {
  state.executionCooldown -= dt;
}

if (state.executionActive) return;
  gluttonyEnvironment.children.forEach((object) => {const distance = enemy.position.distanceTo(camera.position);
  if (
    enemy.userData.alive &&
    !enemy.userData.dying &&
    enemy.userData.health <= enemy.userData.maxHealth * 0.25 &&
    distance <= 3.5 &&
    !state.executionTarget
  ) {
    state.executionTarget = enemy;
  }
    if (
      object.material &&
      object.material.emissive &&
      object.material.emissive.getHex() === 0xff1000
    ) {
      object.material.emissiveIntensity =
        2.5 + Math.sin(clock.elapsedTime * 3) * 0.6;
    }
  });
}

  updateGluttonyEmbers(dt);
  if (!gluttonyEnvironment) return;

  if (!gluttonyEnvironment.visible) return;

  const time = clock.elapsedTime;

  gluttonyEnvironment.children.forEach((object) => {
    if (!object.userData.fleshGrowth) return;

    const pulse =
      1 + Math.sin(time * 2.2 + object.userData.phase) * 0.045;

    object.scale.y = object.userData.baseScaleY * pulse;
  });
}


  if (!lustBoss || !lustBoss.userData.alive) {
    return;
  }

  if (
    !state.lustBossActive ||
    !state.active
  ) {
    return;
  }

  const data = lustBoss.userData;

  // HEALTH BAR

  const bossHUD =
    document.getElementById('bossHUD');

  const bossHealthFill =
    document.getElementById('bossHealthFill');

  const bossHealthText =
    document.getElementById('bossHealthText');

  if (
    bossHUD &&
    bossHealthFill &&
    bossHealthText
  ) {

    bossHUD.style.display = 'block';

    const healthPercent = Math.max(
      0,
      (data.health / data.maxHealth) * 100
    );

    bossHealthFill.style.width =
      healthPercent + '%';

    bossHealthText.textContent =
      Math.ceil(data.health) +
      ' / ' +
      data.maxHealth;
  }

  // PHASE TRANSITIONS

  const healthRatio =
    data.health / data.maxHealth;

  if (healthRatio > 0.70) {

    data.phase = 1;
    data.speed = 1.05;

  } else if (healthRatio > 0.35) {

    if (data.phase !== 2) {
      showMessage(
        'PHASE II — THE TEMPTATION'
      );
    }

    data.phase = 2;
    data.speed = 1.65;

  } else if (healthRatio > 0) {

    if (data.phase !== 3) {
      showMessage(
        'PHASE III — THE UNBOUND'
      );
    }

    data.phase = 3;
    data.speed = 2.35;
  }

  const attackRate =
    data.phase === 3 ? 1.65 :
    data.phase === 2 ? 2.3 : 3.2;

  // TRACK AZRAEL

  const dx =
    camera.position.x - lustBoss.position.x;

  const dz =
    camera.position.z - lustBoss.position.z;

  const distance = Math.hypot(dx, dz);

  lustBoss.rotation.y =
    Math.atan2(dx, dz);

  if (distance > 4.5) {

    lustBoss.position.x +=
      (dx / (distance || 1)) *
      data.speed * dt;

    lustBoss.position.z +=
      (dz / (distance || 1)) *
      data.speed * dt;
  }

  // FLOATING MOVEMENT

  lustBoss.position.y =
    Math.sin(clock.elapsedTime * 2) * 0.08;

  // SPECTRAL ARM ANIMATION

  if (data.arms) {

    data.arms.forEach((arm, index) => {

      arm.rotation.z =
        Math.sin(
          clock.elapsedTime * 3 + index
        ) * 0.22;

    });
  }

  // ATTACK SYSTEM

  data.attackTimer -= dt;

  // PHASE II AND III: RANGED CHAINS

  if (
    data.phase >= 2 &&
    distance <= 18 &&
    data.attackTimer <= 0
  ) {

    showMessage('CHAINS OF DESIRE!');

    launchDesireChain();

    data.attackTimer = attackRate;

  }

  // PHASE I: SPECTRAL ARM SLAM

  else if (
    distance <= 5.5 &&
    data.attackTimer <= 0
  ) {

    showMessage('SPECTRAL ARM SLAM!');

    if (distance <= 4.2) {
      hurtPlayer(18);
    }

    data.attackTimer = attackRate;
  }
}


// =======================================================
// PROJECTILE MOVEMENT AND COLLISION
// =======================================================

function updateBossProjectiles(dt) {

  if (!state.bossProjectiles) return;

  for (
    let i = state.bossProjectiles.length - 1;
    i >= 0;
    i--
  ) {

    const projectile =
      state.bossProjectiles[i];

    projectile.mesh.position.addScaledVector(
      projectile.velocity,
      dt
    );

    projectile.life -= dt;

    // HIT AZRAEL

    if (
   projectile.mesh.position.distanceTo(
        camera.position
      ) < 1.0
    ) {

      hurtPlayer(14);

      projectile.life = 0;
    }

    // REMOVE EXPIRED PROJECTILE

    if (projectile.life <= 0) {

      world.remove(projectile.mesh);

      projectile.mesh.geometry.dispose();

      projectile.mesh.material.dispose();

      state.bossProjectiles.splice(i, 1);
    }
  }
}



// =======================================================
// BOSS DAMAGE
// =======================================================

// Your working performAttack() already handles
// boss damage. Keep that existing code.
// Do not add a duplicate damage system.

function activateInfernalRipper() {
  if (state.activeWeapon !== 'infernalripper') return;

  if (!infernalRipperRig.visible) return;

  const ripper = infernalRipperRig.userData;

  if (!ripper.active) {
    ripper.active = true;
    showMessage('INFERNAL RIPPER — ENGAGED!');
  }

  ripper.saw.rotation.x = 0.12;
  ripper.glow.intensity = 4;

  // Find nearby Gluttony enemies
  if (typeof gluttonyEnemies === 'undefined') return;

  gluttonyEnemies.forEach(enemy => {
    if (!enemy.userData.alive) return;

    const distance = camera.position.distanceTo(
      enemy.position
    );

    if (distance > 2.8) return;

    enemy.userData.health -= 12;

    if (enemy.userData.health <= 0) {
      enemy.userData.health = 0;
      enemy.userData.alive = false;
      enemy.userData.dying = true;
      enemy.userData.deathTimer = 0;
      enemy.userData.deathDuration = 1.8;

      spawnBurst(enemy.position.clone(), 0xff2200);
      state.kills++;

      showMessage('INFERNAL RIPPER EXECUTION!');
    }
  });
}


