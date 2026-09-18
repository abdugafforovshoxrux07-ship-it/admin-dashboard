import { useEffect, useMemo, useState } from 'react'
import { Search, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useProductStore } from '../store/productStore'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Pagination from '../components/ui/Pagination'
import ErrorState from '../components/ui/ErrorState'
import ConfirmModal from '../components/ui/ConfirmModal'
import ProductsGrid from '../components/products/ProductsGrid'
import ProductFormModal from '../components/products/ProductFormModal'

export default function Products() {
  const {
    status, error, search, categoryFilter, page, pageSize,
    fetchAll, setSearch, setCategoryFilter, setPage,
    addProduct, editProduct, removeProduct, getFiltered, getCategories,
  } = useProductStore()

  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = getFiltered()
  const categories = getCategories()
  const categoryOptions = [{ value: 'all', label: 'All categories' }, ...categories.map((c) => ({ value: c, label: c }))]

  const paginated = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  )

  async function handleAddOrEdit(formData) {
    if (editingProduct) {
      await editProduct(editingProduct.id, formData)
      toast.success('Product updated')
    } else {
      await addProduct(formData)
      toast.success('Product added')
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await removeProduct(deletingProduct.id)
      toast.success('Product deleted')
      setDeletingProduct(null)
    } catch {
      toast.error('Failed to delete product')
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
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Products</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your product catalog.</p>
        </div>
        <Button icon={Plus} onClick={() => { setEditingProduct(null); setFormOpen(true) }}>
          Add product
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search products"
          />
        </div>
        <Select options={categoryOptions} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} containerClassName="w-48" aria-label="Filter by category" />
      </div>

      <ProductsGrid
        products={paginated}
        loading={status === 'loading'}
        onEdit={(product) => { setEditingProduct(product); setFormOpen(true) }}
        onDelete={setDeletingProduct}
      />

      {status === 'success' && filtered.length > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800">
          <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
        </div>
      )}

      <ProductFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddOrEdit}
        initialData={editingProduct}
      />

      <ConfirmModal
        open={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete product"
        description={`Are you sure you want to delete ${deletingProduct?.name}? This action cannot be undone.`}
      />
    </div>
  )
}
