export interface AttackEvent {
  kind: 'attack'
  time: number
  attackerLabel: string
  targetLabel: string
  damage: number
  isCrit: boolean
  isBlocked: boolean
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
  critChance: number
  critDamageMultiplier: number
  blockChance: number
}

interface RawAttack {
  time: number
  attackerLabel: string
  targetLabel: string
  damage: number
  isCrit: boolean
  isBlocked: boolean
}

const TIMELINE_DURATION_SEC = 15
const EPSILON = 1e-9

function buildCombatantAttacks(attacker: CombatantInput, target: CombatantInput): RawAttack[] {
  const effectiveAttackSpeed = attacker.baseAttackSpeed * (1 + attacker.attackSpeedPercent / 100)
  const interval = 1 / effectiveAttackSpeed
  const attacks: RawAttack[] = []

  for (let t = interval; t <= TIMELINE_DURATION_SEC + EPSILON; t += interval) {
    const isBlocked = Math.random() * 100 < target.blockChance
    const isCrit = Math.random() * 100 < attacker.critChance
    const damage = isBlocked
      ? 0
      : isCrit
        ? Math.round(attacker.attackDamage * (1 + attacker.critDamageMultiplier / 100))
        : attacker.attackDamage

    attacks.push({
      time: Math.round(t * 100) / 100,
      attackerLabel: attacker.label,
      targetLabel: target.label,
      damage,
      isCrit,
      isBlocked,
    })
  }

  return attacks
}

export function buildTimeline(combatants: [CombatantInput, CombatantInput]): TimelineEvent[] {
  const [a, b] = combatants

  const attacks = [
    ...buildCombatantAttacks(a, b),
    ...buildCombatantAttacks(b, a),
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
      isCrit: attack.isCrit,
      isBlocked: attack.isBlocked,
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
