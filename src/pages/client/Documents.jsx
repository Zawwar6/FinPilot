import { useState } from 'react'
import { motion } from 'framer-motion'
import { FolderOpen, UploadCloud, FileText, Download, Trash2, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { RowMenu } from '@/components/ui/DataTable'
import { documents as initialDocuments } from '@/data/mockData'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/context/ToastContext'

const categories = ['All', 'Bank Statements', 'Invoices', 'Receipts', 'Tax Documents', 'Contracts', 'Payroll', 'Financial Reports', 'Other']

export default function Documents() {
  const toast = useToast()
  const [rows, setRows] = useState(initialDocuments)
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const filtered = rows.filter(d =>
    (category === 'All' || d.category === category) &&
    d.name.toLowerCase().includes(query.toLowerCase())
  )

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    setRows(r => [{ id: 'doc_' + Math.random().toString(36).slice(2, 6), name: file.name, category: 'Other', size: `${Math.round(file.size / 1024)} KB`, uploadedBy: 'You', date: '2026-08-19' }, ...r])
    toast({ title: 'Document uploaded.', variant: 'success' })
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">Documents</h1>
        <p className="text-sm text-muted mt-1">Statements, receipts, contracts, and tax documents, organized.</p>
      </div>

      <motion.div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl py-10 text-center transition-colors ${dragOver ? 'border-primary bg-primary-light' : 'border-border bg-white'}`}
      >
        <UploadCloud className={`h-7 w-7 ${dragOver ? 'text-primary' : 'text-muted'}`} />
        <p className="text-sm text-secondary font-medium">Drag & drop files to upload</p>
        <p className="text-xs text-muted">or click to browse from your computer</p>
        <input type="file" className="hidden" id="doc-upload" onChange={e => {
          const file = e.target.files?.[0]
          if (!file) return
          setRows(r => [{ id: 'doc_' + Math.random().toString(36).slice(2, 6), name: file.name, category: 'Other', size: `${Math.round(file.size / 1024)} KB`, uploadedBy: 'You', date: '2026-08-19' }, ...r])
          toast({ title: 'Document uploaded.', variant: 'success' })
        }} />
        <label htmlFor="doc-upload" className="text-xs text-primary font-medium cursor-pointer hover:underline mt-1">Browse files</label>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === c ? 'bg-primary text-white' : 'bg-white border border-border text-slate-600 hover:bg-slate-50'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search documents..." className="w-full h-9 rounded-lg border border-border bg-white pl-9 pr-3 text-sm focus-ring focus:border-primary" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent><EmptyState icon={FolderOpen} title="No documents found" description="Try a different category or search term, or upload a new document." /></CardContent></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="hover:shadow-[var(--shadow-card-hover)]">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <RowMenu items={[
                      { label: 'Download', icon: Download, onClick: () => toast({ title: 'Downloading...', variant: 'info' }) },
                      { label: 'Delete', icon: Trash2, danger: true, onClick: () => { setRows(r => r.filter(x => x.id !== d.id)); toast({ title: 'Document deleted', variant: 'success' }) } },
                    ]} />
                  </div>
                  <p className="text-sm font-medium text-secondary truncate">{d.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="neutral">{d.category}</Badge>
                    <span className="text-xs text-muted">{d.size}</span>
                  </div>
                  <p className="text-xs text-muted mt-2">Uploaded by {d.uploadedBy} · {formatDate(d.date)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
