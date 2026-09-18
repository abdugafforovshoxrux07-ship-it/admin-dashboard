import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import EmptyState from '../ui/EmptyState'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { ShoppingCart } from 'lucide-react'

const statusTone = {
  pending: 'amber',
  processing: 'blue',
  shipped: 'brand',
  delivered: 'green',
  cancelled: 'red',
}

export default function RecentOrders({ orders }) {
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent orders</h3>
        <Link to="/orders" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          View all
        </Link>
      </div>
      {orders.length === 0 ? (
        <EmptyState icon={ShoppingCart} title="No orders yet" description="New orders will show up here." />
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {orders.map((order) => (
            <li key={order.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{order.id}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {order.customer} &middot; {formatDate(order.date)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {formatCurrency(order.total)}
                </span>
                <Badge tone={statusTone[order.orderStatus]}>{order.orderStatus}</Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
