import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import { clientOrganizations, subscriptionPlans } from '@/data/mockData'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { formatCurrency } from '@/lib/utils'

export default function AdminSubscriptions() {
  const mrr = clientOrganizations.reduce((s, c) => s + c.mrr, 0)
  const byPlan = subscriptionPlans.filter(p => p.price).map(p => ({
    ...p, count: clientOrganizations.filter(c => c.plan === p.name).length,
  }))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">Subscriptions</h1>
        <p className="text-sm text-muted mt-1">Plans, billing, and revenue across all clients.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="pt-5">
          <p className="text-sm text-muted font-medium">Total MRR</p>
          <p className="figure text-2xl font-bold text-secondary mt-1"><AnimatedNumber value={mrr} format={formatCurrency} /></p>
        </CardContent></Card>
        {byPlan.map(p => (
          <Card key={p.id}><CardContent className="pt-5">
            <p className="text-sm text-muted font-medium">{p.name} plan</p>
            <p className="figure text-2xl font-bold text-secondary mt-1">{p.count}</p>
            <p className="text-xs text-muted mt-1">${p.price}/mo each</p>
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-5">
          <p className="font-display font-semibold text-secondary mb-4">Client Subscriptions</p>
          <DataTable
            data={clientOrganizations}
            searchKeys={['name']}
            emptyTitle="No subscriptions"
            emptyDescription="No client subscriptions found."
            columns={[
              { key: 'name', label: 'Client' },
              { key: 'plan', label: 'Plan', render: r => <Badge variant="primary">{r.plan}</Badge> },
              { key: 'mrr', label: 'MRR', render: r => <span className="figure font-medium">${r.mrr}/mo</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
