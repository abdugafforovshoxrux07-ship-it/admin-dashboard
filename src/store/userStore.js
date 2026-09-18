import { create } from 'zustand'
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../api/userApi'

/**
 * Users domain state: list, loading/error status, search + filters,
 * pagination, and CRUD actions. Each domain store owns its own slice
 * of server state rather than sharing one giant store.
 */
export const useUserStore = create((set, get) => ({
  users: [],
  status: 'idle', // idle | loading | success | error
  error: null,

  search: '',
  roleFilter: 'all',
  statusFilter: 'all',
  page: 1,
  pageSize: 8,

  setSearch: (search) => set({ search, page: 1 }),
  setRoleFilter: (roleFilter) => set({ roleFilter, page: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, page: 1 }),
  setPage: (page) => set({ page }),

  fetchAll: async () => {
    set({ status: 'loading', error: null })
    try {
      const users = await fetchUsers()
      set({ users, status: 'success' })
    } catch (err) {
      set({ status: 'error', error: err?.message || 'Failed to load users.' })
    }
  },

  addUser: async (payload) => {
    const created = await createUser(payload)
    set({ users: [created, ...get().users] })
    return created
  },

  editUser: async (id, payload) => {
    const updated = await updateUser(id, payload)
    set({ users: get().users.map((u) => (u.id === id ? updated : u)) })
    return updated
  },

  removeUser: async (id) => {
    await deleteUser(id)
    set({ users: get().users.filter((u) => u.id !== id) })
  },

  getFiltered: () => {
    const { users, search, roleFilter, statusFilter } = get()
    const q = search.trim().toLowerCase()
    return users.filter((u) => {
      const matchesSearch =
        !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      const matchesRole = roleFilter === 'all' || u.role === roleFilter
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  },
}))
