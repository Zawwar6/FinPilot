import { motion } from 'framer-motion'
import { Briefcase, ClipboardList, Clock, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import Messages from '@/pages/client/Messages'
import { clientOrganizations, tasks } from '@/data/mockData'

const myClients = clientOrganizations.filter(c => c.manager === 'Ahmed Raza')
const myTasks = tasks.filter(t => t.assignee === 'Ahmed Raza')

export default function FinanceWorkspace({ view }) {
  if (view === 'messages') return <Messages />
  if (view === 'clients') return <ClientsView />
  if (view === 'tasks') return <TasksView />
  return <Overview />
}

function Overview() {
  const pending = myTasks.filter(t => t.status !== 'Completed')
  const stats = [
    { label: 'My Clients', value: myClients.length, icon: Briefcase },
    { label: 'My Tasks', value: myTasks.length, icon: ClipboardList },
    { label: 'Pending Reviews', value: pending.length, icon: Clock },
    { label: 'Completed Tasks', value: myTasks.length - pending.length, icon: ClipboardList },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">Good morning, Ahmed</h1>
        <p className="text-sm text-muted mt-1">Here's what's on your plate today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card><CardContent className="pt-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary-light flex items-center justify-center"><s.icon className="h-5 w-5 text-primary" /></div>
              <div><p className="figure text-2xl font-bold text-secondary">{s.value}</p><p className="text-xs text-muted">{s.label}</p></div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>My Clients</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myClients.map(c => (
              <div key={c.id} className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-secondary text-sm">{c.name}</p>
                  <Badge>{c.health}</Badge>
                </div>
                <p className="text-xs text-muted mb-2">{c.industry}</p>
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${c.closingProgress}%` }} /></div>
                <p className="text-[11px] text-muted mt-1">{c.closingProgress}% closed</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ClientsView() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">My Clients</h1>
        <p className="text-sm text-muted mt-1">Businesses assigned to you.</p>
      </div>
      <Card><CardContent className="pt-5">
        <DataTable
          data={myClients}
          searchKeys={['name', 'industry']}
          emptyIcon={Briefcase}
          emptyTitle="No clients assigned"
          emptyDescription="Clients assigned to you will appear here."
          columns={[
            { key: 'name', label: 'Client' },
            { key: 'industry', label: 'Industry' },
            { key: 'plan', label: 'Plan', render: r => <Badge variant="primary">{r.plan}</Badge> },
            { key: 'closingProgress', label: 'Closing', render: r => `${r.closingProgress}%` },
            { key: 'health', label: 'Health', render: r => <Badge>{r.health}</Badge> },
          ]}
        />
      </CardContent></Card>
    </div>
  )
}

function TasksView() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">My Tasks</h1>
        <p className="text-sm text-muted mt-1">Work assigned to you across all clients.</p>
      </div>
      <Card><CardContent className="pt-5">
        <DataTable
          data={myTasks}
          searchKeys={['title', 'client']}
          emptyIcon={ClipboardList}
          emptyTitle="No tasks assigned"
          emptyDescription="Tasks assigned to you will appear here."
          columns={[
            { key: 'title', label: 'Task' },
            { key: 'client', label: 'Client' },
            { key: 'priority', label: 'Priority', render: r => <Badge variant={r.priority === 'High' ? 'danger' : r.priority === 'Medium' ? 'warning' : 'neutral'}>{r.priority}</Badge> },
            { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
          ]}
        />
      </CardContent></Card>
    </div>
  )
}
