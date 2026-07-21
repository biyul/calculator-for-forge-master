import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import type { Stat } from '../stats.ts'

interface StatInputProps {
  stat: Stat
  value: number
  onChange: (value: number) => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function StatInput({ stat, value, onChange }: StatInputProps) {
  const { key, label, min, max, unit, base } = stat
  const [text, setText] = useState(String(value))
  const isZero = value === 0

  useEffect(() => {
    setText(String(value))
  }, [value])

  function applyValue(next: number) {
    setText(String(next))
    onChange(next)
  }

  function commit(rawText: string) {
    const parsed = Number.parseFloat(rawText)
    const next = Number.isFinite(parsed) ? clamp(parsed, min, max) : min
    applyValue(next)
  }

  function handleSliderChange(values: number | readonly number[]) {
    // base-ui's Slider can report either a plain number or a single-element
    // array depending on the interaction (drag vs. keyboard), despite us
    // always passing an array value.
    const raw = Array.isArray(values) ? values[0] : (values as number)
    applyValue(clamp(raw, min, max))
  }

  return (
    <div className="flex items-center gap-3 border-b py-2 text-sm last:border-b-0">
      <Label
        htmlFor={key}
        className={`w-28 shrink-0 flex-col items-start gap-0 font-semibold leading-tight ${isZero ? 'text-muted-foreground/50' : ''}`}
      >
        {label}
        <span className="text-[11px] font-normal text-muted-foreground">
          {min}-{max}{unit}
          {base ? ` (base ${base}${unit})` : ''}
        </span>
      </Label>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={handleSliderChange}
        className="flex-1"
      />
      <div className={`flex shrink-0 items-center gap-1 ${isZero ? 'text-muted-foreground/50' : ''}`}>
        <Input
          id={key}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
          }}
          className={`h-7 w-14 text-right ${isZero ? 'text-muted-foreground/50' : ''}`}
        />
        <span className="text-muted-foreground">{unit}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          aria-label={`Set ${label} to 0`}
          onClick={() => applyValue(0)}
        >
          <Minus />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          aria-label={`Set ${label} to max`}
          onClick={() => applyValue(max)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}
