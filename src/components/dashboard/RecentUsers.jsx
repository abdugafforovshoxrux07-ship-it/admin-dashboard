import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import EmptyState from '../ui/EmptyState'
import { formatDate } from '../../utils/formatters'
import { Users } from 'lucide-react'

const statusTone = { active: 'green', inactive: 'slate', suspended: 'red' }

export default function RecentUsers({ users }) {
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent users</h3>
        <Link to="/users" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          View all
        </Link>
      </div>
      {users.length === 0 ? (
        <EmptyState icon={Users} title="No users yet" description="New signups will show up here." />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.map((user) => (
            <li key={user.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <Avatar name={user.name} size="sm" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-slate-400 sm:block">{formatDate(user.registeredAt)}</span>
                <Badge tone={statusTone[user.status]}>{user.status}</Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
