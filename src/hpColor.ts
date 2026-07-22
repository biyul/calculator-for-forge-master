export function hpColorClass(percent: number): string {
  if (percent <= 0) return 'text-neutral-700'
  if (percent < 25) return 'text-red-800 dark:text-red-600'
  if (percent < 50) return 'text-orange-800 dark:text-orange-600'
  if (percent < 75) return 'text-yellow-800 dark:text-yellow-600'
  return 'text-green-800 dark:text-green-600'
}
