import { useEffect, useMemo, useState } from 'react'
import { Search, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useUserStore } from '../store/userStore'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Pagination from '../components/ui/Pagination'
import ErrorState from '../components/ui/ErrorState'
import ConfirmModal from '../components/ui/ConfirmModal'
import UsersTable from '../components/users/UsersTable'
import UserFormModal from '../components/users/UserFormModal'
import UserViewModal from '../components/users/UserViewModal'

const roleOptions = [
  { value: 'all', label: 'All roles' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Customer', label: 'Customer' },
]

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
]

export default function Users() {
  const {
    status, error, search, roleFilter, statusFilter, page, pageSize,
    fetchAll, setSearch, setRoleFilter, setStatusFilter, setPage,
    addUser, editUser, removeUser, getFiltered,
  } = useUserStore()

  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [viewingUser, setViewingUser] = useState(null)
  const [deletingUser, setDeletingUser] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = getFiltered()
  const paginated = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  )

  async function handleAddOrEdit(formData) {
    if (editingUser) {
      await editUser(editingUser.id, formData)
      toast.success('User updated')
    } else {
      await addUser(formData)
      toast.success('User added')
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await removeUser(deletingUser.id)
      toast.success('User deleted')
      setDeletingUser(null)
    } catch {
      toast.error('Failed to delete user')
    } finally {
      setDeleting(false)
    }
  }

  if (status === 'error') {
    return <ErrorState message={error} onRetry={fetchAll} />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Users</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your team and customers.</p>
        </div>
        <Button icon={UserPlus} onClick={() => { setEditingUser(null); setFormOpen(true) }}>
          Add user
        </Button>
      </div>

      <Card padded={false}>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center dark:border-slate-800">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search users"
            />
          </div>
          <div className="flex gap-3">
            <Select options={roleOptions} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} containerClassName="w-40" aria-label="Filter by role" />
            <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} containerClassName="w-40" aria-label="Filter by status" />
          </div>
        </div>

        <UsersTable
          users={paginated}
          loading={status === 'loading'}
          onView={setViewingUser}
          onEdit={(user) => { setEditingUser(user); setFormOpen(true) }}
          onDelete={setDeletingUser}
        />

        {status === 'success' && filtered.length > 0 && (
          <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
        )}
      </Card>

      <UserFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddOrEdit}
        initialData={editingUser}
      />

      <UserViewModal open={Boolean(viewingUser)} onClose={() => setViewingUser(null)} user={viewingUser} />

      <ConfirmModal
        open={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete user"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
      />
    </div>
  )
}
