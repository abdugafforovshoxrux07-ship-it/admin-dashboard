import { useState } from 'react'
import toast from 'react-hot-toast'
import { Moon, Sun, Save } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import { validatePasswordForm } from '../utils/validators'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Avatar from '../components/ui/Avatar'

function SectionCard({ title, description, children }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      <div className="mt-4">{children}</div>
    </Card>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-2">
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </label>
  )
}

export default function Settings() {
  const user = useAuthStore((s) => s.user)
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)

  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' })
  const [savingProfile, setSavingProfile] = useState(false)

  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [savingPassword, setSavingPassword] = useState(false)

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    productAlerts: true,
    weeklySummary: false,
    marketingEmails: false,
  })

  async function handleProfileSubmit(e) {
    e.preventDefault()
    setSavingProfile(true)
    await new Promise((r) => setTimeout(r, 600))
    setSavingProfile(false)
    toast.success('Profile updated')
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault()
    const errors = validatePasswordForm(passwordForm)
    setPasswordErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSavingPassword(true)
    await new Promise((r) => setTimeout(r, 600))
    setSavingPassword(false)
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    toast.success('Password changed')
  }

  function handleNotificationChange(key, value) {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    toast.success('Notification preferences saved')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account and preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="Profile information" description="Update your name and email address.">
          <div className="mb-4 flex items-center gap-3">
            <Avatar name={profile.name || 'Admin'} size="lg" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{profile.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{profile.email}</p>
            </div>
          </div>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input
              label="Full name"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            />
            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            />
            <Button type="submit" icon={Save} loading={savingProfile}>
              Save changes
            </Button>
          </form>
        </SectionCard>

        <SectionCard title="Change password" description="Use a strong password you don't use elsewhere.">
          <form onSubmit={handlePasswordSubmit} noValidate className="space-y-4">
            <Input
              label="Current password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
              error={passwordErrors.currentPassword}
            />
            <Input
              label="New password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
              error={passwordErrors.newPassword}
            />
            <Input
              label="Confirm new password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
              error={passwordErrors.confirmPassword}
            />
            <Button type="submit" loading={savingPassword}>
              Update password
            </Button>
          </form>
        </SectionCard>

        <SectionCard title="Notifications" description="Choose what you want to be notified about.">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <Toggle label="Order updates" checked={notifications.orderUpdates} onChange={(v) => handleNotificationChange('orderUpdates', v)} />
            <Toggle label="Product stock alerts" checked={notifications.productAlerts} onChange={(v) => handleNotificationChange('productAlerts', v)} />
            <Toggle label="Weekly summary email" checked={notifications.weeklySummary} onChange={(v) => handleNotificationChange('weeklySummary', v)} />
            <Toggle label="Marketing emails" checked={notifications.marketingEmails} onChange={(v) => handleNotificationChange('marketingEmails', v)} />
          </div>
        </SectionCard>

        <SectionCard title="Appearance" description="Choose how Nimbus looks on your device.">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors ${theme === 'light' ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/10' : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Sun className="h-5 w-5" /> Light
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors ${theme === 'dark' ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/10' : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              <Moon className="h-5 w-5" /> Dark
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
