import { Eye, Pencil, Trash2, Users as UsersIcon } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import EmptyState from '../ui/EmptyState'
import { TableSkeleton } from '../ui/Skeleton'
import { formatDate } from '../../utils/formatters'

const statusTone = { active: 'green', inactive: 'slate', suspended: 'red' }

export default function UsersTable({ users, loading, onView, onEdit, onDelete }) {
  if (loading) return <TableSkeleton rows={6} cols={5} />

  if (users.length === 0) {
    return <EmptyState icon={UsersIcon} title="No users found" description="Try adjusting your search or filters." />
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <th className="px-5 py-3 font-medium">User</th>
            <th className="px-5 py-3 font-medium">Role</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Registered</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} size="sm" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{user.role}</td>
              <td className="px-5 py-3">
                <Badge tone={statusTone[user.status]}>{user.status}</Badge>
              </td>
              <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{formatDate(user.registeredAt)}</td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button type="button" onClick={() => onView(user)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300" aria-label={`View ${user.name}`}>
                    <Eye className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => onEdit(user)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300" aria-label={`Edit ${user.name}`}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => onDelete(user)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400" aria-label={`Delete ${user.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
