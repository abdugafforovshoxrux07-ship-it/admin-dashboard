import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  X,
  Layers,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useUiStore } from '../../store/uiStore'
import clsx from '../../utils/clsx'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function SidebarContent({ collapsed, onNavigate }) {
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="flex h-full flex-col">
      <div className={clsx('flex h-16 items-center gap-2 px-4', collapsed && 'justify-center px-0')}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600">
          <Layers className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
        {!collapsed && <span className="text-lg font-bold tracking-tight text-white">Nimbus</span>}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2 scrollbar-thin" aria-label="Main navigation">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white',
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={logout}
          className={clsx(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white',
            collapsed && 'justify-center px-0',
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const isSidebarCollapsed = useUiStore((s) => s.isSidebarCollapsed)
  const isMobileSidebarOpen = useUiStore((s) => s.isMobileSidebarOpen)
  const closeMobileSidebar = useUiStore((s) => s.closeMobileSidebar)

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'hidden shrink-0 border-r border-white/10 bg-surface-dark transition-[width] duration-200 lg:block',
          isSidebarCollapsed ? 'w-[72px]' : 'w-64',
        )}
      >
        <SidebarContent collapsed={isSidebarCollapsed} />
      </aside>

      {/* Mobile overlay sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60"
            onClick={closeMobileSidebar}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-surface-dark shadow-xl">
            <button
              type="button"
              onClick={closeMobileSidebar}
              aria-label="Close menu"
              className="absolute right-3 top-4 rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent collapsed={false} onNavigate={closeMobileSidebar} />
          </aside>
        </div>
      )}
    </>
  )
}
