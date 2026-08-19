import { useState } from 'react'
import { Building2, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { Input, Textarea } from '@/components/ui/Input'
import { vendors as initialVendors } from '@/data/mockData'
import { formatCurrency, initials } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Vendors() {
  const toast = useToast()
  const [rows, setRows] = useState(initialVendors)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Vendors</h1>
          <p className="text-sm text-muted mt-1">Everyone your business pays.</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Vendor</Button>
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['name', 'contact', 'email']}
            emptyIcon={Building2}
            emptyTitle="No vendors yet"
            emptyDescription="Add a vendor to start tracking bills and expenses."
            emptyActionLabel="Add Vendor"
            onEmptyAction={() => setModalOpen(true)}
            columns={[
              { key: 'name', label: 'Vendor', render: r => (
                <span className="flex items-center gap-2.5">
                  <span className="h-7 w-7 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center shrink-0">{initials(r.name)}</span>
                  <span className="font-medium text-secondary">{r.name}</span>
                </span>
              ) },
              { key: 'contact', label: 'Contact' },
              { key: 'email', label: 'Email' },
              { key: 'totalExpenses', label: 'Total Expenses', render: r => <span className="figure font-medium text-secondary">{formatCurrency(r.totalExpenses)}</span> },
              { key: 'outstanding', label: 'Outstanding', render: r => <span className="figure font-medium text-warning">{formatCurrency(r.outstanding)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={[
                { label: 'View profile', onClick: () => toast({ title: row.name, description: `Total expenses: ${formatCurrency(row.totalExpenses)}`, variant: 'info' }) },
                { label: 'Delete', danger: true, onClick: () => { setRows(rs => rs.filter(x => x.id !== row.id)); toast({ title: 'Vendor removed', variant: 'success' }) } },
              ]} />
            )}
          />
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add vendor" footer={
        <>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => { setModalOpen(false); toast({ title: 'Vendor added', variant: 'success' }) }}>Add Vendor</Button>
        </>
      }>
        <div className="space-y-4">
          <Input label="Vendor name" placeholder="e.g. Staples" />
          <Input label="Contact name" placeholder="e.g. Billing Team" />
          <Input label="Email" type="email" placeholder="billing@vendor.com" />
          <Input label="Phone" placeholder="+1 (555) 000-0000" />
          <Textarea label="Address" placeholder="123 Main St, City, State" />
        </div>
      </Modal>
    </div>
  )
}
