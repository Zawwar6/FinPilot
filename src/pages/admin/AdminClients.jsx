import { useState } from 'react'
import { ArrowLeft, Briefcase, Plus, Pause, Play, UserCog } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { Input, Select } from '@/components/ui/Input'
import { clientOrganizations as initialClients, financeTeam, tasks, documents } from '@/data/mockData'
import { useToast } from '@/context/ToastContext'

export default function AdminClients() {
  const toast = useToast()
  const [rows, setRows] = useState(initialClients)
  const [active, setActive] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  function toggleStatus(id) {
    setRows(rs => rs.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Suspended' : 'Active' } : r))
    toast({ title: 'Client status updated', variant: 'success' })
  }

  if (active) return <ClientDetail client={active} onBack={() => setActive(null)} />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Clients</h1>
          <p className="text-sm text-muted mt-1">Every business your finance team manages.</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Client</Button>
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['name', 'industry', 'manager']}
            emptyIcon={Briefcase}
            emptyTitle="No clients yet"
            emptyDescription="Add your first client to start managing their finances."
            columns={[
              { key: 'name', label: 'Client', render: r => <button onClick={() => setActive(r)} className="font-medium text-secondary hover:text-primary">{r.name}</button> },
              { key: 'industry', label: 'Industry' },
              { key: 'plan', label: 'Plan', render: r => <Badge variant="primary">{r.plan}</Badge> },
              { key: 'manager', label: 'Finance Manager' },
              { key: 'closingProgress', label: 'Closing', render: r => (
                <div className="w-24">
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${r.closingProgress}%` }} /></div>
                  <span className="text-[11px] text-muted">{r.closingProgress}%</span>
                </div>
              ) },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={[
                { label: 'View details', icon: Briefcase, onClick: () => setActive(row) },
                { label: 'Assign finance team', icon: UserCog, onClick: () => toast({ title: 'Assignment updated', variant: 'success' }) },
                { label: row.status === 'Active' ? 'Suspend client' : 'Activate client', icon: row.status === 'Active' ? Pause : Play, danger: row.status === 'Active', onClick: () => toggleStatus(row.id) },
              ]} />
            )}
          />
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add client" footer={
        <><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => { setModalOpen(false); toast({ title: 'Client added', variant: 'success' }) }}>Add Client</Button></>
      }>
        <div className="space-y-4">
          <Input label="Business name" placeholder="e.g. Meridian Foods" />
          <Input label="Industry" placeholder="e.g. Food & Beverage" />
          <Select label="Plan">{['Starter', 'Professional', 'Business', 'Enterprise'].map(p => <option key={p}>{p}</option>)}</Select>
          <Select label="Assign finance manager">{financeTeam.map(f => <option key={f.id}>{f.name}</option>)}</Select>
        </div>
      </Modal>
    </div>
  )
}

function ClientDetail({ client, onBack }) {
  const clientTasks = tasks.filter(t => t.client === client.name)
  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted hover:text-secondary">
        <ArrowLeft className="h-4 w-4" /> Back to clients
      </button>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">{client.name}</h1>
          <p className="text-sm text-muted mt-1">{client.industry} · Managed by {client.manager}</p>
        </div>
        <Badge>{client.status}</Badge>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card><CardContent className="pt-5"><p className="text-sm text-muted font-medium">Plan</p><p className="text-xl font-bold text-secondary mt-1">{client.plan}</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-sm text-muted font-medium">MRR</p><p className="figure text-xl font-bold text-secondary mt-1">${client.mrr}</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-sm text-muted font-medium">Monthly Closing</p><p className="figure text-xl font-bold text-secondary mt-1">{client.closingProgress}%</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="pt-5">
          <p className="font-display font-semibold text-secondary mb-4">Tasks</p>
          <DataTable data={clientTasks} emptyTitle="No tasks" emptyDescription="No tasks assigned for this client." columns={[
            { key: 'title', label: 'Task' },
            { key: 'assignee', label: 'Assignee' },
            { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <p className="font-display font-semibold text-secondary mb-4">Documents</p>
          <DataTable data={documents} emptyTitle="No documents" emptyDescription="No documents uploaded yet." columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category', render: r => <Badge variant="neutral">{r.category}</Badge> },
          ]} />
        </CardContent>
      </Card>
    </div>
  )
}
