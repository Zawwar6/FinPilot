import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Input = forwardRef(function Input(
  { className, label, error, helperText, type = 'text', icon: Icon, ...props }, ref
) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const resolvedType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-secondary mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />}
        <input
          ref={ref}
          type={resolvedType}
          className={cn(
            'w-full h-10 rounded-lg border bg-white px-3.5 text-sm text-secondary placeholder:text-slate-400 transition-colors duration-150 focus-ring',
            Icon && 'pl-9',
            isPassword && 'pr-10',
            error ? 'border-danger' : 'border-border hover:border-slate-300 focus:border-primary',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary"
            tabIndex={-1}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      {!error && helperText && <p className="mt-1.5 text-xs text-muted">{helperText}</p>}
    </div>
  )
})

export const Select = forwardRef(function Select({ className, label, error, children, ...props }, ref) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-secondary mb-1.5">{label}</label>}
      <select
        ref={ref}
        className={cn(
          'w-full h-10 rounded-lg border bg-white px-3.5 text-sm text-secondary transition-colors duration-150 focus-ring',
          error ? 'border-danger' : 'border-border hover:border-slate-300 focus:border-primary',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
})

export const Textarea = forwardRef(function Textarea({ className, label, error, ...props }, ref) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-secondary mb-1.5">{label}</label>}
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-secondary placeholder:text-slate-400 transition-colors duration-150 focus-ring min-h-[90px]',
          error ? 'border-danger' : 'border-border hover:border-slate-300 focus:border-primary',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
})
