import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { formatCompact, formatCurrency } from '@/lib/utils'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-lg shadow-[var(--shadow-pop)] px-3 py-2 text-xs">
      <p className="font-medium text-secondary mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="figure">{p.name}: {formatCurrency(p.value)}</p>
      ))}
    </div>
  )
}

export default function RevenueExpenseChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barGap={6}>
        <CartesianGrid vertical={false} stroke="#E2E8F0" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={formatCompact} width={44} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="revenue" name="Revenue" fill="#2563EB" radius={[4, 4, 0, 0]} animationDuration={800} />
        <Bar dataKey="expenses" name="Expenses" fill="#CBD5E1" radius={[4, 4, 0, 0]} animationDuration={800} />
      </BarChart>
    </ResponsiveContainer>
  )
}
