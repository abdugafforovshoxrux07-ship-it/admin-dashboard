import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { validateUserForm } from '../../utils/validators'

const roleOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Customer', label: 'Customer' },
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
]

const emptyForm = { name: '', email: '', role: 'Customer', status: 'active' }

export default function UserFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const isEditing = Boolean(initialData)

  useEffect(() => {
    if (open) {
      setForm(initialData ? { name: initialData.name, email: initialData.email, role: initialData.role, status: initialData.status } : emptyForm)
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
    const validationErrors = validateUserForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit(form)
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit user' : 'Add user'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={submitting}>
            {isEditing ? 'Save changes' : 'Add user'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Jane Doe" />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="jane@company.com" />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Role" name="role" value={form.role} onChange={handleChange} options={roleOptions} error={errors.role} />
          <Select label="Status" name="status" value={form.status} onChange={handleChange} options={statusOptions} />
        </div>
      </form>
    </Modal>
  )
}
