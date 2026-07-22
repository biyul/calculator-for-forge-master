export interface AttackEvent {
  kind: 'attack'
  time: number
  attackerLabel: string
  targetLabel: string
  damage: number
  targetHpAfter: number
  targetMaxHp: number
}

export interface VictoryEvent {
  kind: 'victory'
  time: number
  winnerLabel: string
}

export type TimelineEvent = AttackEvent | VictoryEvent

export interface CombatantInput {
  label: string
  baseAttackSpeed: number
  attackSpeedPercent: number
  attackDamage: number
  hp: number
}

interface RawAttack {
  time: number
  attackerLabel: string
  targetLabel: string
  damage: number
}

const TIMELINE_DURATION_SEC = 15
const EPSILON = 1e-9

function buildCombatantAttacks(attacker: CombatantInput, targetLabel: string): RawAttack[] {
  const effectiveAttackSpeed = attacker.baseAttackSpeed * (1 + attacker.attackSpeedPercent / 100)
  const interval = 1 / effectiveAttackSpeed
  const attacks: RawAttack[] = []

  for (let t = interval; t <= TIMELINE_DURATION_SEC + EPSILON; t += interval) {
    attacks.push({
      time: Math.round(t * 100) / 100,
      attackerLabel: attacker.label,
      targetLabel,
      damage: attacker.attackDamage,
    })
  }

  return attacks
}

export function buildTimeline(combatants: [CombatantInput, CombatantInput]): TimelineEvent[] {
  const [a, b] = combatants

  const attacks = [
    ...buildCombatantAttacks(a, b.label),
    ...buildCombatantAttacks(b, a.label),
  ].sort((x, y) => x.time - y.time)

  const maxHp: Record<string, number> = { [a.label]: a.hp, [b.label]: b.hp }
  const currentHp: Record<string, number> = { ...maxHp }

  const timeline: TimelineEvent[] = []

  for (const attack of attacks) {
    currentHp[attack.targetLabel] = Math.max(0, currentHp[attack.targetLabel] - attack.damage)
    timeline.push({
      kind: 'attack',
      time: attack.time,
      attackerLabel: attack.attackerLabel,
      targetLabel: attack.targetLabel,
      damage: attack.damage,
      targetHpAfter: currentHp[attack.targetLabel],
      targetMaxHp: maxHp[attack.targetLabel],
    })

    if (currentHp[attack.targetLabel] <= 0) {
      timeline.push({
        kind: 'victory',
        time: attack.time,
        winnerLabel: attack.attackerLabel,
      })
      break
    }
  }

  return timeline
}
