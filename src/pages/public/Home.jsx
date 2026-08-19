import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, TrendingUp, Receipt, FileText, GitCompareArrows, ShieldCheck, Users,
  CheckCircle2, Star, ChevronDown, Calendar, MessageSquare, ClipboardList,
} from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { subscriptionPlans } from '@/data/mockData'
import { formatCurrency, formatCompact } from '@/lib/utils'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <Hero navigate={navigate} />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Services />
      <DashboardPreview />
      <Benefits />
      <Testimonials />
      <Pricing navigate={navigate} />
      <FAQ />
      <CTA navigate={navigate} />
    </div>
  )
}

function Hero({ navigate }) {
  return (
    <section className="relative ledger-grid overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-bg pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-light text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Now onboarding new businesses
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-secondary leading-[1.08]"
          >
            Your Finances.<br />Managed Smarter.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-6 text-lg text-slate-600 max-w-xl"
          >
            FinPilot pairs a real finance team with software that shows you everything they do — bookkeeping, invoicing, reconciliation, and reporting, handled end to end and visible in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Button size="lg" onClick={() => navigate('/register')}>Get Started <ArrowRight className="h-4 w-4" /></Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/register')}>Book a Consultation</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center gap-6 text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> No setup fees</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Cancel anytime</span>
          </motion.div>
        </div>
      </div>

      {/* floating finance cards */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="hidden xl:block absolute right-[6%] top-28 w-64 bg-white rounded-2xl border border-border shadow-[var(--shadow-pop)] p-4"
      >
        <p className="text-xs text-muted mb-1">Net Profit</p>
        <p className="figure text-2xl font-bold text-secondary"><AnimatedNumber value={57150} format={formatCurrency} /></p>
        <p className="text-xs text-success mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +24.1% vs last month</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="hidden xl:block absolute right-[16%] top-64 w-56 bg-white rounded-2xl border border-border shadow-[var(--shadow-pop)] p-4"
      >
        <p className="text-xs text-muted mb-2">Invoice INV-1022</p>
        <p className="text-sm font-semibold text-secondary">Acme Corp</p>
        <p className="figure text-lg font-bold text-secondary mt-1">{formatCurrency(6200)}</p>
        <span className="inline-block mt-2 text-[11px] font-medium bg-primary-light text-primary px-2 py-0.5 rounded-md">Sent</span>
      </motion.div>
    </section>
  )
}

function TrustedBy() {
  const names = ['NovaTech Solutions', 'Vertex Trading', 'BluePeak Consulting', 'UrbanEdge Retail', 'Atlas Logistics', 'Tech Corp']
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400 mb-6">Trusted by growing businesses</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {names.map(n => (
            <span key={n} className="font-display font-semibold text-slate-400 text-lg">{n}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

const featureList = [
  { icon: Receipt, title: 'Transactions, organized', desc: 'Every transaction categorized and reconciled — you see it the moment it happens, not at month end.' },
  { icon: FileText, title: 'Invoicing that follows up', desc: 'Send professional invoices and let us chase the overdue ones so you don\'t have to.' },
  { icon: GitCompareArrows, title: 'Reconciliation done for you', desc: 'Our team matches every transaction against your bank feed and flags discrepancies early.' },
  { icon: TrendingUp, title: 'Reports you can act on', desc: 'P&L, balance sheet, and cash flow — generated on schedule, explained in plain language.' },
  { icon: Users, title: 'A dedicated finance team', desc: 'A finance manager and accountant assigned to your business, not a ticket queue.' },
  { icon: ShieldCheck, title: 'Bank-grade security', desc: 'Role-based access, full audit trails, and tenant isolation for every client workspace.' },
]

function Features() {
  return (
    <section id="features" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-xl mb-14">
          <p className="text-primary text-sm font-semibold mb-3">Features</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">Everything your finance function needs, in one workspace.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureList.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }} className="h-full bg-white border border-border rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-secondary mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  { title: 'Tell us about your business', desc: 'A short onboarding covers your business type, currency, and the services you need.' },
  { title: 'We connect your accounts', desc: 'Link your bank and existing tools — your finance manager takes it from there.' },
  { title: 'Your team gets to work', desc: 'Bookkeeping, reconciliation, and reporting run on a schedule you can see in the platform.' },
  { title: 'You stay in control', desc: 'Approve expenses, message your team, and watch every number update in real time.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-xl mb-14">
          <p className="text-primary text-sm font-semibold mb-3">How it works</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">From sign-up to a fully managed finance function.</h2>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="figure h-9 w-9 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  {i < steps.length - 1 && <div className="hidden md:block flex-1 h-px bg-border" />}
                </div>
                <h3 className="font-display font-semibold text-secondary mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const serviceList = [
  'Bookkeeping', 'Expense management', 'Invoicing', 'Financial reporting',
  'Tax preparation', 'Payroll', 'Account reconciliation', 'Finance consulting',
]

function Services() {
  return (
    <section id="services" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <p className="text-primary text-sm font-semibold mb-3">Finance services</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary mb-5">Pick the services you need. Add more as you grow.</h2>
          <p className="text-slate-600 leading-relaxed mb-2">
            Every plan starts with a finance manager who scopes the work with you during onboarding — you're never paying for services you didn't ask for.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-3">
            {serviceList.map(s => (
              <div key={s} className="flex items-center gap-2.5 bg-white border border-border rounded-xl px-4 py-3.5">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                <span className="text-sm font-medium text-secondary">{s}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <section className="py-24 bg-white border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-xl mb-12 mx-auto text-center">
          <p className="text-primary text-sm font-semibold mb-3">Dashboard preview</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">See your finances the way your team does.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bg-bg border border-border rounded-2xl shadow-[var(--shadow-pop)] p-4 lg:p-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Total Revenue', value: 125400, change: '+18.4%' },
                { label: 'Total Expenses', value: 68250, change: '+6.2%' },
                { label: 'Net Profit', value: 57150, change: '+24.1%' },
              ].map(c => (
                <div key={c.label} className="bg-white rounded-xl border border-border p-4">
                  <p className="text-xs text-muted mb-1">{c.label}</p>
                  <p className="figure text-xl font-bold text-secondary">{formatCurrency(c.value)}</p>
                  <p className="text-xs text-success mt-1">{c.change} vs last month</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl border border-border p-4 h-40 flex items-end gap-2">
              {[40, 55, 48, 62, 58, 74, 68, 82, 76, 90, 85, 96].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="flex-1 bg-primary/80 rounded-t"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const benefitStats = [
  { value: 128, suffix: '', label: 'Businesses managed', format: (v) => Math.round(v).toLocaleString() },
  { value: 41000000, label: 'Transactions processed', format: (v) => formatCompact(Math.round(v)) },
  { value: 99.6, label: 'On-time closing rate', format: (v) => v.toFixed(1) + '%' },
  { value: 12, label: 'Avg. hours saved / month', format: (v) => Math.round(v) + 'h' },
]

function Benefits() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-xl mb-12">
          <p className="text-primary-light text-sm font-semibold mb-3" style={{ color: '#93C5FD' }}>Why teams switch to FinPilot</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Numbers you can trust, from a team that's actually watching them.</h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="figure text-3xl sm:text-4xl font-extrabold text-white">
                <AnimatedNumber value={s.value} format={s.format} />
              </p>
              <p className="text-sm text-slate-400 mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  { quote: 'We stopped worrying about reconciliation entirely. Our finance manager catches issues before we even notice them.', name: 'Diane Foster', role: 'Founder, Acme Corp' },
  { quote: 'The monthly closing tracker alone justified the switch. We finally know where things stand without asking.', name: 'Marcus Yu', role: 'COO, Bright Homes' },
  { quote: 'It feels like we hired a finance department, not a piece of software.', name: 'Elena Vargas', role: 'CEO, Sunrise Media Group' },
]

function Testimonials() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-xl mb-14">
          <p className="text-primary text-sm font-semibold mb-3">Testimonials</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">What businesses say after handing us the books.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="h-full bg-white border border-border rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />)}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-5">"{t.quote}"</p>
                <p className="text-sm font-semibold text-secondary">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing({ navigate }) {
  return (
    <section id="pricing" className="py-24 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-xl mb-14 mx-auto text-center">
          <p className="text-primary text-sm font-semibold mb-3">Pricing</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">Simple plans that scale with your business.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subscriptionPlans.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className={`h-full rounded-2xl p-6 border flex flex-col ${p.highlighted ? 'border-primary shadow-[var(--shadow-pop)] bg-white relative' : 'border-border bg-white'}`}>
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-semibold px-3 py-1 rounded-full">Most popular</span>
                )}
                <h3 className="font-display font-semibold text-secondary">{p.name}</h3>
                <p className="text-xs text-muted mt-1.5 mb-4 h-8">{p.description}</p>
                <div className="mb-5">
                  {p.price ? (
                    <p className="figure text-3xl font-extrabold text-secondary">${p.price}<span className="text-sm font-medium text-muted">/mo</span></p>
                  ) : (
                    <p className="text-2xl font-extrabold text-secondary">Custom</p>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={p.highlighted ? 'primary' : 'outline'} className="w-full" onClick={() => navigate('/register')}>
                  {p.price ? 'Get Started' : 'Contact Sales'}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const faqs = [
  { q: 'How is this different from software like QuickBooks?', a: 'QuickBooks gives you the tools to do your own books. FinPilot gives you the tools plus a finance team that actually uses them on your behalf — you get the visibility of software with the accountability of a service.' },
  { q: 'Can I keep my existing bookkeeper?', a: 'Yes. Some clients use FinPilot for reporting and task tracking alongside an existing bookkeeper; most eventually move bookkeeping to our team once they see the workflow.' },
  { q: 'What if I only need a few services?', a: 'You choose which services you need during onboarding — bookkeeping, invoicing, reconciliation, tax prep, payroll, or any combination. Plans scale with usage, not a fixed bundle.' },
  { q: 'Is my financial data secure?', a: 'Every workspace is tenant-isolated with role-based access control and a full audit log of every change. We never share data across client organizations.' },
  { q: 'How fast is onboarding?', a: 'Most businesses are fully onboarded — accounts connected, team assigned — within 3 to 5 business days.' },
]

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section id="faq" className="py-24 bg-bg">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <Reveal className="mb-12 text-center">
          <p className="text-primary text-sm font-semibold mb-3">FAQ</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary">Questions, answered.</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="bg-white border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-secondary">{f.q}</span>
                  <motion.span animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4 text-muted shrink-0" />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIdx === i ? 'auto' : 0, opacity: openIdx === i ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA({ navigate }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <Reveal className="bg-secondary rounded-3xl px-8 py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 ledger-grid opacity-[0.15]" />
          <div className="relative">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">Ready to hand off the books?</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">Get started in minutes, or talk to a finance manager first — either way, you'll have a clear view of your finances within the week.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => navigate('/register')}>Get Started <ArrowRight className="h-4 w-4" /></Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-slate-600 hover:bg-slate-800" onClick={() => navigate('/register')}>
                Book a Consultation
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
