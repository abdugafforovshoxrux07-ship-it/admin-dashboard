import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Layers, Eye, EyeOff, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'
import { validateLoginForm } from '../utils/validators'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = useAuthStore((s) => s.token)
  const login = useAuthStore((s) => s.login)
  const isLoading = useAuthStore((s) => s.isLoading)

  const [form, setForm] = useState({ email: 'demo@nimbus.io', password: 'password123' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  if (token) {
    return <Navigate to={location.state?.from?.pathname || '/dashboard'} replace />
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validateLoginForm(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    const result = await login(form.email, form.password)
    if (result.success) {
      toast.success('Welcome back!')
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600">
            <Layers className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Sign in to Nimbus</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your store from one dashboard.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="mt-6 w-full" loading={isLoading} icon={LogIn}>
            Sign in
          </Button>

          <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
            Demo project — any email and a password of 6+ characters will work.
          </p>
        </form>
      </div>
    </div>
  )
}
