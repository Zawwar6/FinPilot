import { useState } from 'react'
import { Users2, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { Input, Select } from '@/components/ui/Input'
import { financeTeam as initialTeam } from '@/data/mockData'
import { initials } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function AdminTeam() {
  const toast = useToast()
  const [rows, setRows] = useState(initialTeam)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Finance Team</h1>
          <p className="text-sm text-muted mt-1">Everyone on our finance staff and their workload.</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Employee</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rows.map(e => (
          <Card key={e.id}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-10 w-10 rounded-full bg-secondary text-white font-semibold flex items-center justify-center text-sm shrink-0">{initials(e.name)}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-secondary truncate">{e.name}</p>
                  <p className="text-xs text-muted truncate">{e.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="figure font-bold text-secondary">{e.clients}</p><p className="text-[11px] text-muted">Clients</p></div>
                <div><p className="figure font-bold text-secondary">{e.tasks}</p><p className="text-[11px] text-muted">Tasks</p></div>
                <div><p className="figure font-bold text-warning">{e.pending}</p><p className="text-[11px] text-muted">Pending</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['name', 'role', 'department']}
            emptyIcon={Users2}
            emptyTitle="No team members yet"
            emptyDescription="Add finance staff to start assigning clients."
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'clients', label: 'Clients' },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={[{ label: 'Reassign clients', onClick: () => toast({ title: 'Reassignment saved', variant: 'success' }) }]} />
            )}
          />
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add employee" footer={
        <><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => { setModalOpen(false); toast({ title: 'Employee added', variant: 'success' }) }}>Add Employee</Button></>
      }>
        <div className="space-y-4">
          <Input label="Full name" placeholder="e.g. Fatima Sheikh" />
          <Input label="Email" type="email" placeholder="fatima@finpilot.com" />
          <Select label="Role">{['Finance Manager', 'Accountant', 'Finance Executive'].map(r => <option key={r}>{r}</option>)}</Select>
        </div>
      </Modal>
    </div>
  )
}
