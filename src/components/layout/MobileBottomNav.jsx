import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function MobileBottomNav({ items }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white border-t border-border flex items-center justify-around h-16 px-2">
      {items.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) => cn(
            'flex flex-col items-center justify-center gap-1 flex-1 h-full text-[11px] font-medium',
            isActive ? 'text-primary' : 'text-slate-400'
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
