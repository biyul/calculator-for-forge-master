// Base character stats. Fixed for now; will likely become derived/editable later.
export interface BaseStat {
  key: string
  label: string
  value: number
}

export const BASE_STATS: BaseStat[] = [
  { key: 'attack', label: 'Attack', value: 100 },
  { key: 'hp', label: 'HP', value: 1000 },
]
