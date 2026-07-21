// Stat definitions for the Forge Master DPS calculator.
// `base` is the value a character has even with 0 invested (only crit damage has one).
export const STATS = [
  { key: 'block', label: 'Block', min: 1, max: 7, unit: '%' },
  { key: 'attackSpeed', label: 'Att Speed', min: 1, max: 40, unit: '%' },
  { key: 'critChance', label: 'Crit Chance', min: 1, max: 12, unit: '%' },
  { key: 'critDamage', label: 'Crit Damage', min: 1, max: 80, unit: '%', base: 20 },
  { key: 'skillDamage', label: 'Skill Damage', min: 1, max: 30, unit: '%' },
  { key: 'healthReg', label: 'Health Reg', min: 1, max: 4, unit: '%' },
  { key: 'doubleChance', label: 'Double Chance', min: 1, max: 20, unit: '%' },
  { key: 'rangedDamage', label: 'Ranged Damage', min: 1, max: 25, unit: '%' },
  { key: 'meleeDamage', label: 'Melee Damage', min: 1, max: 25, unit: '%' },
  { key: 'damage', label: 'Damage', min: 1, max: 15, unit: '%' },
  { key: 'skillCooldown', label: 'Skill Cooldown', min: 1, max: 6, unit: '%' },
  { key: 'lifesteal', label: 'Lifesteal', min: 1, max: 20, unit: '%' },
]
