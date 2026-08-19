import { ClipboardList } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import { tasks } from '@/data/mockData'

export default function AdminGeneric({ title, description }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">{title}</h1>
        <p className="text-sm text-muted mt-1">{description}</p>
      </div>
      <Card>
        <CardContent className="pt-5">
          <DataTable
            data={tasks}
            searchKeys={['title', 'client']}
            emptyIcon={ClipboardList}
            emptyTitle={`No ${title.toLowerCase()} yet`}
            emptyDescription="Data will appear here as your team works across clients."
            columns={[
              { key: 'title', label: 'Item' },
              { key: 'client', label: 'Client' },
              { key: 'assignee', label: 'Owner' },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
