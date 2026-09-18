import { AlertCircle } from 'lucide-react'
import Button from './Button'

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10">
        <AlertCircle className="h-6 w-6 text-red-500" aria-hidden="true" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Couldn&apos;t load this</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>
      {onRetry && (
        <Button className="mt-4" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
