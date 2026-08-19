import { motion } from 'framer-motion'
import { Briefcase, Users2, DollarSign, ClipboardList, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { adminKpis, clientGrowthSeries, clientOrganizations, tasks } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

const kpiConfig = [
  { key: 'totalClients', label: 'Total Clients', icon: Briefcase, format: v => Math.round(v).toLocaleString() },
  { key: 'activeClients', label: 'Active Clients', icon: Users2, format: v => Math.round(v).toLocaleString() },
  { key: 'monthlyRevenue', label: 'Monthly Revenue', icon: DollarSign, format: formatCurrency },
  { key: 'pendingTasks', label: 'Pending Tasks', icon: ClipboardList, format: v => Math.round(v).toLocaleString() },
]

export default function AdminDashboard() {
  const pendingTasks = tasks.filter(t => t.status !== 'Completed')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">Platform Overview</h1>
        <p className="text-sm text-muted mt-1">Across all client organizations.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiConfig.map((c, i) => {
          const k = adminKpis[c.key]
          const up = k.change >= 0
          return (
            <motion.div key={c.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card>
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted font-medium">{c.label}</p>
                    <div className="h-8 w-8 rounded-lg bg-primary-light flex items-center justify-center"><c.icon className="h-4 w-4 text-primary" /></div>
                  </div>
                  <p className="figure text-2xl font-bold text-secondary"><AnimatedNumber value={k.value} format={c.format} /></p>
                  <p className={`text-xs mt-2 flex items-center gap-1 ${up ? 'text-success' : 'text-danger'}`}>
                    {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {up ? '+' : ''}{k.change}% <span className="text-slate-400 font-normal">vs last month</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Client Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={clientGrowthSeries}>
                <CartesianGrid vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} width={30} />
                <Tooltip />
                <Line type="monotone" dataKey="clients" stroke="#2563EB" strokeWidth={2.5} dot={false} animationDuration={900} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Attention Needed</CardTitle></CardHeader>
          <CardContent className="space-y-2.5">
            {clientOrganizations.filter(c => c.health !== 'Good').map(c => (
              <div key={c.id} className="flex items-center justify-between border border-border rounded-lg px-3.5 py-2.5">
                <div>
                  <p className="text-sm font-medium text-secondary">{c.name}</p>
                  <p className="text-xs text-muted">{c.closingProgress}% closed · {c.manager}</p>
                </div>
                <Badge>{c.health}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Pending Tasks Across Clients</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50 border-b border-border">
                {['Task', 'Client', 'Assignee', 'Priority', 'Status'].map(h => <th key={h} className="text-left font-medium text-muted px-4 py-3">{h}</th>)}
              </tr></thead>
              <tbody>
                {pendingTasks.map(t => (
                  <tr key={t.id} className="border-b border-border last:border-0 hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-medium text-secondary whitespace-nowrap">{t.title}</td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{t.client}</td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{t.assignee}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><Badge variant={t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warning' : 'neutral'}>{t.priority}</Badge></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Badge>{t.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
