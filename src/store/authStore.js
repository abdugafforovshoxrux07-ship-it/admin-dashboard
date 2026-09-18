import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loginRequest } from '../api/authApi'

/**
 * Handles authentication state only: current user, token, and the
 * login/logout lifecycle. Kept separate from other domain stores so
 * that unrelated state doesn't re-render on every auth change.
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { user, token } = await loginRequest(email, password)
          set({ user, token, isLoading: false })
          return { success: true }
        } catch (err) {
          const message = err?.message || 'Unable to sign in. Please try again.'
          set({ isLoading: false, error: message })
          return { success: false, error: message }
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'nimbus-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
)
