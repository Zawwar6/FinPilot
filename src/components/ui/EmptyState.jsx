import { motion } from 'framer-motion'
import Button from './Button'

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="h-14 w-14 rounded-2xl bg-primary-light flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-secondary">{title}</h3>
      <p className="text-sm text-muted mt-1.5 max-w-sm">{description}</p>
      {actionLabel && (
        <Button className="mt-5" size="sm" onClick={onAction}>{actionLabel}</Button>
      )}
    </motion.div>
  )
}
