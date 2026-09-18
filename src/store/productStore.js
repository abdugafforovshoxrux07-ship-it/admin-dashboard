import { create } from 'zustand'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/productApi'

export const useProductStore = create((set, get) => ({
  products: [],
  status: 'idle',
  error: null,

  search: '',
  categoryFilter: 'all',
  page: 1,
  pageSize: 8,

  setSearch: (search) => set({ search, page: 1 }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter, page: 1 }),
  setPage: (page) => set({ page }),

  fetchAll: async () => {
    set({ status: 'loading', error: null })
    try {
      const products = await fetchProducts()
      set({ products, status: 'success' })
    } catch (err) {
      set({ status: 'error', error: err?.message || 'Failed to load products.' })
    }
  },

  addProduct: async (payload) => {
    const created = await createProduct(payload)
    set({ products: [created, ...get().products] })
    return created
  },

  editProduct: async (id, payload) => {
    const updated = await updateProduct(id, payload)
    set({ products: get().products.map((p) => (p.id === id ? updated : p)) })
    return updated
  },

  removeProduct: async (id) => {
    await deleteProduct(id)
    set({ products: get().products.filter((p) => p.id !== id) })
  },

  getCategories: () => {
    const { products } = get()
    return Array.from(new Set(products.map((p) => p.category))).sort()
  },

  getFiltered: () => {
    const { products, search, categoryFilter } = get()
    const q = search.trim().toLowerCase()
    return products.filter((p) => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q)
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  },
}))
