import { USE_MOCK_API, apiClient } from './axiosClient'
import { db, delay, genId } from './mockAdapter'

export async function fetchUsers() {
  if (USE_MOCK_API) {
    await delay()
    return db.get().users
  }
  const { data } = await apiClient.get('/users')
  return data
}

export async function createUser(payload) {
  if (USE_MOCK_API) {
    await delay()
    const database = db.get()
    const created = {
      id: genId('usr'),
      registeredAt: new Date().toISOString().slice(0, 10),
      status: 'active',
      avatarSeed: payload.name,
      ...payload,
    }
    database.users = [created, ...database.users]
    db.set(database)
    return created
  }
  const { data } = await apiClient.post('/users', payload)
  return data
}

export async function updateUser(id, payload) {
  if (USE_MOCK_API) {
    await delay()
    const database = db.get()
    database.users = database.users.map((u) => (u.id === id ? { ...u, ...payload } : u))
    db.set(database)
    return database.users.find((u) => u.id === id)
  }
  const { data } = await apiClient.put(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id) {
  if (USE_MOCK_API) {
    await delay()
    const database = db.get()
    database.users = database.users.filter((u) => u.id !== id)
    db.set(database)
    return { success: true }
  }
  const { data } = await apiClient.delete(`/users/${id}`)
  return data
}
