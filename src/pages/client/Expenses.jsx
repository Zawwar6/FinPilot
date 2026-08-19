import { useState } from 'react'
import { TrendingDown, Plus, Download, CheckCircle2, XCircle, UploadCloud } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { Input, Select } from '@/components/ui/Input'
import { expenses as initialExpenses } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Expenses() {
  const toast = useToast()
  const [rows, setRows] = useState(initialExpenses)
  const [modalOpen, setModalOpen] = useState(false)

  function setStatus(id, status) {
    setRows(rs => rs.map(r => r.id === id ? { ...r, status } : r))
    toast({ title: status === 'Approved' ? 'Expense approved' : 'Expense rejected', variant: status === 'Approved' ? 'success' : 'warning' })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Expenses</h1>
          <p className="text-sm text-muted mt-1">Submit, review, and approve business expenses.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Export started', variant: 'info' })}><Download className="h-4 w-4" /> Export</Button>
          <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Expense</Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['vendor', 'category']}
            emptyIcon={TrendingDown}
            emptyTitle="No expenses yet"
            emptyDescription="Submitted expenses will appear here for review."
            emptyActionLabel="Add Expense"
            onEmptyAction={() => setModalOpen(true)}
            columns={[
              { key: 'date', label: 'Date', render: r => formatDate(r.date) },
              { key: 'vendor', label: 'Vendor' },
              { key: 'category', label: 'Category' },
              { key: 'paymentMethod', label: 'Payment Method' },
              { key: 'amount', label: 'Amount', render: r => <span className="figure font-medium text-secondary">{formatCurrency(r.amount)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              row.status === 'Pending Review' ? (
                <RowMenu items={[
                  { label: 'Approve', icon: CheckCircle2, onClick: () => setStatus(row.id, 'Approved') },
                  { label: 'Reject', icon: XCircle, danger: true, onClick: () => setStatus(row.id, 'Rejected') },
                ]} />
              ) : (
                <RowMenu items={[{ label: 'View details', onClick: () => toast({ title: row.vendor, description: `${row.category} · ${formatCurrency(row.amount)}`, variant: 'info' }) }]} />
              )
            )}
          />
        </CardContent>
      </Card>

      <ExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={e => { setRows(r => [e, ...r]); toast({ title: 'Expense submitted for review.', variant: 'success' }) }} />
    </div>
  )
}

function ExpenseModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({ date: '2026-08-19', vendor: '', category: 'Software', amount: '', paymentMethod: 'Corporate Card' })
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState(null)
  const toast = useToast()

  function submit() {
    if (!form.vendor || !form.amount) return
    onCreate({ id: 'exp_' + Math.random().toString(36).slice(2, 6), ...form, amount: Number(form.amount), tax: 0, status: 'Pending Review' })
    setForm({ date: '2026-08-19', vendor: '', category: 'Software', amount: '', paymentMethod: 'Corporate Card' })
    setFileName(null)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Add expense" footer={<>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button onClick={submit}>Submit for review</Button>
    </>}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          <Input label="Amount" type="number" step="0.01" placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
        </div>
        <Input label="Vendor" placeholder="e.g. Staples" value={form.vendor} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} />
        <div className="grid grid-cols-2 gap-3">
          <Select label="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {['Software', 'Marketing', 'Rent', 'Utilities', 'Operations', 'Other'].map(c => <option key={c}>{c}</option>)}
          </Select>
          <Select label="Payment method" value={form.paymentMethod} onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))}>
            {['Corporate Card', 'Bank Transfer', 'Cash'].map(c => <option key={c}>{c}</option>)}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">Receipt</label>
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); setFileName(e.dataTransfer.files?.[0]?.name || 'receipt.pdf'); toast({ title: 'Receipt attached', variant: 'success' }) }}
            className={`flex flex-col items-center justify-center gap-1.5 border-2 border-dashed rounded-xl py-6 text-center transition-colors ${dragOver ? 'border-primary bg-primary-light' : 'border-border'}`}
          >
            <UploadCloud className="h-5 w-5 text-muted" />
            <p className="text-xs text-muted">{fileName ? fileName : 'Drag & drop a receipt, or click to browse'}</p>
            <input type="file" className="hidden" id="receipt-upload" onChange={e => setFileName(e.target.files?.[0]?.name)} />
            <label htmlFor="receipt-upload" className="text-xs text-primary font-medium cursor-pointer hover:underline">Browse files</label>
          </div>
        </div>
      </div>
    </Modal>
  )
}
