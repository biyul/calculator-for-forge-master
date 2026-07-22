import { useMemo } from 'react'
import { getBaseStat } from './baseStats.ts'
import { buildTimeline } from './simulator.ts'
import { useCombatantStats } from './useCombatantStats.ts'
import CombatantPanel from './components/CombatantPanel.tsx'

function App() {
  const player = useCombatantStats()
  const foe = useCombatantStats()

  const timeline = useMemo(
    () =>
      buildTimeline([
        {
          label: 'Player',
          baseAttackSpeed: getBaseStat('attackSpeed'),
          attackSpeedPercent: player.stats.attackSpeed,
          attackDamage: getBaseStat('attack'),
        },
        {
          label: 'Foe',
          baseAttackSpeed: getBaseStat('attackSpeed'),
          attackSpeedPercent: foe.stats.attackSpeed,
          attackDamage: getBaseStat('attack'),
        },
      ]),
    [player.stats.attackSpeed, foe.stats.attackSpeed],
  )

  return (
    <div className="px-4 pb-6">
      <h1 className="py-5 text-center text-2xl font-medium tracking-tight">
        DPS Calculator
      </h1>

      <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
        <CombatantPanel
          title="Player"
          stats={player.stats}
          powerLevel={player.powerLevel}
          onUpdateStat={player.updateStat}
          onSetAll={player.setAllStats}
        />

        <CombatantPanel
          title="Foe"
          stats={foe.stats}
          powerLevel={foe.powerLevel}
          onUpdateStat={foe.updateStat}
          onSetAll={foe.setAllStats}
        />

        <div className="w-full max-w-md shrink-0 lg:w-[22rem]">
          <div className="mb-2 text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Simulation
          </div>
          <div className="flex max-h-[80vh] flex-col gap-3 overflow-y-auto font-mono text-sm whitespace-nowrap">
            {timeline.map((event, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-muted-foreground">t={event.time.toFixed(2)}s</span>
                <span>{event.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
