import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronsLeft, ChevronsRight, Landmark } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Sidebar({ nav, collapsed, onToggle, brand = 'FinPilot', mobileOpen, onMobileClose }) {
  return (
    <>
      {/* mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden" onClick={onMobileClose} />
      )}
      <motion.aside
        animate={{ width: collapsed ? 76 : 240 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed lg:sticky top-0 h-screen bg-white border-r border-border flex flex-col z-50 shrink-0',
          'lg:translate-x-0 transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Landmark className="h-4 w-4 text-white" />
            </div>
            {!collapsed && <span className="font-display font-bold text-secondary whitespace-nowrap">{brand}</span>}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5">
          {nav.map((group, gi) => (
            <div key={gi}>
              {group.section && !collapsed && (
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-2.5 mb-1.5">{group.section}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/app' || item.path === '/admin' || item.path === '/finance'}
                    onClick={onMobileClose}
                    className={({ isActive }) => cn(
                      'flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors group relative',
                      isActive ? 'bg-primary-light text-primary' : 'text-slate-600 hover:bg-slate-100'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <button
          onClick={onToggle}
          className="hidden lg:flex items-center justify-center h-11 border-t border-border text-muted hover:text-secondary hover:bg-slate-50"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </motion.aside>
    </>
  )
}
