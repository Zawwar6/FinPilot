import { cn } from '@/lib/utils'

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-md bg-slate-200/70', className)} />
}

export function CardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}

export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <Skeleton className="h-3.5 w-32 mb-4" />
      <Skeleton className="h-52 w-full" />
    </div>
  )
}
