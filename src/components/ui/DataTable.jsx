import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, Search, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import EmptyState from './EmptyState'

export default function DataTable({
  columns,
  data,
  searchKeys = [],
  pageSize = 8,
  emptyIcon,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'Once you add records, they will show up here.',
  emptyActionLabel,
  onEmptyAction,
  renderActions,
  toolbar,
}) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    let rows = data
    if (query && searchKeys.length) {
      const q = query.toLowerCase()
      rows = rows.filter(row => searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(q)))
    }
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey]
        if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
        return sortDir === 'asc'
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av))
      })
    }
    return rows
  }, [data, query, sortKey, sortDir, searchKeys])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageRows = filtered.slice(page * pageSize, page * pageSize + pageSize)

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {searchKeys.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(0) }}
              placeholder="Search..."
              className="w-full h-9 rounded-lg border border-border bg-white pl-9 pr-3 text-sm focus-ring focus:border-primary"
            />
          </div>
        )}
        {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={emptyIcon || Search} title={emptyTitle} description={emptyDescription} actionLabel={emptyActionLabel} onAction={onEmptyAction} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                {columns.map(col => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable !== false && toggleSort(col.key)}
                    className={cn(
                      'text-left font-medium text-muted px-4 py-3 whitespace-nowrap select-none',
                      col.sortable !== false && 'cursor-pointer hover:text-secondary'
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && (sortDir === 'asc' ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />)}
                    </span>
                  </th>
                ))}
                {renderActions && <th className="w-10" />}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {pageRows.map((row, i) => (
                  <motion.tr
                    key={row.id || i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: i * 0.02 }}
                    className="border-b border-border last:border-0 hover:bg-slate-50/80 transition-colors"
                  >
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 whitespace-nowrap text-secondary">
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                    {renderActions && (
                      <td className="px-2 py-3 text-right">
                        {renderActions(row)}
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && pageCount > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted">
            Showing {page * pageSize + 1}–{Math.min(filtered.length, (page + 1) * pageSize)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-border disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
              disabled={page === pageCount - 1}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-border disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function RowMenu({ items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(o => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 text-muted"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-1 w-40 bg-white border border-border rounded-lg shadow-[var(--shadow-pop)] py-1 z-20"
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2',
                  item.danger ? 'text-danger' : 'text-secondary'
                )}
              >
                {item.icon && <item.icon className="h-3.5 w-3.5" />}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
