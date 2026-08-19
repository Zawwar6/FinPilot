import { useState } from 'react'
import { motion } from 'framer-motion'
import { ListChecks, Plus, CheckCircle2, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import DataTable, { RowMenu } from '@/components/ui/DataTable'
import { Input, Select } from '@/components/ui/Input'
import { tasks as initialTasks, closingChecklist } from '@/data/mockData'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

export default function Tasks() {
  const toast = useToast()
  const [rows, setRows] = useState(initialTasks)
  const [checklist, setChecklist] = useState(closingChecklist)
  const [modalOpen, setModalOpen] = useState(false)

  const progress = Math.round((checklist.filter(c => c.done).length / checklist.length) * 100)

  function toggleChecklist(i) {
    setChecklist(c => c.map((item, idx) => idx === i ? { ...item, done: !item.done } : item))
  }

  function cycleStatus(row) {
    const order = ['Todo', 'In Progress', 'Review', 'Completed']
    const next = order[(order.indexOf(row.status) + 1) % order.length]
    setRows(rs => rs.map(r => r.id === row.id ? { ...r, status: next } : r))
    toast({ title: `Task moved to ${next}`, variant: 'success' })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Tasks</h1>
          <p className="text-sm text-muted mt-1">What our finance team is working on for you.</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> New Task</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>August Financial Closing</CardTitle>
          <span className="figure text-sm font-semibold text-primary">{progress}%</span>
        </CardHeader>
        <CardContent>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-5">
            <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {checklist.map((item, i) => (
              <button
                key={item.label}
                onClick={() => toggleChecklist(i)}
                className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm text-left transition-colors ${item.done ? 'border-success/30 bg-success-light text-success' : 'border-border text-slate-600 hover:bg-slate-50'}`}
              >
                {item.done ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <Circle className="h-4 w-4 shrink-0 text-slate-300" />}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={rows}
            searchKeys={['title', 'assignee']}
            emptyIcon={ListChecks}
            emptyTitle="No tasks yet"
            emptyDescription="Tasks from your finance team will show up here."
            columns={[
              { key: 'title', label: 'Task' },
              { key: 'assignee', label: 'Assignee' },
              { key: 'priority', label: 'Priority', render: r => <Badge variant={r.priority === 'High' ? 'danger' : r.priority === 'Medium' ? 'warning' : 'neutral'}>{r.priority}</Badge> },
              { key: 'dueDate', label: 'Due Date', render: r => formatDate(r.dueDate) },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
            renderActions={row => (
              <RowMenu items={[{ label: `Move to next stage`, onClick: () => cycleStatus(row) }]} />
            )}
          />
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New task" footer={
        <>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => { setModalOpen(false); toast({ title: 'Task created', variant: 'success' }) }}>Create Task</Button>
        </>
      }>
        <div className="space-y-4">
          <Input label="Title" placeholder="e.g. Review Q3 vendor contracts" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Priority"><option>Low</option><option>Medium</option><option>High</option></Select>
            <Input label="Due date" type="date" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
