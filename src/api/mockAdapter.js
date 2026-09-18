import { seedUsers, seedProducts, seedOrders } from './mockData'

// A tiny mock backend: reads/writes JSON in localStorage so CRUD
// changes persist across refreshes, and every call is wrapped in an
// artificial delay so the UI's loading states are actually visible.
// Swap USE_MOCK_API off in axiosClient.js to bypass this entirely.

const STORE_KEY = 'nimbus-mock-db'

function loadDb() {
  const raw = localStorage.getItem(STORE_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch {
      // fall through to reseed
    }
  }
  const seeded = { users: seedUsers, products: seedProducts, orders: seedOrders }
  localStorage.setItem(STORE_KEY, JSON.stringify(seeded))
  return seeded
}

function saveDb(db) {
  localStorage.setItem(STORE_KEY, JSON.stringify(db))
}

export function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Roughly a 1-in-12 chance of a simulated network error, so the
// error/empty states in the UI are reachable during a demo.
export function maybeFail(rate = 0) {
  if (rate > 0 && Math.random() < rate) {
    throw new Error('Network error — please try again.')
  }
}

export const db = {
  get: () => loadDb(),
  set: saveDb,
  reset: () => {
    const seeded = { users: seedUsers, products: seedProducts, orders: seedOrders }
    saveDb(seeded)
    return seeded
  },
}

export function genId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}
