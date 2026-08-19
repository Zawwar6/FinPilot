import { useState } from 'react'
import { Receipt, Plus, Download, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { bills as initialBills } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Bills() {
  const toast = useToast()
  const [rows, setRows] = useState(initialBills)

  function markPaid(id) {
    setRows(rs => rs.map(r => r.id === id ? { ...r, status: 'Paid' } : r))
    toast({ title: 'Bill marked as paid', variant: 'success' })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Bills</h1>
          <p className="text-sm text-muted mt-1">Track and pay bills from your vendors.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Export started', variant: 'info' })}><Download className="h-4 w-4" /> Export</Button>
          <Button size="sm" onClick={() => toast({ title: 'Bill added', variant: 'success' })}><Plus className="h-4 w-4" /> Add Bill</Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['id', 'vendor', 'category']}
            emptyIcon={Receipt}
            emptyTitle="No bills yet"
            emptyDescription="Bills from your vendors will appear here."
            columns={[
              { key: 'id', label: 'Bill #' },
              { key: 'vendor', label: 'Vendor' },
              { key: 'date', label: 'Date', render: r => formatDate(r.date) },
              { key: 'dueDate', label: 'Due Date', render: r => formatDate(r.dueDate) },
              { key: 'category', label: 'Category' },
              { key: 'amount', label: 'Amount', render: r => <span className="figure font-medium text-secondary">{formatCurrency(r.amount)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={row.status !== 'Paid' ? [
                { label: 'Mark as Paid', icon: CheckCircle2, onClick: () => markPaid(row.id) },
              ] : [
                { label: 'View details', onClick: () => toast({ title: row.vendor, description: formatCurrency(row.amount), variant: 'info' }) },
              ]} />
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
