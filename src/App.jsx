import { useState } from 'react'
import { STATS } from './stats'
import StatInput from './components/StatInput'

const initialStats = Object.fromEntries(STATS.map((s) => [s.key, s.min]))

function App() {
  const [stats, setStats] = useState(initialStats)

  function updateStat(key, value) {
    setStats((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="px-4 pb-6">
      <h1 className="py-5 text-center text-2xl font-medium tracking-tight">
        Forge Master DPS Calculator
      </h1>

      <section className="mx-auto flex max-w-lg flex-col">
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
  )
}

export default App
