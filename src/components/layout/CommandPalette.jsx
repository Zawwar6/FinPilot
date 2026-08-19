import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Search, Receipt, FileText, Users, Building2, FolderOpen, ListChecks } from 'lucide-react'
import { transactions, invoices, customers, vendors, documents, tasks } from '@/data/mockData'

const sources = [
  { icon: Receipt, label: 'Transaction', items: transactions.map(t => ({ id: t.id, title: t.description, path: '/app/transactions' })) },
  { icon: FileText, label: 'Invoice', items: invoices.map(t => ({ id: t.id, title: `${t.id} — ${t.customer}`, path: '/app/invoices' })) },
  { icon: Users, label: 'Customer', items: customers.map(t => ({ id: t.id, title: t.name, path: '/app/customers' })) },
  { icon: Building2, label: 'Vendor', items: vendors.map(t => ({ id: t.id, title: t.name, path: '/app/vendors' })) },
  { icon: FolderOpen, label: 'Document', items: documents.map(t => ({ id: t.id, title: t.name, path: '/app/documents' })) },
  { icon: ListChecks, label: 'Task', items: tasks.map(t => ({ id: t.id, title: t.title, path: '/app/tasks' })) },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const results = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return sources.flatMap(s =>
      s.items.filter(i => i.title.toLowerCase().includes(q)).slice(0, 4).map(i => ({ ...i, group: s.label, icon: s.icon }))
    )
  }, [query])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[12vh] px-4">
          <motion.div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.16 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-[var(--shadow-pop)] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 border-b border-border">
              <Search className="h-4 w-4 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search transactions, invoices, customers..."
                className="w-full h-12 text-sm focus:outline-none"
              />
              <kbd className="text-[10px] text-muted border border-border rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {query && results.length === 0 && (
                <p className="text-sm text-muted text-center py-8">No results for "{query}"</p>
              )}
              {results.map((r, i) => (
                <button
                  key={r.group + r.id + i}
                  onClick={() => { navigate(r.path); setOpen(false); setQuery('') }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 text-left"
                >
                  <r.icon className="h-4 w-4 text-muted shrink-0" />
                  <span className="flex-1 truncate text-secondary">{r.title}</span>
                  <span className="text-xs text-muted">{r.group}</span>
                </button>
              ))}
              {!query && (
                <p className="text-xs text-muted px-4 py-3">Type to search across your workspace.</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
