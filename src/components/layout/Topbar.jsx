import { Menu, PanelLeftClose, PanelLeftOpen, Moon, Sun, Bell } from 'lucide-react'
import { useUiStore } from '../../store/uiStore'
import { useThemeStore } from '../../store/themeStore'
import { useAuthStore } from '../../store/authStore'
import Avatar from '../ui/Avatar'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/users': 'Users',
  '/products': 'Products',
  '/orders': 'Orders',
  '/settings': 'Settings',
}

export default function Topbar({ pathname }) {
  const toggleSidebarCollapsed = useUiStore((s) => s.toggleSidebarCollapsed)
  const isSidebarCollapsed = useUiStore((s) => s.isSidebarCollapsed)
  const openMobileSidebar = useUiStore((s) => s.openMobileSidebar)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const user = useAuthStore((s) => s.user)

  const title = pageTitles[pathname] || 'Dashboard'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openMobileSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={toggleSidebarCollapsed}
          className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:block dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
        </button>
        <div className="ml-1 flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-800">
          <Avatar name={user?.name || 'Admin'} size="sm" />
          <div className="hidden text-sm sm:block">
            <p className="font-medium leading-tight text-slate-900 dark:text-slate-100">{user?.name || 'Admin'}</p>
            <p className="leading-tight text-slate-500 dark:text-slate-400">{user?.role || 'Admin'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
