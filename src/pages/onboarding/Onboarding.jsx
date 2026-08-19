import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Landmark, ArrowRight, ArrowLeft, CheckCircle2, Plus, X, PartyPopper } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'

const totalSteps = 8

const businessTypes = ['Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'Non-profit']
const currencies = ['USD — US Dollar', 'EUR — Euro', 'GBP — British Pound', 'PKR — Pakistani Rupee', 'AED — UAE Dirham']
const companySizes = ['1–10 employees', '11–50 employees', '51–200 employees', '200+ employees']
const serviceOptions = ['Bookkeeping', 'Expense management', 'Invoicing', 'Financial reporting', 'Tax preparation', 'Payroll', 'Account reconciliation', 'Finance consulting']

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    businessName: '', legalName: '', address: '',
    businessType: businessTypes[2],
    currency: currencies[0],
    fyStart: 'January',
    companySize: companySizes[0],
    services: ['Bookkeeping', 'Financial reporting'],
    invites: [''],
  })

  function update(patch) { setData(d => ({ ...d, ...patch })) }
  function next() { setStep(s => Math.min(totalSteps, s + 1)) }
  function back() { setStep(s => Math.max(1, s - 1)) }
  function toggleService(s) {
    setData(d => ({
      ...d,
      services: d.services.includes(s) ? d.services.filter(x => x !== s) : [...d.services, s],
    }))
  }

  const progress = (step / totalSteps) * 100

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="h-16 flex items-center px-6 border-b border-border bg-white">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Landmark className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-bold text-secondary">FinPilot</span>
        </div>
        <div className="flex-1" />
        {step < totalSteps && <span className="text-xs text-muted">Step {step} of {totalSteps - 1}</span>}
      </header>
      <div className="h-1 bg-border">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 1 && <BusinessInfo data={data} update={update} onNext={next} />}
              {step === 2 && <BusinessType data={data} update={update} onNext={next} onBack={back} />}
              {step === 3 && <Currency data={data} update={update} onNext={next} onBack={back} />}
              {step === 4 && <FinancialYear data={data} update={update} onNext={next} onBack={back} />}
              {step === 5 && <CompanySize data={data} update={update} onNext={next} onBack={back} />}
              {step === 6 && <Services data={data} toggleService={toggleService} onNext={next} onBack={back} />}
              {step === 7 && <InviteTeam data={data} update={update} onNext={next} onBack={back} />}
              {step === 8 && <Success onFinish={() => navigate('/app')} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function StepShell({ title, subtitle, children, onNext, onBack, nextLabel = 'Continue', disabled }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-8 shadow-[var(--shadow-card)]">
      <h2 className="font-display font-bold text-2xl text-secondary mb-1.5">{title}</h2>
      {subtitle && <p className="text-sm text-muted mb-6">{subtitle}</p>}
      <div className="space-y-4 mb-8">{children}</div>
      <div className="flex gap-3">
        {onBack && (
          <Button variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Back</Button>
        )}
        <Button className="flex-1" onClick={onNext} disabled={disabled}>{nextLabel} <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </div>
  )
}

function BusinessInfo({ data, update, onNext }) {
  return (
    <StepShell title="Business information" subtitle="Tell us the basics about your business." onNext={onNext} disabled={!data.businessName}>
      <Input label="Business name" value={data.businessName} onChange={e => update({ businessName: e.target.value })} placeholder="Acme Corp" />
      <Input label="Legal entity name (optional)" value={data.legalName} onChange={e => update({ legalName: e.target.value })} placeholder="Acme Corp LLC" />
      <Input label="Business address" value={data.address} onChange={e => update({ address: e.target.value })} placeholder="123 Market St, San Francisco, CA" />
    </StepShell>
  )
}

function BusinessType({ data, update, onNext, onBack }) {
  return (
    <StepShell title="Business type" subtitle="This helps us tailor your chart of accounts." onNext={onNext} onBack={onBack}>
      <div className="grid grid-cols-1 gap-2">
        {businessTypes.map(t => (
          <OptionCard key={t} label={t} selected={data.businessType === t} onClick={() => update({ businessType: t })} />
        ))}
      </div>
    </StepShell>
  )
}

function Currency({ data, update, onNext, onBack }) {
  return (
    <StepShell title="Primary currency" subtitle="You can add more currencies later." onNext={onNext} onBack={onBack}>
      <Select label="Currency" value={data.currency} onChange={e => update({ currency: e.target.value })}>
        {currencies.map(c => <option key={c}>{c}</option>)}
      </Select>
    </StepShell>
  )
}

function FinancialYear({ data, update, onNext, onBack }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return (
    <StepShell title="Financial year" subtitle="When does your fiscal year start?" onNext={onNext} onBack={onBack}>
      <Select label="Financial year start month" value={data.fyStart} onChange={e => update({ fyStart: e.target.value })}>
        {months.map(m => <option key={m}>{m}</option>)}
      </Select>
    </StepShell>
  )
}

function CompanySize({ data, update, onNext, onBack }) {
  return (
    <StepShell title="Company size" subtitle="Roughly how many people work at your business?" onNext={onNext} onBack={onBack}>
      <div className="grid grid-cols-1 gap-2">
        {companySizes.map(s => (
          <OptionCard key={s} label={s} selected={data.companySize === s} onClick={() => update({ companySize: s })} />
        ))}
      </div>
    </StepShell>
  )
}

function Services({ data, toggleService, onNext, onBack }) {
  return (
    <StepShell title="Finance services" subtitle="Select everything you'd like our team to manage." onNext={onNext} onBack={onBack} disabled={data.services.length === 0}>
      <div className="grid grid-cols-2 gap-2">
        {serviceOptions.map(s => (
          <OptionCard key={s} label={s} selected={data.services.includes(s)} onClick={() => toggleService(s)} compact />
        ))}
      </div>
    </StepShell>
  )
}

function InviteTeam({ data, update, onNext, onBack }) {
  function updateInvite(i, val) {
    const invites = [...data.invites]
    invites[i] = val
    update({ invites })
  }
  function addInvite() { update({ invites: [...data.invites, ''] }) }
  function removeInvite(i) { update({ invites: data.invites.filter((_, idx) => idx !== i) }) }

  return (
    <StepShell title="Invite your team" subtitle="Add teammates who should have access to this workspace." onNext={onNext} onBack={onBack} nextLabel="Finish setup">
      <div className="space-y-2.5">
        {data.invites.map((val, i) => (
          <div key={i} className="flex gap-2">
            <Input placeholder="teammate@company.com" value={val} onChange={e => updateInvite(i, e.target.value)} className="flex-1" />
            {data.invites.length > 1 && (
              <button onClick={() => removeInvite(i)} className="h-10 w-10 flex items-center justify-center text-muted hover:text-danger rounded-lg hover:bg-red-50">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button onClick={addInvite} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-1">
        <Plus className="h-4 w-4" /> Add another
      </button>
    </StepShell>
  )
}

function Success({ onFinish }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-border rounded-2xl p-10 text-center shadow-[var(--shadow-card)]">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        className="h-16 w-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-5"
      >
        <PartyPopper className="h-7 w-7 text-success" />
      </motion.div>
      <h2 className="font-display font-bold text-2xl text-secondary mb-2">You're all set!</h2>
      <p className="text-sm text-muted mb-8 max-w-sm mx-auto">
        Your workspace is ready. A finance manager will reach out within one business day to kick off onboarding on our side.
      </p>
      <Button size="lg" onClick={onFinish} className="w-full">Go to your dashboard <ArrowRight className="h-4 w-4" /></Button>
    </motion.div>
  )
}

function OptionCard({ label, selected, onClick, compact }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl border px-4 ${compact ? 'py-2.5' : 'py-3.5'} text-sm font-medium transition-colors ${
        selected ? 'border-primary bg-primary-light text-primary' : 'border-border text-secondary hover:bg-slate-50'
      }`}
    >
      {label}
      {selected && <CheckCircle2 className="h-4 w-4" />}
    </button>
  )
}
