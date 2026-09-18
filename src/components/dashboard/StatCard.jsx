import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Card from '../ui/Card'
import clsx from '../../utils/clsx'

export default function StatCard({ label, value, icon: Icon, trend, trendLabel, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    sky: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
  }
  const isPositive = trend >= 0

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
        </div>
        <div className={clsx('flex h-10 w-10 items-center justify-center rounded-lg', tones[tone])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      {typeof trend === 'number' && (
        <div className="mt-3 flex items-center gap-1 text-sm">
          <span
            className={clsx(
              'inline-flex items-center gap-0.5 font-medium',
              isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
            )}
          >
            {isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-slate-400 dark:text-slate-500">{trendLabel}</span>
        </div>
      )}
    </Card>
  )
}
