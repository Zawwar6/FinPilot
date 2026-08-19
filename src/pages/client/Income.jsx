import { useState } from 'react'
import { TrendingUp, Plus, Download, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { transactions } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Income() {
  const toast = useToast()
  const [rows, setRows] = useState(transactions.filter(t => t.type === 'Income'))
  const [confirmId, setConfirmId] = useState(null)

  const total = rows.reduce((s, r) => s + r.amount, 0)
  const received = rows.filter(r => r.status === 'Completed' || r.status === 'Reconciled').reduce((s, r) => s + r.amount, 0)
  const pending = rows.filter(r => r.status === 'Pending').reduce((s, r) => s + r.amount, 0)

  const stats = [
    { label: 'Total Income', value: total },
    { label: 'Received', value: received },
    { label: 'Pending', value: pending },
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Income</h1>
          <p className="text-sm text-muted mt-1">Track every dollar coming into your business.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Export started', variant: 'info' })}><Download className="h-4 w-4" /> Export</Button>
          <Button size="sm" onClick={() => toast({ title: 'Add income', description: 'Use Transactions → Add Transaction with type Income.', variant: 'info' })}><Plus className="h-4 w-4" /> Add Income</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map(s => (
          <Card key={s.label}><CardContent className="pt-5">
            <p className="text-sm text-muted font-medium mb-2">{s.label}</p>
            <p className="figure text-2xl font-bold text-secondary"><AnimatedNumber value={s.value} format={formatCurrency} /></p>
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['description', 'customer']}
            emptyIcon={TrendingUp}
            emptyTitle="No income recorded"
            emptyDescription="Income transactions will appear here once added."
            columns={[
              { key: 'date', label: 'Date', render: r => formatDate(r.date) },
              { key: 'description', label: 'Description' },
              { key: 'customer', label: 'Customer' },
              { key: 'account', label: 'Account' },
              { key: 'amount', label: 'Amount', render: r => <span className="figure font-medium text-success">{formatCurrency(r.amount)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={[
                { label: 'Edit', icon: Pencil, onClick: () => toast({ title: 'Edit income', variant: 'info' }) },
                { label: 'Delete', icon: Trash2, danger: true, onClick: () => setConfirmId(row.id) },
              ]} />
            )}
          />
        </CardContent>
      </Card>

      <ConfirmDialog open={!!confirmId} onClose={() => setConfirmId(null)} onConfirm={() => { setRows(r => r.filter(x => x.id !== confirmId)); toast({ title: 'Income entry deleted', variant: 'success' }) }} title="Delete income entry?" />
    </div>
  )
}
