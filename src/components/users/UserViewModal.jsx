import Modal from '../ui/Modal'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatDate } from '../../utils/formatters'

const statusTone = { active: 'green', inactive: 'slate', suspended: 'red' }

export default function UserViewModal({ open, onClose, user }) {
  if (!user) return null
  return (
    <Modal open={open} onClose={onClose} title="User details" size="sm" footer={<Button onClick={onClose}>Close</Button>}>
      <div className="flex items-center gap-3">
        <Avatar name={user.name} size="lg" />
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
      </div>
      <dl className="mt-5 divide-y divide-slate-100 border-t border-slate-100 text-sm dark:divide-slate-800 dark:border-slate-800">
        <div className="flex justify-between py-2.5">
          <dt className="text-slate-500 dark:text-slate-400">Role</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">{user.role}</dd>
        </div>
        <div className="flex justify-between py-2.5">
          <dt className="text-slate-500 dark:text-slate-400">Status</dt>
          <dd><Badge tone={statusTone[user.status]}>{user.status}</Badge></dd>
        </div>
        <div className="flex justify-between py-2.5">
          <dt className="text-slate-500 dark:text-slate-400">Registered</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">{formatDate(user.registeredAt)}</dd>
        </div>
        <div className="flex justify-between py-2.5">
          <dt className="text-slate-500 dark:text-slate-400">User ID</dt>
          <dd className="font-mono text-xs text-slate-500 dark:text-slate-400">{user.id}</dd>
        </div>
      </dl>
    </Modal>
  )
}
