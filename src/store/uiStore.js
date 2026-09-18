import { create } from 'zustand'

/**
 * Purely presentational UI state: sidebar open/collapsed, mobile menu.
 * Nothing domain-specific lives here.
 */
export const useUiStore = create((set) => ({
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,

  toggleSidebarCollapsed: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  openMobileSidebar: () => set({ isMobileSidebarOpen: true }),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
}))
