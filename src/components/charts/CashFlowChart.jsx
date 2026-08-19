import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
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

export default function CashFlowChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} stroke="#E2E8F0" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={formatCompact} width={44} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="inflow" name="Inflow" stroke="#16A34A" strokeWidth={2.5} dot={false} animationDuration={900} />
        <Line type="monotone" dataKey="outflow" name="Outflow" stroke="#DC2626" strokeWidth={2.5} dot={false} animationDuration={900} />
      </LineChart>
    </ResponsiveContainer>
  )
}
