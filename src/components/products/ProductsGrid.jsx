import { Pencil, Trash2, Package } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import EmptyState from '../ui/EmptyState'
import { Skeleton } from '../ui/Skeleton'
import { formatCurrency } from '../../utils/formatters'

const statusTone = { 'in-stock': 'green', 'low-stock': 'amber', 'out-of-stock': 'red' }
const statusLabel = { 'in-stock': 'In stock', 'low-stock': 'Low stock', 'out-of-stock': 'Out of stock' }

function ProductCardSkeleton() {
  return (
    <Card>
      <Skeleton className="mb-3 h-32 w-full rounded-lg" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </Card>
  )
}

export default function ProductsGrid({ products, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <Card>
        <EmptyState icon={Package} title="No products found" description="Try adjusting your search or filters, or add a new product." />
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} padded={false} className="overflow-hidden">
          <img src={product.image} alt={product.name} className="h-36 w-full object-cover" loading="lazy" />
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{product.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{product.category}</p>
              </div>
              <Badge tone={statusTone[product.status]}>{statusLabel[product.status]}</Badge>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-base font-bold text-slate-900 dark:text-slate-100">{formatCurrency(product.price)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{product.stock} in stock</p>
            </div>
            <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(product)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-500/10"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
