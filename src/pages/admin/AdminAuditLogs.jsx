import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import { auditLogs } from '@/data/mockData'

export default function AdminAuditLogs() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">Audit Logs</h1>
        <p className="text-sm text-muted mt-1">Every meaningful action taken across the platform.</p>
      </div>

      <Card>
        <CardContent className="pt-5">
          {auditLogs.length === 0 ? (
            <EmptyState icon={ShieldCheck} title="No activity yet" description="Actions taken across the platform will be logged here." />
          ) : (
            <div className="space-y-0">
              {auditLogs.map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex gap-3 py-3.5 border-b border-border last:border-0"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
                    {log.actor[0]}
                  </div>
                  <div>
                    <p className="text-sm text-secondary"><span className="font-medium">{log.actor}</span> {log.action}</p>
                    <p className="text-xs text-muted mt-0.5">{log.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
