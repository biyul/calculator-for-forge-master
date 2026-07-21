import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function StatInput({ stat, value, onChange }) {
  const { key, label, min, max, unit, base } = stat
  const [text, setText] = useState(String(value))

  function commit(rawText) {
    const parsed = Number.parseFloat(rawText)
    const next = Number.isFinite(parsed) ? clamp(parsed, min, max) : min
    setText(String(next))
    onChange(next)
  }

  function handleSliderChange(values) {
    // base-ui's Slider can report either a plain number or a single-element
    // array depending on the interaction (drag vs. keyboard), despite us
    // always passing an array value.
    const raw = Array.isArray(values) ? values[0] : values
    const next = clamp(raw, min, max)
    setText(String(next))
    onChange(next)
  }

  return (
    <div className="flex items-center gap-3 border-b py-2 text-sm last:border-b-0">
      <Label htmlFor={key} className="w-28 shrink-0 flex-col items-start gap-0 font-semibold leading-tight">
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
      <div className="flex shrink-0 items-center gap-1">
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
            if (e.key === 'Enter') e.target.blur()
          }}
          className="h-7 w-14 text-right"
        />
        <span className="text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}
