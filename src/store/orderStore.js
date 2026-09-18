import { create } from 'zustand'
import { fetchOrders, updateOrderStatus } from '../api/orderApi'

export const useOrderStore = create((set, get) => ({
  orders: [],
  status: 'idle',
  error: null,

  search: '',
  statusFilter: 'all',
  page: 1,
  pageSize: 8,

  setSearch: (search) => set({ search, page: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, page: 1 }),
  setPage: (page) => set({ page }),

  fetchAll: async () => {
    set({ status: 'loading', error: null })
    try {
      const orders = await fetchOrders()
      set({ orders, status: 'success' })
    } catch (err) {
      set({ status: 'error', error: err?.message || 'Failed to load orders.' })
    }
  },

  changeStatus: async (id, orderStatus) => {
    const updated = await updateOrderStatus(id, orderStatus)
    set({ orders: get().orders.map((o) => (o.id === id ? updated : o)) })
    return updated
  },

  getFiltered: () => {
    const { orders, search, statusFilter } = get()
    const q = search.trim().toLowerCase()
    return orders.filter((o) => {
      const matchesSearch =
        !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter
      return matchesSearch && matchesStatus
    })
  },
}))
