import { initialsFromName } from '../../utils/formatters'
import clsx from '../../utils/clsx'

const palette = [
  'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
]

function hashToIndex(str = '') {
  let hash = 0
  for (let i = 0; i < str.length; i += 1) hash = (hash + str.charCodeAt(i)) % palette.length
  return hash
}

export default function Avatar({ name, size = 'md', className = '' }) {
  const sizes = { sm: 'h-7 w-7 text-xs', md: 'h-9 w-9 text-sm', lg: 'h-12 w-12 text-base' }
  return (
    <div
      className={clsx(
        'flex shrink-0 items-center justify-center rounded-full font-semibold',
        palette[hashToIndex(name)],
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {initialsFromName(name)}
    </div>
  )
}
