// Stat definitions for the DPS calculator.
// `base` is the value a character has even with 0 invested (only crit damage has one).
export interface Stat {
  key: string
  label: string
  min: number
  max: number
  unit: string
  base?: number
}

export const STATS: Stat[] = [
  { key: 'block', label: 'Block', min: 0, max: 7, unit: '%' },
  { key: 'attackSpeed', label: 'Att Speed', min: 0, max: 40, unit: '%' },
  { key: 'critChance', label: 'Crit Chance', min: 0, max: 50, unit: '%' },
  { key: 'critDamage', label: 'Crit Damage', min: 0, max: 80, unit: '%', base: 20 },
  { key: 'skillDamage', label: 'Skill Damage', min: 0, max: 30, unit: '%' },
  { key: 'healthReg', label: 'Health Reg', min: 0, max: 4, unit: '%' },
  { key: 'doubleChance', label: 'Double Chance', min: 0, max: 20, unit: '%' },
  { key: 'rangedDamage', label: 'Ranged Damage', min: 0, max: 25, unit: '%' },
  { key: 'meleeDamage', label: 'Melee Damage', min: 0, max: 25, unit: '%' },
  { key: 'damage', label: 'Damage', min: 0, max: 15, unit: '%' },
  { key: 'skillCooldown', label: 'Skill Cooldown', min: 0, max: 6, unit: '%' },
  { key: 'lifesteal', label: 'Lifesteal', min: 0, max: 20, unit: '%' },
]

export function getStatBase(key: string): number {
  return STATS.find((s) => s.key === key)?.base ?? 0
}
