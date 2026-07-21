export interface TimelineEvent {
  time: number
  text: string
}

const TIMELINE_DURATION_SEC = 15
const EPSILON = 1e-9

export function buildTimeline(
  baseAttackSpeed: number,
  attackSpeedPercent: number,
  attackDamage: number,
): TimelineEvent[] {
  const effectiveAttackSpeed = baseAttackSpeed * (1 + attackSpeedPercent / 100)
  const interval = 1 / effectiveAttackSpeed
  const events: TimelineEvent[] = []

  for (let t = interval; t <= TIMELINE_DURATION_SEC + EPSILON; t += interval) {
    events.push({
      time: Math.round(t * 100) / 100,
      text: `Player attacks for ${attackDamage} damage`,
    })
  }

  return events
}
