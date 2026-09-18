import { USE_MOCK_API, apiClient } from './axiosClient'
import { db, delay } from './mockAdapter'

export async function fetchOrders() {
  if (USE_MOCK_API) {
    await delay()
    return db.get().orders
  }
  const { data } = await apiClient.get('/orders')
  return data
}

export async function updateOrderStatus(id, orderStatus) {
  if (USE_MOCK_API) {
    await delay(400)
    const database = db.get()
    database.orders = database.orders.map((o) => (o.id === id ? { ...o, orderStatus } : o))
    db.set(database)
    return database.orders.find((o) => o.id === id)
  }
  const { data } = await apiClient.patch(`/orders/${id}/status`, { orderStatus })
  return data
}
