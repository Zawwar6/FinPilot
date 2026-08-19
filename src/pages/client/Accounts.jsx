import { useState } from 'react'
import { motion } from 'framer-motion'
import { Landmark, Wallet, CreditCard, PiggyBank, Plus, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/Input'
import DataTable from '@/components/ui/DataTable'
import { accounts, transactions } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

const typeIcon = { Bank: Landmark, Cash: Wallet, 'Credit Card': CreditCard, Savings: PiggyBank, Other: Wallet }

export default function Accounts() {
  const toast = useToast()
  const [selected, setSelected] = useState(accounts[0])
  const [modalOpen, setModalOpen] = useState(false)

  const accountTxns = transactions.filter(t => t.account === selected.name)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary">Accounts</h1>
          <p className="text-sm text-muted mt-1">Bank, cash, and card accounts connected to your workspace.</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Account</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((a, i) => {
          const Icon = typeIcon[a.type]
          const active = selected.id === a.id
          return (
            <motion.button
              key={a.id}
              onClick={() => setSelected(a)}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="text-left"
            >
              <Card className={`transition-all ${active ? 'border-primary ring-1 ring-primary' : 'hover:shadow-[var(--shadow-card-hover)]'}`}>
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-9 w-9 rounded-lg bg-primary-light flex items-center justify-center">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <Badge variant="neutral">{a.type}</Badge>
                  </div>
                  <p className="text-sm font-medium text-secondary">{a.name}</p>
                  <p className="figure text-xl font-bold text-secondary mt-1">{formatCurrency(a.balance)}</p>
                  <p className="text-xs text-muted mt-1">{a.institution}{a.last4 ? ` •••• ${a.last4}` : ''}</p>
                </CardContent>
              </Card>
            </motion.button>
          )
        })}
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-display font-semibold text-secondary">{selected.name} — Transaction History</p>
            <span className="text-xs text-muted flex items-center gap-1"><ArrowUpRight className="h-3.5 w-3.5" /> {accountTxns.length} transactions</span>
          </div>
          <DataTable
            data={accountTxns}
            searchKeys={['description']}
            emptyTitle="No transactions on this account"
            emptyDescription="Transactions for this account will show up here."
            columns={[
              { key: 'date', label: 'Date', render: r => formatDate(r.date) },
              { key: 'description', label: 'Description' },
              { key: 'category', label: 'Category' },
              { key: 'amount', label: 'Amount', render: r => <span className={`figure font-medium ${r.amount >= 0 ? 'text-success' : 'text-secondary'}`}>{formatCurrency(r.amount)}</span> },
              { key: 'status', label: 'Status', render: r => <Badge>{r.status}</Badge> },
            ]}
          />
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add account" footer={
        <>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => { setModalOpen(false); toast({ title: 'Account added', variant: 'success' }) }}>Add Account</Button>
        </>
      }>
        <div className="space-y-4">
          <Input label="Account name" placeholder="e.g. Business Savings" />
          <Select label="Account type"><option>Bank</option><option>Cash</option><option>Credit Card</option><option>Savings</option><option>Other</option></Select>
          <Input label="Starting balance" type="number" step="0.01" placeholder="0.00" />
        </div>
      </Modal>
    </div>
  )
}
