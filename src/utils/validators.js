export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateLoginForm({ email, password }) {
  const errors = {}
  if (!email) errors.email = 'Email is required.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'

  if (!password) errors.password = 'Password is required.'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.'

  return errors
}

export function validateUserForm({ name, email, role }) {
  const errors = {}
  if (!name || !name.trim()) errors.name = 'Name is required.'
  if (!email) errors.email = 'Email is required.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'
  if (!role) errors.role = 'Role is required.'
  return errors
}

export function validateProductForm({ name, category, price, stock }) {
  const errors = {}
  if (!name || !name.trim()) errors.name = 'Product name is required.'
  if (!category || !category.trim()) errors.category = 'Category is required.'
  if (price === '' || price === null || price === undefined || Number(price) < 0)
    errors.price = 'Enter a valid price.'
  if (stock === '' || stock === null || stock === undefined || Number(stock) < 0 || !Number.isInteger(Number(stock)))
    errors.stock = 'Enter a valid whole number for stock.'
  return errors
}

export function validatePasswordForm({ currentPassword, newPassword, confirmPassword }) {
  const errors = {}
  if (!currentPassword) errors.currentPassword = 'Current password is required.'
  if (!newPassword) errors.newPassword = 'New password is required.'
  else if (newPassword.length < 6) errors.newPassword = 'Must be at least 6 characters.'
  if (confirmPassword !== newPassword) errors.confirmPassword = 'Passwords do not match.'
  return errors
}
