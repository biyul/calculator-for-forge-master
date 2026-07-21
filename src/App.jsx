import { useMemo, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { STATS } from './stats'
import StatInput from './components/StatInput'
import { Button } from '@/components/ui/button'

const initialStats = Object.fromEntries(STATS.map((s) => [s.key, s.min]))

function App() {
  const [stats, setStats] = useState(initialStats)

  const powerLevel = useMemo(() => {
    const total = STATS.reduce((sum, stat) => {
      const value = stats[stat.key]
      return sum + ((value - stat.min) / (stat.max - stat.min)) * 100
    }, 0)
    return Math.round(total)
  }, [stats])

  function updateStat(key, value) {
    setStats((prev) => ({ ...prev, [key]: value }))
  }

  function setAllStats(mode) {
    setStats(Object.fromEntries(STATS.map((s) => [s.key, mode === 'max' ? s.max : 0])))
  }

  return (
    <div className="px-4 pb-6">
      <h1 className="py-5 text-center text-2xl font-medium tracking-tight">
        DPS Calculator
      </h1>

      <div className="mx-auto flex max-w-lg flex-col">
        <div className="pb-4 text-center">
          <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Power Level
          </div>
          <div className="text-5xl font-bold tabular-nums">{powerLevel}</div>
        </div>

        <div className="flex justify-end gap-1 pb-2">
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            aria-label="Set all stats to 0"
            onClick={() => setAllStats('min')}
          >
            <Minus />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            aria-label="Set all stats to max"
            onClick={() => setAllStats('max')}
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
              onChange={(value) => updateStat(stat.key, value)}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default App
