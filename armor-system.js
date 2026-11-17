// =====================================
// AZRAEL ARMOR PROGRESSION
// =====================================

level: 1,
xp: 0,
xpToNextLevel: 250,

armorInventory: [],

equippedArmor: {
  helmet: null,
  chestplate: null,
  gauntlets: null,
  greaves: null,
  boots: null
},

armorStats: {
  defense: 0,
  strength: 0,
  vitality: 0,
  wrath: 0,
  soulEnergy: 0
},
// =====================================
// THE SEVEN HELLGATES — ARMOR DATABASE
// =====================================

const ARMOR_DATABASE = {

  sovereignHelmet: {
    id: 'sovereign_helmet',
    name: 'Crown of Desire',
    set: 'Sovereign of Desire',
    slot: 'helmet',
    rarity: 'Legendary',
    defense: 12,
    strength: 3,
    vitality: 15,
    wrath: 8,
    soulEnergy: 10
  },

  sovereignChest: {
    id: 'sovereign_chest',
    name: 'Heart of Temptation',
    set: 'Sovereign of Desire',
    slot: 'chestplate',
    rarity: 'Legendary',
    defense: 25,
    strength: 8,
    vitality: 30,
    wrath: 12,
    soulEnergy: 15
  },

  sovereignGauntlets: {
    id: 'sovereign_gauntlets',
    name: 'Grasp of the Damned',
    set: 'Sovereign of Desire',
    slot: 'gauntlets',
    rarity: 'Legendary',
    defense: 10,
    strength: 15,
    vitality: 5,
    wrath: 12,
    soulEnergy: 5
  },

  sovereignGreaves: {
    id: 'sovereign_greaves',
    name: 'Legguards of Temptation',
    set: 'Sovereign of Desire',
    slot: 'greaves',
    rarity: 'Legendary',
    defense: 14,
    strength: 4,
    vitality: 15,
    wrath: 5,
    soulEnergy: 8
  },

  sovereignBoots: {
    id: 'sovereign_boots',
    name: 'Walkers of the Abyss',
    set: 'Sovereign of Desire',
    slot: 'boots',
    rarity: 'Legendary',
    defense: 9,
    strength: 5,
    vitality: 10,
    wrath: 8,
    soulEnergy: 12
  }

};
// =====================================
// BOSS ARMOR REWARD SYSTEM
// =====================================

function awardBossArmor(bossName) {
  if (!bossName) return;

  if (!state.defeatedBosses) {
    state.defeatedBosses = [];
  }

  if (state.defeatedBosses.includes(bossName)) {
    showMessage('BOSS ARMOR ALREADY CLAIMED');
    return;
  }

  const bossArmorRewards = {
    sovereign: [
      'sovereign_helmet',
      'sovereign_chest',
      'sovereign_gauntlets',
      'sovereign_greaves',
      'sovereign_boots'
    ]
  };

  const rewards = bossArmorRewards[bossName];

  if (!rewards) return;

  rewards.forEach((armorId) => {
    const armorPiece = Object.values(ARMOR_DATABASE)
      .find(piece => piece.id === armorId);

    if (!armorPiece) return;

    state.armorInventory.push({
      ...armorPiece
    });
  });

  state.defeatedBosses.push(bossName);

  showMessage('LEGENDARY ARMOR SET ACQUIRED!');
}

// =====================================
// THE SEVEN HELLGATES
// ARMOR SYSTEM MODULE
// =====================================

export const ARMOR_DATABASE = {

  sovereignHelmet: {
    id: 'sovereign_helmet',
    name: 'Crown of Desire',
    set: 'Sovereign of Desire',
    slot: 'helmet',
    rarity: 'Legendary',
    defense: 12,
    strength: 3,
    vitality: 15,
    wrath: 8,
    soulEnergy: 10
  },

  sovereignChest: {
    id: 'sovereign_chest',
    name: 'Heart of Temptation',
    set: 'Sovereign of Desire',
    slot: 'chestplate',
    rarity: 'Legendary',
    defense: 25,
    strength: 8,
    vitality: 30,
    wrath: 12,
    soulEnergy: 15
  },

  sovereignGauntlets: {
    id: 'sovereign_gauntlets',
    name: 'Grasp of the Damned',
    set: 'Sovereign of Desire',
    slot: 'gauntlets',
    rarity: 'Legendary',
    defense: 10,
    strength: 15,
    vitality: 5,
    wrath: 12,
    soulEnergy: 5
  },

  sovereignGreaves: {
    id: 'sovereign_greaves',
    name: 'Legguards of Temptation',
    set: 'Sovereign of Desire',
    slot: 'greaves',
    rarity: 'Legendary',
    defense: 14,
    strength: 4,
    vitality: 15,
    wrath: 5,
    soulEnergy: 8
  },

  sovereignBoots: {
    id: 'sovereign_boots',
    name: 'Walkers of the Abyss',
    set: 'Sovereign of Desire',
    slot: 'boots',
    rarity: 'Legendary',
    defense: 9,
    strength: 5,
    vitality: 10,
    wrath: 8,
    soulEnergy: 12
  }

};

export function awardBossArmor(state, bossName, showMessage) {
  if (!state || !bossName) return [];

  state.defeatedBosses ??= [];
  state.armorInventory ??= [];

  if (state.defeatedBosses.includes(bossName)) {
    showMessage?.('BOSS ARMOR ALREADY CLAIMED');
    return [];
  }

  const bossArmorRewards = {
    sovereign: [
      'sovereign_helmet',
      'sovereign_chest',
      'sovereign_gauntlets',
      'sovereign_greaves',
      'sovereign_boots'
    ]
  };

  const rewards = bossArmorRewards[bossName];

  if (!rewards) return [];

  const awarded = rewards
    .map(id => Object.values(ARMOR_DATABASE).find(piece => piece.id === id))
    .filter(Boolean);

  state.armorInventory.push(...awarded.map(piece => ({ ...piece })));
  state.defeatedBosses.push(bossName);

  showMessage?.('LEGENDARY ARMOR SET ACQUIRED!');

  return awarded;
}
