import { Landmark } from 'lucide-react'

const columns = [
  { title: 'Product', links: ['Features', 'How it works', 'Pricing', 'Security'] },
  { title: 'Services', links: ['Bookkeeping', 'Expense management', 'Invoicing', 'Tax preparation', 'Payroll'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'Blog'] },
  { title: 'Legal', links: ['Privacy policy', 'Terms of service', 'Security'] },
]

export default function PublicFooter() {
  return (
    <footer className="bg-secondary text-slate-300">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Landmark className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg">FinPilot</span>
          </div>
          <p className="text-sm text-slate-400 max-w-xs">
            A managed finance platform where your business gets a dedicated finance team and the software to see everything they do.
          </p>
        </div>
        {columns.map(col => (
          <div key={col.title}>
            <p className="text-white text-sm font-semibold mb-3">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map(l => (
                <li key={l}><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-700/60">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 FinPilot Financial Technologies, Inc. All rights reserved.</p>
          <p>Built for businesses who want their finances actually handled.</p>
        </div>
      </div>
    </footer>
  )
}
