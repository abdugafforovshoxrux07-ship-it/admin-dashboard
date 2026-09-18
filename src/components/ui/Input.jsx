import { forwardRef } from 'react'
import clsx from '../../utils/clsx'

const Input = forwardRef(function Input(
  { label, error, hint, className = '', id, containerClassName = '', ...rest },
  ref,
) {
  const inputId = id || rest.name

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={clsx(
          'block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400',
          'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:border-brand-500',
          'dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
          error
            ? 'border-red-400 dark:border-red-500'
            : 'border-slate-300 dark:border-slate-700',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      ) : null}
    </div>
  )
})

export default Input
