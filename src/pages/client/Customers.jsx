import { useState } from 'react'
import { Users, Plus, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { Input, Textarea } from '@/components/ui/Input'
import { customers as initialCustomers, invoices, transactions } from '@/data/mockData'
import { formatCurrency, initials, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Customers() {
  const toast = useToast()
  const [rows, setRows] = useState(initialCustomers)
  const [active, setActive] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  if (active) return <CustomerDetail customer={active} onBack={() => setActive(null)} />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Customers</h1>
          <p className="text-sm text-muted mt-1">Everyone who pays you, in one place.</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Customer</Button>
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['name', 'contact', 'email']}
            emptyIcon={Users}
            emptyTitle="No customers yet"
            emptyDescription="Add a customer to start invoicing them."
            emptyActionLabel="Add Customer"
            onEmptyAction={() => setModalOpen(true)}
            columns={[
              { key: 'name', label: 'Customer', render: r => (
                <button onClick={() => setActive(r)} className="flex items-center gap-2.5 hover:text-primary">
                  <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center shrink-0">{initials(r.name)}</span>
                  <span className="font-medium">{r.name}</span>
                </button>
              ) },
              { key: 'contact', label: 'Contact' },
              { key: 'email', label: 'Email' },
              { key: 'totalRevenue', label: 'Total Revenue', render: r => <span className="figure font-medium text-secondary">{formatCurrency(r.totalRevenue)}</span> },
              { key: 'outstanding', label: 'Outstanding', render: r => <span className="figure font-medium text-warning">{formatCurrency(r.outstanding)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={[
                { label: 'View profile', onClick: () => setActive(row) },
                { label: 'Delete', danger: true, onClick: () => { setRows(rs => rs.filter(x => x.id !== row.id)); toast({ title: 'Customer removed', variant: 'success' }) } },
              ]} />
            )}
          />
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add customer" footer={
        <>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => { setModalOpen(false); toast({ title: 'Customer added', variant: 'success' }) }}>Add Customer</Button>
        </>
      }>
        <div className="space-y-4">
          <Input label="Company name" placeholder="e.g. Cedar & Co" />
          <Input label="Contact name" placeholder="e.g. Priya Nair" />
          <Input label="Email" type="email" placeholder="contact@company.com" />
          <Input label="Phone" placeholder="+1 (555) 000-0000" />
          <Textarea label="Address" placeholder="123 Main St, City, State" />
        </div>
      </Modal>
    </div>
  )
}

function CustomerDetail({ customer, onBack }) {
  const custInvoices = invoices.filter(i => i.customer === customer.name)
  const custTxns = transactions.filter(t => t.customer === customer.name)

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted hover:text-secondary">
        <ArrowLeft className="h-4 w-4" /> Back to customers
      </button>

      <div className="flex items-start gap-4">
        <span className="h-14 w-14 rounded-2xl bg-slate-200 text-slate-600 font-semibold flex items-center justify-center text-lg shrink-0">{initials(customer.name)}</span>
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">{customer.name}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {customer.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {customer.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {customer.address}</span>
          </div>
        </div>
        <div className="flex-1" />
        <Badge>{customer.status}</Badge>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card><CardContent className="pt-5">
          <p className="text-sm text-muted font-medium">Total Revenue</p>
          <p className="figure text-2xl font-bold text-secondary mt-1">{formatCurrency(customer.totalRevenue)}</p>
        </CardContent></Card>
        <Card><CardContent className="pt-5">
          <p className="text-sm text-muted font-medium">Outstanding</p>
          <p className="figure text-2xl font-bold text-warning mt-1">{formatCurrency(customer.outstanding)}</p>
        </CardContent></Card>
      </div>

      <Card>
        <CardContent className="pt-5">
          <p className="font-display font-semibold text-secondary mb-4">Invoices</p>
          <DataTable
            data={custInvoices}
            emptyTitle="No invoices"
            emptyDescription="This customer has no invoices yet."
            columns={[
              { key: 'id', label: 'Invoice #' },
              { key: 'issueDate', label: 'Issue Date', render: r => formatDate(r.issueDate) },
              { key: 'amount', label: 'Amount', render: r => <span className="figure font-medium">{formatCurrency(r.amount)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <p className="font-display font-semibold text-secondary mb-4">Transaction Activity</p>
          <DataTable
            data={custTxns}
            emptyTitle="No activity"
            emptyDescription="No transactions recorded for this customer."
            columns={[
              { key: 'date', label: 'Date', render: r => formatDate(r.date) },
              { key: 'description', label: 'Description' },
              { key: 'amount', label: 'Amount', render: r => <span className="figure font-medium text-success">{formatCurrency(r.amount)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
