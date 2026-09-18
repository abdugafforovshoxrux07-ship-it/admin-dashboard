import clsx from '../../utils/clsx'

export function Skeleton({ className = '' }) {
  return <div className={clsx('animate-pulse rounded-md bg-slate-200 dark:bg-slate-800', className)} />
}

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4">
          {Array.from({ length: cols }).map((__, c) => (
            <Skeleton key={c} className={clsx('h-4', c === 0 ? 'w-10 rounded-full h-10' : 'flex-1')} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
      <Skeleton className="mb-3 h-4 w-24" />
      <Skeleton className="mb-2 h-7 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}
