import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const p = payload[0]
  return (
    <div className="bg-white border border-border rounded-lg shadow-[var(--shadow-pop)] px-3 py-2 text-xs">
      <p className="font-medium text-secondary figure">{p.name}: {formatCurrency(p.value)}</p>
    </div>
  )
}

export default function ExpenseDonut({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="category" innerRadius={62} outerRadius={90} paddingAngle={2} animationDuration={900}>
            {data.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-xs text-muted">Total</p>
        <p className="figure font-semibold text-secondary text-sm">{formatCurrency(total)}</p>
      </div>
    </div>
  )
}
