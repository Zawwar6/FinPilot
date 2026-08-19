import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, HelpCircle, Menu, ChevronDown, LogOut, Settings, CreditCard, ShieldCheck } from 'lucide-react'
import { notifications as initialNotifications } from '@/data/mockData'
import { initials } from '@/lib/utils'

export default function Topbar({ onMenuClick, user, homePath = '/', profileLinks }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const navigate = useNavigate()
  const unread = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 border-b border-border bg-white/80 backdrop-blur sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-6">
      <button onClick={onMenuClick} className="lg:hidden text-muted hover:text-secondary">
        <Menu className="h-5 w-5" />
      </button>

      <button
        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-slate-50 text-sm text-muted hover:bg-slate-100 w-64"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="text-[10px] border border-border rounded px-1 py-0.5 bg-white">⌘K</kbd>
      </button>

      <div className="flex-1" />

      <button className="hidden sm:inline-flex text-muted hover:text-secondary h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100">
        <HelpCircle className="h-[18px] w-[18px]" />
      </button>

      <div className="relative">
        <button
          onClick={() => setNotifOpen(o => !o)}
          onBlur={() => setTimeout(() => setNotifOpen(false), 150)}
          className="relative text-muted hover:text-secondary h-9 w-9 flex items-center justify-center rounded-lg hover:bg-slate-100"
        >
          <Bell className="h-[18px] w-[18px]" />
          {unread > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
          )}
        </button>
        <AnimatePresence>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.14 }}
              className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-xl shadow-[var(--shadow-pop)] overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <p className="font-semibold text-sm text-secondary">Notifications</p>
                <button onClick={() => setNotifications(n => n.map(x => ({ ...x, unread: false })))} className="text-xs text-primary hover:underline">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="px-4 py-3 border-b border-border last:border-0 hover:bg-slate-50 flex gap-2.5">
                    <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${n.unread ? 'bg-primary' : 'bg-transparent'}`} />
                    <div>
                      <p className="text-sm text-secondary font-medium">{n.title}</p>
                      <p className="text-xs text-muted mt-0.5">{n.body}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <button
          onClick={() => setProfileOpen(o => !o)}
          onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
          className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-lg hover:bg-slate-100"
        >
          <div className="h-7 w-7 rounded-full bg-secondary text-white text-xs font-semibold flex items-center justify-center">
            {initials(user?.name || 'U')}
          </div>
          <span className="hidden md:inline text-sm font-medium text-secondary">{user?.name}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted hidden md:inline" />
        </button>
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.14 }}
              className="absolute right-0 mt-2 w-52 bg-white border border-border rounded-xl shadow-[var(--shadow-pop)] py-1.5 overflow-hidden"
            >
              <div className="px-3.5 py-2 border-b border-border mb-1">
                <p className="text-sm font-medium text-secondary truncate">{user?.name}</p>
                <p className="text-xs text-muted truncate">{user?.email}</p>
              </div>
              {(profileLinks || defaultLinks).map(l => (
                <Link key={l.path} to={l.path} className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-secondary hover:bg-slate-50">
                  <l.icon className="h-4 w-4 text-muted" /> {l.label}
                </Link>
              ))}
              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-danger hover:bg-red-50 mt-1"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

const defaultLinks = [
  { label: 'My Profile', path: '/app/settings', icon: Settings },
  { label: 'Billing', path: '/app/settings', icon: CreditCard },
  { label: 'Security', path: '/app/settings', icon: ShieldCheck },
]
