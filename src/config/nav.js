import {
  LayoutDashboard, ArrowLeftRight, TrendingUp, TrendingDown, FileText, Receipt,
  Users, Building2, Landmark, BarChart3, GitCompareArrows, ListChecks, FolderOpen,
  MessageSquare, Settings, Briefcase, ClipboardList, CreditCard, ShieldCheck, LayoutGrid,
} from 'lucide-react'

export const clientNav = [
  { section: null, items: [{ label: 'Overview', icon: LayoutDashboard, path: '/app' }] },
  {
    section: 'Finance',
    items: [
      { label: 'Transactions', icon: ArrowLeftRight, path: '/app/transactions' },
      { label: 'Income', icon: TrendingUp, path: '/app/income' },
      { label: 'Expenses', icon: TrendingDown, path: '/app/expenses' },
      { label: 'Invoices', icon: FileText, path: '/app/invoices' },
      { label: 'Bills', icon: Receipt, path: '/app/bills' },
      { label: 'Accounts', icon: Landmark, path: '/app/accounts' },
    ],
  },
  {
    section: 'Contacts',
    items: [
      { label: 'Customers', icon: Users, path: '/app/customers' },
      { label: 'Vendors', icon: Building2, path: '/app/vendors' },
    ],
  },
  {
    section: null,
    items: [
      { label: 'Reports', icon: BarChart3, path: '/app/reports' },
      { label: 'Reconciliation', icon: GitCompareArrows, path: '/app/reconciliation' },
      { label: 'Tasks', icon: ListChecks, path: '/app/tasks' },
      { label: 'Documents', icon: FolderOpen, path: '/app/documents' },
      { label: 'Messages', icon: MessageSquare, path: '/app/messages' },
      { label: 'Settings', icon: Settings, path: '/app/settings' },
    ],
  },
]

export const adminNav = [
  { section: null, items: [{ label: 'Overview', icon: LayoutDashboard, path: '/admin' }] },
  {
    section: null,
    items: [
      { label: 'Clients', icon: Briefcase, path: '/admin/clients' },
      { label: 'Finance Team', icon: Users, path: '/admin/team' },
      { label: 'Tasks', icon: ClipboardList, path: '/admin/tasks' },
      { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
      { label: 'Subscriptions', icon: CreditCard, path: '/admin/subscriptions' },
      { label: 'Documents', icon: FolderOpen, path: '/admin/documents' },
      { label: 'Messages', icon: MessageSquare, path: '/admin/messages' },
      { label: 'Audit Logs', icon: ShieldCheck, path: '/admin/audit-logs' },
      { label: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
  },
]

export const financeNav = [
  { section: null, items: [{ label: 'My Workspace', icon: LayoutGrid, path: '/finance' }] },
  {
    section: null,
    items: [
      { label: 'My Clients', icon: Briefcase, path: '/finance/clients' },
      { label: 'My Tasks', icon: ClipboardList, path: '/finance/tasks' },
      { label: 'Messages', icon: MessageSquare, path: '/finance/messages' },
    ],
  },
]
