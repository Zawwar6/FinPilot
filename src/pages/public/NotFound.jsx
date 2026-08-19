import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
          <Compass className="h-7 w-7 text-primary" />
        </div>
        <p className="figure text-6xl font-extrabold text-secondary mb-2">404</p>
        <h1 className="font-display font-bold text-xl text-secondary mb-2">Page not found</h1>
        <p className="text-sm text-muted mb-6 max-w-sm">The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/"><Button>Back to home</Button></Link>
      </motion.div>
    </div>
  )
}
