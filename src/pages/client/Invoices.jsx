import { useState } from 'react'
import { FileText, Plus, Download, Eye, Copy, Send, CheckCircle2, Ban } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { invoices as initialInvoices, currentOrg } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Invoices() {
  const toast = useToast()
  const [rows, setRows] = useState(initialInvoices)
  const [preview, setPreview] = useState(null)

  function updateStatus(id, status) {
    setRows(rs => rs.map(r => r.id === id ? { ...r, status } : r))
    toast({ title: `Invoice marked as ${status}`, variant: 'success' })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Invoices</h1>
          <p className="text-sm text-muted mt-1">Create, send, and track customer invoices.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Export started', variant: 'info' })}><Download className="h-4 w-4" /> Export</Button>
          <Button size="sm" onClick={() => toast({ title: 'Invoice created successfully.', variant: 'success' })}><Plus className="h-4 w-4" /> Create Invoice</Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['id', 'customer']}
            emptyIcon={FileText}
            emptyTitle="No invoices yet"
            emptyDescription="Create your first invoice to start billing customers."
            emptyActionLabel="Create Invoice"
            onEmptyAction={() => toast({ title: 'Invoice created successfully.', variant: 'success' })}
            columns={[
              { key: 'id', label: 'Invoice #' },
              { key: 'customer', label: 'Customer' },
              { key: 'issueDate', label: 'Issue Date', render: r => formatDate(r.issueDate) },
              { key: 'dueDate', label: 'Due Date', render: r => formatDate(r.dueDate) },
              { key: 'amount', label: 'Amount', render: r => <span className="figure font-medium text-secondary">{formatCurrency(r.amount)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={[
                { label: 'Preview', icon: Eye, onClick: () => setPreview(row) },
                { label: 'Duplicate', icon: Copy, onClick: () => toast({ title: 'Invoice duplicated', variant: 'success' }) },
                { label: 'Send', icon: Send, onClick: () => updateStatus(row.id, 'Sent') },
                { label: 'Mark as Paid', icon: CheckCircle2, onClick: () => updateStatus(row.id, 'Paid') },
                { label: 'Cancel', icon: Ban, danger: true, onClick: () => updateStatus(row.id, 'Cancelled') },
              ]} />
            )}
          />
        </CardContent>
      </Card>

      <Modal open={!!preview} onClose={() => setPreview(null)} title={preview?.id} size="lg" footer={
        <>
          <Button variant="outline" onClick={() => setPreview(null)}>Close</Button>
          <Button onClick={() => toast({ title: 'Downloading PDF...', variant: 'info' })}><Download className="h-4 w-4" /> Download PDF</Button>
        </>
      }>
        {preview && (
          <div className="border border-border rounded-xl p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="font-display font-bold text-lg text-secondary">{currentOrg.name}</p>
                <p className="text-xs text-muted mt-1">San Francisco, CA</p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-xl text-secondary">INVOICE</p>
                <p className="text-xs text-muted mt-1">{preview.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <p className="text-xs text-muted mb-1">Billed to</p>
                <p className="font-medium text-secondary">{preview.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted mb-1">Issue date: <span className="text-secondary">{formatDate(preview.issueDate)}</span></p>
                <p className="text-xs text-muted">Due date: <span className="text-secondary">{formatDate(preview.dueDate)}</span></p>
              </div>
            </div>
            <table className="w-full text-sm mb-6">
              <thead>
                <tr className="border-b border-border text-muted text-left">
                  <th className="py-2 font-medium">Description</th>
                  <th className="py-2 font-medium text-right">Qty</th>
                  <th className="py-2 font-medium text-right">Price</th>
                  <th className="py-2 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {preview.items.map((it, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-2.5 text-secondary">{it.desc}</td>
                    <td className="py-2.5 text-right text-secondary figure">{it.qty}</td>
                    <td className="py-2.5 text-right text-secondary figure">{formatCurrency(it.price)}</td>
                    <td className="py-2.5 text-right text-secondary figure">{formatCurrency(it.qty * it.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="w-48 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted"><span>Subtotal</span><span className="figure">{formatCurrency(preview.amount)}</span></div>
                <div className="flex justify-between text-muted"><span>Tax</span><span className="figure">$0.00</span></div>
                <div className="flex justify-between font-semibold text-secondary border-t border-border pt-1.5"><span>Total</span><span className="figure">{formatCurrency(preview.amount)}</span></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
