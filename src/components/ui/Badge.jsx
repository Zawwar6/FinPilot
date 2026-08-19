import { cn } from '@/lib/utils'

const variants = {
  neutral: 'bg-slate-100 text-slate-600',
  primary: 'bg-primary-light text-primary',
  success: 'bg-success-light text-success',
  warning: 'bg-warning-light text-amber-700',
  danger: 'bg-danger-light text-danger',
}

const statusMap = {
  Completed: 'success', Paid: 'success', Approved: 'success', Reconciled: 'success', Active: 'success', Matched: 'success', Good: 'success',
  Pending: 'warning', 'Pending Review': 'warning', Sent: 'primary', Viewed: 'primary', Draft: 'neutral', Todo: 'neutral',
  'In Progress': 'primary', Review: 'warning', 'Partially Paid': 'warning', Attention: 'warning', Unmatched: 'warning',
  Overdue: 'danger', Failed: 'danger', Rejected: 'danger', Cancelled: 'danger', 'Past Due': 'danger', 'At Risk': 'danger', Discrepancy: 'danger',
}

export default function Badge({ children, variant, dot = false, className }) {
  const resolved = variant || statusMap[children] || 'neutral'
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium', variants[resolved], className)}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', {
        neutral: 'bg-slate-400', primary: 'bg-primary', success: 'bg-success', warning: 'bg-amber-500', danger: 'bg-danger',
      }[resolved])} />}
      {children}
    </span>
  )
}
