import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '../ui/Modal'
import Badge from '../ui/Badge'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { useOrderStore } from '../../store/orderStore'

const orderStatusTone = { pending: 'amber', processing: 'blue', shipped: 'brand', delivered: 'green', cancelled: 'red' }
const paymentStatusTone = { paid: 'green', pending: 'amber', refunded: 'slate', failed: 'red' }

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function OrderDetailsModal({ open, onClose, order }) {
  const changeStatus = useOrderStore((s) => s.changeStatus)
  const [updating, setUpdating] = useState(false)
  const [localStatus, setLocalStatus] = useState(order?.orderStatus)

  if (!order) return null

  async function handleStatusChange(e) {
    const next = e.target.value
    setLocalStatus(next)
    setUpdating(true)
    try {
      await changeStatus(order.id, next)
      toast.success(`Order ${order.id} marked as ${next}`)
    } catch {
      toast.error('Failed to update order status')
      setLocalStatus(order.orderStatus)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={`Order ${order.id}`} size="lg" footer={<Button onClick={onClose}>Close</Button>}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Customer</p>
          <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{order.customer}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Date placed</p>
          <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{formatDate(order.date)}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Payment status</p>
          <div className="mt-1"><Badge tone={paymentStatusTone[order.paymentStatus]}>{order.paymentStatus}</Badge></div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Shipping address</p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{order.shippingAddress}</p>
        </div>
      </div>

      <div className="mt-5">
        <Select
          label="Order status"
          value={localStatus}
          onChange={handleStatusChange}
          options={statusOptions}
          disabled={updating}
          containerClassName="max-w-xs"
        />
        <div className="mt-1"><Badge tone={orderStatusTone[localStatus]}>{localStatus}</Badge></div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Items</p>
        <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {order.items.map((item, idx) => (
            <li key={idx} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="text-slate-700 dark:text-slate-300">{item.name} &times; {item.qty}</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{formatCurrency(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:text-slate-100">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>
    </Modal>
  )
}
