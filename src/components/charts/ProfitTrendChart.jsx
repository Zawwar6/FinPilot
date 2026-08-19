import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCompact, formatCurrency } from '@/lib/utils'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-lg shadow-[var(--shadow-pop)] px-3 py-2 text-xs">
      <p className="font-medium text-secondary mb-1">{label}</p>
      <p className="text-success figure">Profit: {formatCurrency(payload[0].value)}</p>
    </div>
  )
}

export default function ProfitTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16A34A" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#E2E8F0" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={formatCompact} width={44} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="profit" stroke="#16A34A" strokeWidth={2.5} fill="url(#profitFill)" animationDuration={900} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
