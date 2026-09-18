import { useEffect, useMemo } from 'react'
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react'
import { useUserStore } from '../store/userStore'
import { useProductStore } from '../store/productStore'
import { useOrderStore } from '../store/orderStore'
import StatCard from '../components/dashboard/StatCard'
import RecentOrders from '../components/dashboard/RecentOrders'
import RecentUsers from '../components/dashboard/RecentUsers'
import { CardSkeleton } from '../components/ui/Skeleton'
import ErrorState from '../components/ui/ErrorState'
import { formatCompactNumber, formatCurrency } from '../utils/formatters'

export default function Dashboard() {
  const users = useUserStore((s) => s.users)
  const usersStatus = useUserStore((s) => s.status)
  const fetchUsers = useUserStore((s) => s.fetchAll)

  const products = useProductStore((s) => s.products)
  const productsStatus = useProductStore((s) => s.status)
  const fetchProducts = useProductStore((s) => s.fetchAll)

  const orders = useOrderStore((s) => s.orders)
  const ordersStatus = useOrderStore((s) => s.status)
  const ordersError = useOrderStore((s) => s.error)
  const fetchOrders = useOrderStore((s) => s.fetchAll)

  useEffect(() => {
    fetchUsers()
    fetchProducts()
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + o.total, 0), [orders])
  const recentOrders = useMemo(() => orders.slice(0, 5), [orders])
  const recentUsers = useMemo(() => [...users].slice(0, 5), [users])

  const isLoading = usersStatus === 'loading' || productsStatus === 'loading' || ordersStatus === 'loading'
  const hasError = ordersStatus === 'error'

  if (hasError) {
    return <ErrorState message={ordersError} onRetry={() => { fetchUsers(); fetchProducts(); fetchOrders() }} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Overview</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">A snapshot of your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Total Users" value={formatCompactNumber(users.length)} icon={Users} tone="brand" trend={8.2} trendLabel="vs last month" />
            <StatCard label="Total Products" value={formatCompactNumber(products.length)} icon={Package} tone="sky" trend={3.1} trendLabel="vs last month" />
            <StatCard label="Total Orders" value={formatCompactNumber(orders.length)} icon={ShoppingCart} tone="amber" trend={-2.4} trendLabel="vs last month" />
            <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} tone="emerald" trend={12.5} trendLabel="vs last month" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentOrders orders={recentOrders} />
        <RecentUsers users={recentUsers} />
      </div>
    </div>
  )
}
