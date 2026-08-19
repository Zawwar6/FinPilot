import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2 } from 'lucide-react'
import AuthLayout from '@/components/layout/AuthLayout'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 700)
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll send you a link to reset it.">
      {sent ? (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
          <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-6 w-6 text-success" />
          </div>
          <p className="text-sm text-secondary font-medium">Check your inbox</p>
          <p className="text-sm text-muted mt-1">We sent a password reset link to {email}.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" icon={Mail} placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Sending...' : 'Send reset link'}</Button>
        </form>
      )}
      <p className="text-sm text-muted text-center mt-6">
        Remembered your password? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  )
}
