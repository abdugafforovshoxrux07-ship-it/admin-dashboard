import { USE_MOCK_API, apiClient } from './axiosClient'
import { db, delay, genId } from './mockAdapter'

export async function fetchProducts() {
  if (USE_MOCK_API) {
    await delay()
    return db.get().products
  }
  const { data } = await apiClient.get('/products')
  return data
}

export async function createProduct(payload) {
  if (USE_MOCK_API) {
    await delay()
    const database = db.get()
    const created = {
      id: genId('prd'),
      image: `https://picsum.photos/seed/${genId('img')}/200/200`,
      ...payload,
    }
    database.products = [created, ...database.products]
    db.set(database)
    return created
  }
  const { data } = await apiClient.post('/products', payload)
  return data
}

export async function updateProduct(id, payload) {
  if (USE_MOCK_API) {
    await delay()
    const database = db.get()
    database.products = database.products.map((p) => (p.id === id ? { ...p, ...payload } : p))
    db.set(database)
    return database.products.find((p) => p.id === id)
  }
  const { data } = await apiClient.put(`/products/${id}`, payload)
  return data
}

export async function deleteProduct(id) {
  if (USE_MOCK_API) {
    await delay()
    const database = db.get()
    database.products = database.products.filter((p) => p.id !== id)
    db.set(database)
    return { success: true }
  }
  const { data } = await apiClient.delete(`/products/${id}`)
  return data
}
