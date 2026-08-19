import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import AuthLayout from '@/components/layout/AuthLayout'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'

export default function ResetPassword() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = {}
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
    setErrors(e)
    if (Object.keys(e).length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: 'Password updated', description: 'You can now log in with your new password.', variant: 'success' })
      navigate('/login')
    }, 700)
  }

  return (
    <AuthLayout title="Set a new password" subtitle="Choose a strong password you haven't used before.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="New password" type="password" icon={Lock} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} error={errors.password} />
        <Input label="Confirm new password" type="password" icon={Lock} value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} error={errors.confirm} />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Updating...' : 'Update password'}</Button>
      </form>
    </AuthLayout>
  )
}
