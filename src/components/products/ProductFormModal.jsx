import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { validateProductForm } from '../../utils/validators'

const statusOptions = [
  { value: 'in-stock', label: 'In stock' },
  { value: 'low-stock', label: 'Low stock' },
  { value: 'out-of-stock', label: 'Out of stock' },
]

const emptyForm = { name: '', category: '', price: '', stock: '', status: 'in-stock' }

export default function ProductFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const isEditing = Boolean(initialData)

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? { name: initialData.name, category: initialData.category, price: initialData.price, stock: initialData.stock, status: initialData.status }
          : emptyForm,
      )
      setErrors({})
    }
  }, [open, initialData])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validateProductForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit({ ...form, price: Number(form.price), stock: Number(form.stock) })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit product' : 'Add product'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={submitting}>
            {isEditing ? 'Save changes' : 'Add product'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input label="Product name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Aurora Wireless Headphones" />
        <Input label="Category" name="category" value={form.category} onChange={handleChange} error={errors.category} placeholder="Audio" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price (USD)" name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} error={errors.price} />
          <Input label="Stock" name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} error={errors.stock} />
        </div>
        <Select label="Status" name="status" value={form.status} onChange={handleChange} options={statusOptions} />
      </form>
    </Modal>
  )
}
