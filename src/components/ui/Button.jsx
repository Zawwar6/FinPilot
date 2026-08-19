import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-slate-800',
  outline: 'bg-white text-secondary border border-border hover:bg-slate-50',
  ghost: 'bg-transparent text-secondary hover:bg-slate-100',
  danger: 'bg-danger text-white hover:bg-red-700',
  success: 'bg-success text-white hover:bg-green-700',
}

const sizes = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
  icon: 'h-10 w-10 p-0',
}

const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', children, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.12 }}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
})

export default Button
