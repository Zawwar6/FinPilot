import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Building2, Phone } from 'lucide-react'
import AuthLayout from '@/components/layout/AuthLayout'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'

export default function Register() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({ fullName: '', businessName: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function update(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required.'
    if (!form.businessName.trim()) e.businessName = 'Business name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.phone.trim()) e.phone = 'Phone number is required.'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
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
      toast({ title: 'Account created', description: "Let's set up your workspace.", variant: 'success' })
      navigate('/onboarding')
    }, 700)
  }

  return (
    <AuthLayout title="Create your account" subtitle="Set up your business workspace in a few minutes.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Full name" icon={User} placeholder="Jordan Reeves" value={form.fullName} onChange={e => update('fullName', e.target.value)} error={errors.fullName} />
        <Input label="Business name" icon={Building2} placeholder="Acme Corp" value={form.businessName} onChange={e => update('businessName', e.target.value)} error={errors.businessName} />
        <Input label="Email" type="email" icon={Mail} placeholder="you@company.com" value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} />
        <Input label="Phone" icon={Phone} placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => update('phone', e.target.value)} error={errors.phone} />
        <Input label="Password" type="password" icon={Lock} placeholder="••••••••" value={form.password} onChange={e => update('password', e.target.value)} error={errors.password} />
        <Input label="Confirm password" type="password" icon={Lock} placeholder="••••••••" value={form.confirm} onChange={e => update('confirm', e.target.value)} error={errors.confirm} />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button>
      </form>
      <p className="text-sm text-muted text-center mt-6">
        Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  )
}
