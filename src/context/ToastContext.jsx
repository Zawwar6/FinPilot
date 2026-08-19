import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'
import { createPortal } from 'react-dom'

const ToastContext = createContext(null)

const icons = { success: CheckCircle2, error: XCircle, warning: AlertTriangle, info: Info }
const styles = {
  success: 'border-l-success text-success',
  error: 'border-l-danger text-danger',
  warning: 'border-l-warning text-amber-600',
  info: 'border-l-primary text-primary',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  const toast = useCallback(({ title, description, variant = 'info' }) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, title, description, variant }])
    setTimeout(() => dismiss(id), 4200)
  }, [dismiss])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[min(360px,calc(100vw-2.5rem))]">
          <AnimatePresence>
            {toasts.map(t => {
              const Icon = icons[t.variant]
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`bg-white border border-border border-l-4 rounded-lg shadow-[var(--shadow-pop)] px-4 py-3 flex items-start gap-3 ${styles[t.variant]}`}
                >
                  <Icon className="h-4.5 w-4.5 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary">{t.title}</p>
                    {t.description && <p className="text-xs text-muted mt-0.5">{t.description}</p>}
                  </div>
                  <button onClick={() => dismiss(t.id)} className="text-slate-400 hover:text-secondary">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
