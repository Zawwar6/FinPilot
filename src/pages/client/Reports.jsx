import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileBarChart, Download, Printer, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { revenueExpenseSeries, expenseBreakdown } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

const reportTypes = ['Profit & Loss', 'Balance Sheet', 'Cash Flow Statement', 'Expense Report', 'Revenue Report', 'Accounts Receivable', 'Accounts Payable', 'Tax Summary']

export default function Reports() {
  const toast = useToast()
  const [type, setType] = useState(reportTypes[0])
  const [range, setRange] = useState('This Month')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)

  function generate() {
    setLoading(true)
    setReport(null)
    setTimeout(() => {
      setLoading(false)
      setReport({ type, range })
    }, 1100)
  }

  const totalRevenue = revenueExpenseSeries.reduce((s, d) => s + d.revenue, 0)
  const totalExpenses = revenueExpenseSeries.reduce((s, d) => s + d.expenses, 0)
  const cogs = totalExpenses * 0.35
  const opEx = totalExpenses - cogs
  const grossProfit = totalRevenue - cogs
  const netProfit = grossProfit - opEx

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">Reports</h1>
        <p className="text-sm text-muted mt-1">Generate financial statements for any period.</p>
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <Select label="Report type" value={type} onChange={e => setType(e.target.value)}>
                {reportTypes.map(t => <option key={t}>{t}</option>)}
              </Select>
            </div>
            <div className="flex-1 w-full">
              <Select label="Date range" value={range} onChange={e => setRange(e.target.value)}>
                {['This Month', 'Last Month', 'This Quarter', 'This Year', 'Last Year'].map(r => <option key={r}>{r}</option>)}
              </Select>
            </div>
            <Button onClick={generate} disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileBarChart className="h-4 w-4" />}
              {loading ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card><CardContent className="py-16 flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <p className="text-sm text-muted">Building your {type.toLowerCase()}...</p>
            </CardContent></Card>
          </motion.div>
        )}

        {report && !loading && (
          <motion.div key="report" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>{report.type}</CardTitle>
                  <p className="text-xs text-muted mt-0.5">{report.range} · NovaTech Solutions</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast({ title: 'Exporting PDF...', variant: 'info' })}><Download className="h-4 w-4" /> PDF</Button>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: 'Exporting CSV...', variant: 'info' })}><Download className="h-4 w-4" /> CSV</Button>
                  <Button variant="ghost" size="icon" onClick={() => toast({ title: 'Sending to printer...', variant: 'info' })}><Printer className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent>
                {report.type === 'Profit & Loss' && (
                  <div className="max-w-lg space-y-1 text-sm">
                    <Row label="Revenue" value={totalRevenue} bold />
                    <Row label="Cost of Goods Sold" value={-cogs} />
                    <Row label="Gross Profit" value={grossProfit} bold border />
                    <Row label="Operating Expenses" value={-opEx} />
                    <Row label="Net Profit" value={netProfit} bold border highlight />
                  </div>
                )}
                {report.type === 'Balance Sheet' && (
                  <div className="grid sm:grid-cols-3 gap-6 text-sm">
                    <div><p className="font-semibold text-secondary mb-2">Assets</p><Row label="Cash & Equivalents" value={146870.32} /><Row label="Accounts Receivable" value={32800} /><Row label="Total Assets" value={179670.32} bold border /></div>
                    <div><p className="font-semibold text-secondary mb-2">Liabilities</p><Row label="Accounts Payable" value={-10680} /><Row label="Credit Card" value={-3420.55} /><Row label="Total Liabilities" value={-14100.55} bold border /></div>
                    <div><p className="font-semibold text-secondary mb-2">Equity</p><Row label="Retained Earnings" value={165569.77} /><Row label="Total Equity" value={165569.77} bold border /></div>
                  </div>
                )}
                {report.type === 'Cash Flow Statement' && (
                  <div className="max-w-lg space-y-1 text-sm">
                    <p className="font-semibold text-secondary mt-2 mb-1">Operating Activities</p>
                    <Row label="Net Income" value={netProfit} />
                    <Row label="Changes in Receivables" value={-8200} />
                    <p className="font-semibold text-secondary mt-3 mb-1">Investing Activities</p>
                    <Row label="Equipment Purchases" value={-4200} />
                    <p className="font-semibold text-secondary mt-3 mb-1">Financing Activities</p>
                    <Row label="Owner Distributions" value={-10000} />
                    <Row label="Net Change in Cash" value={netProfit - 8200 - 4200 - 10000} bold border highlight />
                  </div>
                )}
                {(report.type === 'Expense Report' || report.type === 'Revenue Report') && (
                  <div className="max-w-lg space-y-1 text-sm">
                    {report.type === 'Expense Report'
                      ? expenseBreakdown.map(e => <Row key={e.category} label={e.category} value={-e.value} />)
                      : revenueExpenseSeries.map(d => <Row key={d.month} label={d.month} value={d.revenue} />)}
                  </div>
                )}
                {(report.type === 'Accounts Receivable' || report.type === 'Accounts Payable') && (
                  <p className="text-sm text-muted">Detailed aging breakdown available in {report.type === 'Accounts Receivable' ? 'Invoices' : 'Bills'}.</p>
                )}
                {report.type === 'Tax Summary' && (
                  <div className="max-w-lg space-y-1 text-sm">
                    <Row label="Taxable Income" value={netProfit} />
                    <Row label="Estimated Tax (21%)" value={-(netProfit * 0.21)} bold border highlight />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Row({ label, value, bold, border, highlight }) {
  return (
    <div className={`flex justify-between py-1.5 ${border ? 'border-t border-border pt-2 mt-1' : ''} ${bold ? 'font-semibold' : ''} ${highlight ? 'text-primary' : 'text-secondary'}`}>
      <span className={highlight ? '' : 'text-slate-600'}>{label}</span>
      <span className="figure">{formatCurrency(value)}</span>
    </div>
  )
}
