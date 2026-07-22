import { useMemo, useState } from 'react'
import { RotateCw } from 'lucide-react'
import { getBaseStat } from './baseStats.ts'
import { getStatBase } from './stats.ts'
import { buildTimeline, type AttackEvent } from './simulator.ts'
import { hpColorClass } from './hpColor.ts'
import { useCombatantStats } from './useCombatantStats.ts'
import CombatantPanel from './components/CombatantPanel.tsx'
import { Button } from '@/components/ui/button'

function App() {
  const player = useCombatantStats()
  const foe = useCombatantStats()
  const [rerunCount, setRerunCount] = useState(0)

  const timeline = useMemo(
    () =>
      buildTimeline([
        {
          label: 'Player',
          baseAttackSpeed: getBaseStat('attackSpeed'),
          attackSpeedPercent: player.stats.attackSpeed,
          attackDamage: getBaseStat('attack'),
          hp: getBaseStat('hp'),
          critChance: player.stats.critChance,
          critDamageMultiplier: getStatBase('critDamage') + player.stats.critDamage,
          blockChance: player.stats.block,
        },
        {
          label: 'Foe',
          baseAttackSpeed: getBaseStat('attackSpeed'),
          attackSpeedPercent: foe.stats.attackSpeed,
          attackDamage: getBaseStat('attack'),
          hp: getBaseStat('hp'),
          critChance: foe.stats.critChance,
          critDamageMultiplier: getStatBase('critDamage') + foe.stats.critDamage,
          blockChance: foe.stats.block,
        },
      ]),
    [
      player.stats.attackSpeed,
      player.stats.critChance,
      player.stats.critDamage,
      player.stats.block,
      foe.stats.attackSpeed,
      foe.stats.critChance,
      foe.stats.critDamage,
      foe.stats.block,
      rerunCount,
    ],
  )

  const attackEvents = timeline.filter((e): e is AttackEvent => e.kind === 'attack')
  const victoryEvent = timeline.find((e) => e.kind === 'victory')

  return (
    <div className="px-4 pb-6">
      <h1 className="py-5 text-center text-2xl font-medium tracking-tight">
        DPS Calculator
      </h1>

      <div className="mx-auto flex max-w-375 flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
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

        <div className="w-full max-w-md shrink-0 lg:w-88">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Simulation
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon-xs"
              aria-label="Rerun simulation"
              onClick={() => setRerunCount((n) => n + 1)}
            >
              <RotateCw />
            </Button>
          </div>
          <div className="flex max-h-[80vh] flex-col gap-3 overflow-y-auto font-mono text-sm whitespace-nowrap">
            {attackEvents.map((event, index) => {
              if (event.isBlocked) {
                return (
                  <div key={index} className="flex flex-col">
                    <span className="text-muted-foreground">t={event.time.toFixed(2)}s</span>
                    <span>
                      {event.attackerLabel}
                      {': '}
                      <span className="font-bold text-black">Attack</span>
                      {'!'}
                      {event.isCrit && (
                        <>
                          {' '}
                          <span className="font-bold text-orange-500">CRIT!</span>
                        </>
                      )}
                    </span>
                    <span>
                      {event.targetLabel}
                      {': '}
                      <span className="text-blue-500">BLOCK!</span>
                    </span>
                  </div>
                )
              }

              const percent = Math.round((event.targetHpAfter / event.targetMaxHp) * 100)
              return (
                <div key={index} className="flex flex-col">
                  <span className="text-muted-foreground">t={event.time.toFixed(2)}s</span>
                  <span>
                    {event.attackerLabel}
                    {': '}
                    <span className="font-bold dark:text-neutral-300">Attack</span>
                    {'!'}
                    {event.isCrit && (
                      <>
                        {' '}
                        <span className="font-bold text-orange-500">CRIT!</span>
                      </>
                    )}
                  </span>
                  <span>
                    {event.targetLabel}
                    {': '}
                    <span className="font-bold text-black">-{event.damage}</span>
                    {' ('}
                    <span className={hpColorClass(percent)}>{event.targetHpAfter}HP</span>
                    {') '}
                    <span className="text-neutral-500 italic">{percent}%</span>
                  </span>
                </div>
              )
            })}
          </div>

          {victoryEvent && (
            <div className="mt-3 flex flex-col font-mono text-sm whitespace-nowrap">
              <span className="text-muted-foreground">t={victoryEvent.time.toFixed(2)}s</span>
              <span>
                <span className="font-bold">{victoryEvent.winnerLabel}</span> wins!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
