import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Landmark, ShieldCheck, Users, BarChart3 } from 'lucide-react'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Landmark className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-bold text-secondary text-lg">FinPilot</span>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="w-full max-w-sm mx-auto lg:mx-0"
        >
          <h1 className="font-display font-bold text-2xl text-secondary mb-1.5">{title}</h1>
          {subtitle && <p className="text-sm text-muted mb-7">{subtitle}</p>}
          {children}
        </motion.div>
      </div>
      <div className="hidden lg:flex flex-1 bg-secondary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 ledger-grid opacity-[0.12]" />
        <div className="relative max-w-sm px-8">
          <p className="text-white font-display font-bold text-3xl leading-tight mb-6">
            Real people managing your books. Real-time visibility into everything they do.
          </p>
          <div className="space-y-4">
            {[
              { icon: Users, text: 'A dedicated finance manager and accountant' },
              { icon: BarChart3, text: 'Live reports, reconciliation, and closing status' },
              { icon: ShieldCheck, text: 'Full audit trail on every financial record' },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <f.icon className="h-4 w-4 text-white" />
                </div>
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
