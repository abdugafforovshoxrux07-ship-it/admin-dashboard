import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useOrderStore } from '../store/orderStore'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Pagination from '../components/ui/Pagination'
import ErrorState from '../components/ui/ErrorState'
import OrdersTable from '../components/orders/OrdersTable'
import OrderDetailsModal from '../components/orders/OrderDetailsModal'

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function Orders() {
  const {
    orders, status, error, search, statusFilter, page, pageSize,
    fetchAll, setSearch, setStatusFilter, setPage, getFiltered,
  } = useOrderStore()

  const [viewingOrder, setViewingOrder] = useState(null)

  useEffect(() => {
    fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = getFiltered()
  const paginated = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  )

  // Keep the open details modal in sync after a status change.
  const liveViewingOrder = viewingOrder ? orders.find((o) => o.id === viewingOrder.id) || viewingOrder : null

  if (status === 'error') {
    return <ErrorState message={error} onRetry={fetchAll} />
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Orders</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track and manage customer orders.</p>
      </div>

      <Card padded={false}>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center dark:border-slate-800">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search orders"
            />
          </div>
          <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} containerClassName="w-48" aria-label="Filter by status" />
        </div>

        <OrdersTable orders={paginated} loading={status === 'loading'} onView={setViewingOrder} />

        {status === 'success' && filtered.length > 0 && (
          <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
        )}
      </Card>

      <OrderDetailsModal open={Boolean(viewingOrder)} onClose={() => setViewingOrder(null)} order={liveViewingOrder} />
    </div>
  )
}
