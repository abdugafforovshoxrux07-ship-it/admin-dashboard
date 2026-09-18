import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Light/dark theme, persisted to localStorage and applied to <html>.
 */
export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light',

      applyTheme: () => {
        const { theme } = get()
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        document.documentElement.classList.toggle('dark', next === 'dark')
      },

      setTheme: (theme) => {
        set({ theme })
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },
    }),
    { name: 'nimbus-theme' },
  ),
)
