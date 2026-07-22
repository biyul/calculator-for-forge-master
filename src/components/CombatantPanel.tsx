import { Minus, Plus } from 'lucide-react'
import { STATS } from '../stats.ts'
import { BASE_STATS } from '../baseStats.ts'
import type { StatValues } from '../useCombatantStats.ts'
import StatInput from './StatInput.tsx'
import { Button } from '@/components/ui/button'

interface CombatantPanelProps {
  title: string
  stats: StatValues
  powerLevel: number
  onUpdateStat: (key: string, value: number) => void
  onSetAll: (mode: 'min' | 'max') => void
}

export default function CombatantPanel({
  title,
  stats,
  powerLevel,
  onUpdateStat,
  onSetAll,
}: CombatantPanelProps) {
  return (
    <div className="flex w-full max-w-lg flex-col">
      <h2 className="pb-3 text-center text-lg font-semibold">{title}</h2>

      <div className="pb-4 text-center">
        <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Power Level
        </div>
        <div className="text-5xl font-bold tabular-nums">{powerLevel}</div>
      </div>

      <div className="mb-4 border-y py-3">
        <div className="mb-2 text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Base Stats
        </div>
        <div className="flex justify-center gap-8">
          {BASE_STATS.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-sm font-semibold">{stat.label}</div>
              <div className="text-xl font-bold tabular-nums">
                {stat.value.toFixed(stat.decimals ?? 0)}
                {stat.unit ?? ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-1 pb-2">
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          aria-label={`Set all ${title} stats to 0`}
          onClick={() => onSetAll('min')}
        >
          <Minus />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          aria-label={`Set all ${title} stats to max`}
          onClick={() => onSetAll('max')}
        >
          <Plus />
        </Button>
      </div>

      <section className="flex flex-col">
        {STATS.map((stat) => (
          <StatInput
            key={stat.key}
            stat={stat}
            value={stats[stat.key]}
            onChange={(value) => onUpdateStat(stat.key, value)}
          />
        ))}
      </section>
    </div>
  )
}
