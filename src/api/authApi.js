import { USE_MOCK_API, apiClient } from './axiosClient'
import { delay } from './mockAdapter'

// Any email/password pair works in the demo as long as the password
// is at least 6 characters — this is a portfolio project, not a real
// auth backend. Swap this out for a real POST /auth/login call.
export async function loginRequest(email, password) {
  if (USE_MOCK_API) {
    await delay(700)
    if (!email || !password) {
      throw new Error('Email and password are required.')
    }
    if (password.length < 6) {
      throw new Error('Incorrect email or password.')
    }
    return {
      user: {
        id: 'usr_current',
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role: 'Admin',
        avatarSeed: email,
      },
      token: `mock-token-${Date.now()}`,
    }
  }

  const { data } = await apiClient.post('/auth/login', { email, password })
  return data
}
