import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, ArrowRight, Plus, FileText, Receipt as ReceiptIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import RevenueExpenseChart from '@/components/charts/RevenueExpenseChart'
import ProfitTrendChart from '@/components/charts/ProfitTrendChart'
import ExpenseDonut from '@/components/charts/ExpenseDonut'
import {
  kpis, revenueExpenseSeries, profitTrend, expenseBreakdown, transactions, invoices, bills, currentOrg,
} from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

const kpiCards = [
  { key: 'revenue', label: 'Total Revenue', icon: TrendingUp, tone: 'success' },
  { key: 'expenses', label: 'Total Expenses', icon: TrendingDown, tone: 'danger' },
  { key: 'netProfit', label: 'Net Profit', icon: TrendingUp, tone: 'primary' },
  { key: 'receivables', label: 'Outstanding Receivables', icon: ReceiptIcon, tone: 'warning' },
]

export default function Dashboard() {
  const receivables = invoices.filter(i => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0)
  const payables = bills.filter(b => b.status !== 'Paid').reduce((s, b) => s + b.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Good morning, {currentOrg.name}</h1>
          <p className="text-sm text-muted mt-1">Wednesday, August 19, 2026 · Financial period: August 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FileText className="h-4 w-4" /> New Invoice</Button>
          <Button size="sm"><Plus className="h-4 w-4" /> Add Transaction</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((c, i) => {
          const k = kpis[c.key]
          const up = k.trend === 'up'
          return (
            <motion.div key={c.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.3 }}>
              <Card className="hover:shadow-[var(--shadow-card-hover)]">
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted font-medium">{c.label}</p>
                    <div className="h-8 w-8 rounded-lg bg-primary-light flex items-center justify-center">
                      <c.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="figure text-2xl font-bold text-secondary">
                    <AnimatedNumber value={k.value} format={formatCurrency} />
                  </p>
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
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <Badge variant="neutral">Last 7 months</Badge>
          </CardHeader>
          <CardContent>
            <RevenueExpenseChart data={revenueExpenseSeries} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Expense Breakdown</CardTitle></CardHeader>
          <CardContent>
            <ExpenseDonut data={expenseBreakdown} />
            <div className="mt-3 space-y-1.5">
              {expenseBreakdown.slice(0, 4).map(e => (
                <div key={e.category} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-600"><span className="h-2 w-2 rounded-full" style={{ background: e.color }} />{e.category}</span>
                  <span className="figure text-secondary font-medium">{formatCurrency(e.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Profit Trend</CardTitle></CardHeader>
          <CardContent><ProfitTrendChart data={profitTrend} /></CardContent>
        </Card>
        <div className="space-y-5">
          <Card>
            <CardContent className="pt-5">
              <p className="text-sm text-muted font-medium mb-1">Accounts Receivable</p>
              <p className="figure text-xl font-bold text-secondary">{formatCurrency(receivables)}</p>
              <p className="text-xs text-muted mt-1">{invoices.filter(i => i.status !== 'Paid').length} outstanding invoices</p>
              <Link to="/app/invoices" className="text-xs text-primary font-medium mt-3 inline-flex items-center gap-1 hover:underline">View invoices <ArrowRight className="h-3 w-3" /></Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-sm text-muted font-medium mb-1">Accounts Payable</p>
              <p className="figure text-xl font-bold text-secondary">{formatCurrency(payables)}</p>
              <p className="text-xs text-muted mt-1">{bills.filter(b => b.status !== 'Paid').length} unpaid bills</p>
              <Link to="/app/bills" className="text-xs text-primary font-medium mt-3 inline-flex items-center gap-1 hover:underline">View bills <ArrowRight className="h-3 w-3" /></Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <Link to="/app/transactions" className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:underline">View all <ArrowRight className="h-3 w-3" /></Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  {['Date', 'Description', 'Category', 'Type', 'Amount', 'Status'].map(h => (
                    <th key={h} className="text-left font-medium text-muted px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 6).map((t, i) => (
                  <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border last:border-0 hover:bg-slate-50/80">
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(t.date)}</td>
                    <td className="px-4 py-3 text-secondary font-medium whitespace-nowrap">{t.description}</td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{t.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={t.type === 'Income' ? 'success' : t.type === 'Expense' ? 'danger' : 'neutral'}>{t.type}</Badge>
                    </td>
                    <td className={`px-4 py-3 figure font-medium whitespace-nowrap ${t.amount >= 0 ? 'text-success' : 'text-secondary'}`}>{formatCurrency(t.amount)}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><Badge>{t.status}</Badge></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
