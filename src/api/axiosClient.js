import axios from 'axios'

/**
 * Central Axios instance. When a real backend is available, set
 * VITE_API_BASE_URL and VITE_USE_MOCK_API=false in your .env file —
 * every api/*.js module will start hitting the real endpoints instead
 * of the mock layer, with no changes needed in components or stores.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem('nimbus-auth')
  if (raw) {
    try {
      const { state } = JSON.parse(raw)
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`
      }
    } catch {
      // ignore malformed storage
    }
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong.'
    return Promise.reject(new Error(message))
  },
)

export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'
