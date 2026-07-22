export interface TimelineEvent {
  time: number
  text: string
}

export interface CombatantInput {
  label: string
  baseAttackSpeed: number
  attackSpeedPercent: number
  attackDamage: number
}

const TIMELINE_DURATION_SEC = 15
const EPSILON = 1e-9

function buildCombatantEvents(combatant: CombatantInput): TimelineEvent[] {
  const effectiveAttackSpeed = combatant.baseAttackSpeed * (1 + combatant.attackSpeedPercent / 100)
  const interval = 1 / effectiveAttackSpeed
  const events: TimelineEvent[] = []

  for (let t = interval; t <= TIMELINE_DURATION_SEC + EPSILON; t += interval) {
    events.push({
      time: Math.round(t * 100) / 100,
      text: `${combatant.label} attacks for ${combatant.attackDamage} damage`,
    })
  }

  return events
}

export function buildTimeline(combatants: CombatantInput[]): TimelineEvent[] {
  const events = combatants.flatMap(buildCombatantEvents)
  events.sort((a, b) => a.time - b.time)
  return events
}
