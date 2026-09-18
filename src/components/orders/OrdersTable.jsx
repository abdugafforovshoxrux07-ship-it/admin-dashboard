import { Eye, ShoppingCart } from 'lucide-react'
import Badge from '../ui/Badge'
import EmptyState from '../ui/EmptyState'
import { TableSkeleton } from '../ui/Skeleton'
import { formatCurrency, formatDate } from '../../utils/formatters'

const orderStatusTone = { pending: 'amber', processing: 'blue', shipped: 'brand', delivered: 'green', cancelled: 'red' }
const paymentStatusTone = { paid: 'green', pending: 'amber', refunded: 'slate', failed: 'red' }

export default function OrdersTable({ orders, loading, onView }) {
  if (loading) return <TableSkeleton rows={6} cols={6} />

  if (orders.length === 0) {
    return <EmptyState icon={ShoppingCart} title="No orders found" description="Try adjusting your search or filters." />
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <th className="px-5 py-3 font-medium">Order</th>
            <th className="px-5 py-3 font-medium">Customer</th>
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3 font-medium">Total</th>
            <th className="px-5 py-3 font-medium">Payment</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-5 py-3 font-medium text-slate-900 dark:text-slate-100">{order.id}</td>
              <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{order.customer}</td>
              <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{formatDate(order.date)}</td>
              <td className="px-5 py-3 font-medium text-slate-700 dark:text-slate-300">{formatCurrency(order.total)}</td>
              <td className="px-5 py-3">
                <Badge tone={paymentStatusTone[order.paymentStatus]}>{order.paymentStatus}</Badge>
              </td>
              <td className="px-5 py-3">
                <Badge tone={orderStatusTone[order.orderStatus]}>{order.orderStatus}</Badge>
              </td>
              <td className="px-5 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onView(order)}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  aria-label={`View order ${order.id}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
