import { forwardRef } from 'react'
import clsx from '../../utils/clsx'

const Select = forwardRef(function Select(
  { label, error, options, className = '', containerClassName = '', id, ...rest },
  ref,
) {
  const selectId = id || rest.name
  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={clsx(
          'block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900',
          'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:border-brand-500',
          'dark:bg-slate-900 dark:text-slate-100',
          error ? 'border-red-400 dark:border-red-500' : 'border-slate-300 dark:border-slate-700',
          className,
        )}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
})

export default Select
