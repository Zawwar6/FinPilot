import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import AuthLayout from '@/components/layout/AuthLayout'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'

export default function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters.'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: 'Welcome back', description: 'Signed in successfully.', variant: 'success' })
      navigate('/app')
    }, 700)
  }

  return (
    <AuthLayout title="Log in to FinPilot" subtitle="Enter your details to access your workspace.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email" type="email" icon={Mail} placeholder="you@company.com"
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          error={errors.email}
        />
        <Input
          label="Password" type="password" icon={Lock} placeholder="••••••••"
          value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          error={errors.password}
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} className="rounded border-border text-primary focus-ring" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Log in'}</Button>
      </form>
      <p className="text-sm text-muted text-center mt-6">
        Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link>
      </p>
      <p className="text-xs text-slate-400 text-center mt-4">Demo: use any email + a 6+ character password.</p>
    </AuthLayout>
  )
}
