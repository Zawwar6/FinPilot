import { useState } from 'react'
import { motion } from 'framer-motion'
import { GitCompareArrows, CheckCircle2, AlertTriangle, Flag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { accounts, transactions } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Reconciliation() {
  const toast = useToast()
  const [account, setAccount] = useState(accounts[0].name)
  const [rows, setRows] = useState(
    transactions.map(t => ({ ...t, matchStatus: t.status === 'Reconciled' ? 'Matched' : Math.random() > 0.85 ? 'Discrepancy' : 'Unmatched' }))
  )

  const filtered = rows.filter(r => r.account === account)
  const matched = filtered.filter(r => r.matchStatus === 'Matched').length
  const unmatched = filtered.filter(r => r.matchStatus === 'Unmatched').length
  const discrepancies = filtered.filter(r => r.matchStatus === 'Discrepancy').length

  function markReconciled(id) {
    setRows(rs => rs.map(r => r.id === id ? { ...r, matchStatus: 'Matched' } : r))
    toast({ title: 'Transaction marked as reconciled', variant: 'success' })
  }
  function flagDiscrepancy(id) {
    setRows(rs => rs.map(r => r.id === id ? { ...r, matchStatus: 'Discrepancy' } : r))
    toast({ title: 'Discrepancy flagged', variant: 'warning' })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Reconciliation</h1>
          <p className="text-sm text-muted mt-1">Match transactions against your bank feed.</p>
        </div>
        <div className="w-full sm:w-56">
          <Select value={account} onChange={e => setAccount(e.target.value)}>
            {accounts.map(a => <option key={a.id}>{a.name}</option>)}
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle2} label="Matched" value={matched} tone="success" />
        <StatCard icon={AlertTriangle} label="Unmatched" value={unmatched} tone="warning" />
        <StatCard icon={Flag} label="Discrepancies" value={discrepancies} tone="danger" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  {['Date', 'Description', 'Amount', 'Match Status', ''].map(h => (
                    <th key={h} className="text-left font-medium text-muted px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border last:border-0 hover:bg-slate-50/80">
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(r.date)}</td>
                    <td className="px-4 py-3 text-secondary font-medium whitespace-nowrap">{r.description}</td>
                    <td className="px-4 py-3 figure whitespace-nowrap">{formatCurrency(r.amount)}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><Badge>{r.matchStatus}</Badge></td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {r.matchStatus !== 'Matched' && (
                        <div className="flex justify-end gap-1.5">
                          <Button size="sm" variant="outline" onClick={() => markReconciled(r.id)}>Match</Button>
                          <Button size="sm" variant="ghost" onClick={() => flagDiscrepancy(r.id)}>Flag</Button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-10 text-sm text-muted">No transactions for this account.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, tone }) {
  const tones = { success: 'text-success bg-success-light', warning: 'text-amber-600 bg-warning-light', danger: 'text-danger bg-danger-light' }
  return (
    <Card><CardContent className="pt-5 flex items-center gap-4">
      <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${tones[tone]}`}><Icon className="h-5 w-5" /></div>
      <div>
        <p className="figure text-2xl font-bold text-secondary">{value}</p>
        <p className="text-xs text-muted">{label}</p>
      </div>
    </CardContent></Card>
  )
}
