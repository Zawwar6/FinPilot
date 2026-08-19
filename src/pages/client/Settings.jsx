import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building2, Users, Bell, ShieldCheck, CreditCard, Plug, SlidersHorizontal, DollarSign, Percent } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Input, Select } from '@/components/ui/Input'
import { currentOrg, financeTeam, subscriptionPlans } from '@/data/mockData'
import { cn } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

const tabs = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'company', label: 'Company', icon: Building2 },
  { key: 'team', label: 'Team', icon: Users },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: ShieldCheck },
  { key: 'billing', label: 'Billing', icon: CreditCard },
  { key: 'integrations', label: 'Integrations', icon: Plug },
  { key: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
]

export default function Settings() {
  const [tab, setTab] = useState('profile')

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your account, company, and workspace preferences.</p>
      </div>

      <div className="flex gap-6">
        <nav className="hidden md:flex flex-col gap-0.5 w-52 shrink-0">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn('flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-left', tab === t.key ? 'bg-primary-light text-primary' : 'text-slate-600 hover:bg-slate-100')}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>

        <div className="flex gap-1.5 md:hidden overflow-x-auto pb-1 -mx-1 px-1">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap', tab === t.key ? 'bg-primary text-white' : 'bg-white border border-border text-slate-600')}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}>
            {tab === 'profile' && <ProfileTab />}
            {tab === 'company' && <CompanyTab />}
            {tab === 'team' && <TeamTab />}
            {tab === 'notifications' && <NotificationsTab />}
            {tab === 'security' && <SecurityTab />}
            {tab === 'billing' && <BillingTab />}
            {tab === 'integrations' && <IntegrationsTab />}
            {tab === 'preferences' && <PreferencesTab />}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function SettingsCard({ title, description, children }) {
  const toast = useToast()
  return (
    <Card>
      <CardContent className="pt-5">
        <p className="font-display font-semibold text-secondary">{title}</p>
        {description && <p className="text-sm text-muted mt-1 mb-5">{description}</p>}
        <div className={description ? '' : 'mt-4'}>{children}</div>
        <div className="flex justify-end mt-6">
          <Button size="sm" onClick={() => toast({ title: 'Settings saved', variant: 'success' })}>Save changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ProfileTab() {
  return (
    <SettingsCard title="Profile" description="Update your personal information.">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Full name" defaultValue="Jordan Reeves" />
        <Input label="Email" defaultValue="jordan@novatechsolutions.com" type="email" />
        <Input label="Phone" defaultValue="+1 (415) 555-0134" />
        <Select label="Role"><option>Client Owner</option><option>Client Admin</option><option>Client Member</option></Select>
      </div>
    </SettingsCard>
  )
}

function CompanyTab() {
  return (
    <SettingsCard title="Company" description="Your business details used across invoices and reports.">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Business name" defaultValue={currentOrg.name} />
        <Select label="Business type" defaultValue={currentOrg.businessType}><option>{currentOrg.businessType}</option></Select>
        <Select label="Currency" defaultValue="USD"><option>USD</option><option>EUR</option><option>GBP</option></Select>
        <Select label="Financial year start" defaultValue={currentOrg.financialYearStart}>
          {['January', 'April', 'July', 'October'].map(m => <option key={m}>{m}</option>)}
        </Select>
      </div>
    </SettingsCard>
  )
}

function TeamTab() {
  const toast = useToast()
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-display font-semibold text-secondary">Team members</p>
            <p className="text-sm text-muted mt-1">People with access to your workspace.</p>
          </div>
          <Button size="sm" onClick={() => toast({ title: 'Invite sent', variant: 'success' })}>Invite member</Button>
        </div>
        <div className="space-y-2">
          {[{ name: 'Jordan Reeves', role: 'Client Owner', email: 'jordan@novatechsolutions.com' }, { name: 'Alicia Wong', role: 'Client Admin', email: 'alicia@novatechsolutions.com' }].map(m => (
            <div key={m.email} className="flex items-center justify-between border border-border rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-medium text-secondary">{m.name}</p>
                <p className="text-xs text-muted">{m.email}</p>
              </div>
              <Badge variant="neutral">{m.role}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function NotificationsTab() {
  const items = ['Invoice overdue', 'Expense needs approval', 'New document uploaded', 'Task assigned', 'Report ready', 'Client message']
  return (
    <SettingsCard title="Notifications" description="Choose what you'd like to be notified about.">
      <div className="space-y-3">
        {items.map(i => (
          <label key={i} className="flex items-center justify-between text-sm text-secondary">
            {i}
            <input type="checkbox" defaultChecked className="rounded border-border text-primary focus-ring h-4 w-4" />
          </label>
        ))}
      </div>
    </SettingsCard>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-5">
      <SettingsCard title="Password" description="Change your account password.">
        <div className="space-y-4 max-w-sm">
          <Input label="Current password" type="password" />
          <Input label="New password" type="password" />
        </div>
      </SettingsCard>
      <Card><CardContent className="pt-5 flex items-center justify-between">
        <div>
          <p className="font-display font-semibold text-secondary">Two-factor authentication</p>
          <p className="text-sm text-muted mt-1">Add an extra layer of security to your account.</p>
        </div>
        <Badge variant="warning">Not enabled</Badge>
      </CardContent></Card>
    </div>
  )
}

function BillingTab() {
  const toast = useToast()
  return (
    <div className="space-y-5">
      <Card><CardContent className="pt-5">
        <div className="flex items-center justify-between mb-1">
          <p className="font-display font-semibold text-secondary">Current plan</p>
          <Badge variant="primary">{currentOrg.plan}</Badge>
        </div>
        <p className="text-sm text-muted">Next payment of $149.00 on Sep 1, 2026.</p>
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" onClick={() => toast({ title: 'Redirecting to plan comparison...', variant: 'info' })}>Change plan</Button>
          <Button size="sm" variant="ghost" className="text-danger" onClick={() => toast({ title: 'Subscription cancellation requested', variant: 'warning' })}>Cancel plan</Button>
        </div>
      </CardContent></Card>
      <div className="grid sm:grid-cols-2 gap-4">
        {subscriptionPlans.filter(p => p.id !== 'enterprise').map(p => (
          <Card key={p.id} className={p.id === 'professional' ? 'border-primary' : ''}>
            <CardContent className="pt-5">
              <p className="font-semibold text-secondary">{p.name}</p>
              <p className="figure text-xl font-bold text-secondary mt-1">${p.price}<span className="text-sm text-muted font-normal">/mo</span></p>
              {p.id === 'professional' && <Badge variant="primary" className="mt-2">Current plan</Badge>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function IntegrationsTab() {
  const toast = useToast()
  const integrations = [
    { name: 'Stripe', desc: 'Payment processing & subscription billing', connected: true },
    { name: 'Plaid', desc: 'Connect bank accounts automatically', connected: false },
    { name: 'Slack', desc: 'Get notifications in Slack', connected: false },
    { name: 'Google Drive', desc: 'Sync documents automatically', connected: false },
  ]
  return (
    <Card><CardContent className="pt-5">
      <p className="font-display font-semibold text-secondary mb-1">Integrations</p>
      <p className="text-sm text-muted mb-5">Connect FinPilot with the tools you already use.</p>
      <div className="space-y-2.5">
        {integrations.map(i => (
          <div key={i.name} className="flex items-center justify-between border border-border rounded-xl px-4 py-3.5">
            <div>
              <p className="text-sm font-medium text-secondary">{i.name}</p>
              <p className="text-xs text-muted">{i.desc}</p>
            </div>
            <Button size="sm" variant={i.connected ? 'outline' : 'primary'} onClick={() => toast({ title: i.connected ? `${i.name} disconnected` : `${i.name} connected`, variant: 'success' })}>
              {i.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-4">Stripe credentials are managed server-side; this UI is a mock service architecture pending production keys.</p>
    </CardContent></Card>
  )
}

function PreferencesTab() {
  return (
    <div className="space-y-5">
      <SettingsCard title="Preferences" description="General workspace preferences.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Select label="Date format"><option>MM/DD/YYYY</option><option>DD/MM/YYYY</option></Select>
          <Select label="Theme"><option>Light</option></Select>
        </div>
      </SettingsCard>
      <SettingsCard title="Currency & Tax">
        <div className="grid sm:grid-cols-2 gap-4">
          <Select label="Default currency" icon={DollarSign}><option>USD</option></Select>
          <Input label="Default tax rate (%)" type="number" defaultValue="8.5" />
        </div>
      </SettingsCard>
    </div>
  )
}
