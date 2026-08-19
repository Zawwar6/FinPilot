import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Download, Pencil, Trash2, ArrowLeftRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { transactions as initialTransactions } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

const schema = z.object({
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(2, 'Description is required'),
  amount: z.coerce.number().refine(v => v !== 0, 'Amount is required'),
  type: z.enum(['Income', 'Expense', 'Transfer']),
  category: z.string().min(1, 'Category is required'),
  account: z.string().min(1, 'Account is required'),
  notes: z.string().optional(),
})

const categories = ['Sales', 'Salaries', 'Marketing', 'Software', 'Rent', 'Utilities', 'Operations', 'Transfer', 'Other']
const accountNames = ['Business Checking', 'Payroll Account', 'Petty Cash', 'Corporate Card', 'Reserve Savings']

export default function Transactions() {
  const toast = useToast()
  const [rows, setRows] = useState(initialTransactions)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { date: '2026-08-19', type: 'Expense', category: categories[0], account: accountNames[0] },
  })

  function openAdd() {
    setEditing(null)
    reset({ date: '2026-08-19', description: '', amount: '', type: 'Expense', category: categories[0], account: accountNames[0], notes: '' })
    setModalOpen(true)
  }
  function openEdit(row) {
    setEditing(row)
    reset({ date: row.date, description: row.description, amount: Math.abs(row.amount), type: row.type, category: row.category, account: row.account, notes: '' })
    setModalOpen(true)
  }

  function onSubmit(values) {
    const signedAmount = values.type === 'Expense' ? -Math.abs(values.amount) : Math.abs(values.amount)
    if (editing) {
      setRows(rs => rs.map(r => r.id === editing.id ? { ...r, ...values, amount: signedAmount } : r))
      toast({ title: 'Transaction updated', variant: 'success' })
    } else {
      const id = 'txn_' + Math.random().toString(36).slice(2, 7)
      setRows(rs => [{ id, ...values, amount: signedAmount, status: 'Completed' }, ...rs])
      toast({ title: 'Transaction created successfully.', variant: 'success' })
    }
    setModalOpen(false)
  }

  function handleDelete() {
    setRows(rs => rs.filter(r => r.id !== confirmId))
    toast({ title: 'Transaction deleted', variant: 'success' })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Transactions</h1>
          <p className="text-sm text-muted mt-1">All income, expenses, and transfers across your accounts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Export started', description: 'Your CSV will download shortly.', variant: 'info' })}>
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4" /> Add Transaction</Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['description', 'category', 'account']}
            emptyIcon={ArrowLeftRight}
            emptyTitle="No transactions yet"
            emptyDescription="Add your first transaction to start tracking your cash flow."
            emptyActionLabel="Add Transaction"
            onEmptyAction={openAdd}
            columns={[
              { key: 'date', label: 'Date', render: r => formatDate(r.date) },
              { key: 'description', label: 'Description' },
              { key: 'category', label: 'Category' },
              { key: 'account', label: 'Account' },
              { key: 'type', label: 'Type', render: r => <Badge variant={r.type === 'Income' ? 'success' : r.type === 'Expense' ? 'danger' : 'neutral'}>{r.type}</Badge> },
              { key: 'amount', label: 'Amount', render: r => <span className={`figure font-medium ${r.amount >= 0 ? 'text-success' : 'text-secondary'}`}>{formatCurrency(r.amount)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={[
                { label: 'Edit', icon: Pencil, onClick: () => openEdit(row) },
                { label: 'Delete', icon: Trash2, danger: true, onClick: () => setConfirmId(row.id) },
              ]} />
            )}
          />
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit transaction' : 'Add transaction'}
        footer={<>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>{editing ? 'Save changes' : 'Create transaction'}</Button>
        </>}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" {...register('date')} error={errors.date?.message} />
            <Select label="Type" {...register('type')}>
              <option>Income</option><option>Expense</option><option>Transfer</option>
            </Select>
          </div>
          <Input label="Description" placeholder="e.g. AWS Cloud Infrastructure" {...register('description')} error={errors.description?.message} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Amount" type="number" step="0.01" placeholder="0.00" {...register('amount')} error={errors.amount?.message} />
            <Select label="Category" {...register('category')}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <Select label="Account" {...register('account')}>
            {accountNames.map(a => <option key={a}>{a}</option>)}
          </Select>
          <Textarea label="Notes (optional)" placeholder="Add any additional context..." {...register('notes')} />
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete transaction?"
        description="This will permanently remove the transaction from your records."
      />
    </div>
  )
}
