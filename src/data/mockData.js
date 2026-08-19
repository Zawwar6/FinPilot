// Central mock data source. Structured so every field maps 1:1 onto the
// database schema in the architecture doc (organizations, transactions,
// invoices, bills, customers, vendors, tasks, documents, etc).

export const currentOrg = {
  id: 'org_novatech',
  name: 'NovaTech Solutions',
  businessType: 'Software / SaaS',
  currency: 'USD',
  financialYearStart: 'January',
  plan: 'Professional',
  logoInitials: 'NT',
}

export const clientOrganizations = [
  { id: 'org_novatech', name: 'NovaTech Solutions', industry: 'Software', plan: 'Professional', status: 'Active', mrr: 149, manager: 'Ahmed Raza', health: 'Good', closingProgress: 72 },
  { id: 'org_vertex', name: 'Vertex Trading', industry: 'Import / Export', plan: 'Business', status: 'Active', mrr: 299, manager: 'Sara Malik', health: 'Attention', closingProgress: 45 },
  { id: 'org_bluepeak', name: 'BluePeak Consulting', industry: 'Professional Services', plan: 'Starter', status: 'Active', mrr: 49, manager: 'Ahmed Raza', health: 'Good', closingProgress: 100 },
  { id: 'org_urbanedge', name: 'UrbanEdge Retail', industry: 'Retail', plan: 'Business', status: 'Active', mrr: 299, manager: 'Zainab Hussain', health: 'Good', closingProgress: 88 },
  { id: 'org_atlas', name: 'Atlas Logistics', industry: 'Logistics', plan: 'Professional', status: 'Past Due', mrr: 149, manager: 'Sara Malik', health: 'At Risk', closingProgress: 20 },
  { id: 'org_techcorp', name: 'Tech Corp', industry: 'IT Services', plan: 'Enterprise', status: 'Active', mrr: 899, manager: 'Zainab Hussain', health: 'Good', closingProgress: 65 },
]

export const kpis = {
  revenue: { value: 125400, change: 18.4, trend: 'up' },
  expenses: { value: 68250, change: 6.2, trend: 'up' },
  netProfit: { value: 57150, change: 24.1, trend: 'up' },
  receivables: { value: 32800, change: -8.3, trend: 'down' },
}

export const revenueExpenseSeries = [
  { month: 'Feb', revenue: 78000, expenses: 52000 },
  { month: 'Mar', revenue: 84500, expenses: 55200 },
  { month: 'Apr', revenue: 91200, expenses: 58400 },
  { month: 'May', revenue: 88700, expenses: 61000 },
  { month: 'Jun', revenue: 102300, expenses: 63500 },
  { month: 'Jul', revenue: 114800, expenses: 65900 },
  { month: 'Aug', revenue: 125400, expenses: 68250 },
]

export const profitTrend = revenueExpenseSeries.map(d => ({ month: d.month, profit: d.revenue - d.expenses }))

export const expenseBreakdown = [
  { category: 'Salaries', value: 34200, color: '#2563EB' },
  { category: 'Marketing', value: 9800, color: '#16A34A' },
  { category: 'Software', value: 7100, color: '#F59E0B' },
  { category: 'Rent', value: 6200, color: '#DC2626' },
  { category: 'Utilities', value: 3400, color: '#8B5CF6' },
  { category: 'Operations', value: 4950, color: '#0EA5E9' },
  { category: 'Other', value: 2600, color: '#64748B' },
]

export const cashFlowSeries = revenueExpenseSeries.map(d => ({ month: d.month, inflow: d.revenue, outflow: d.expenses }))

export const accounts = [
  { id: 'acc_1', name: 'Business Checking', type: 'Bank', balance: 48250.32, institution: 'Chase', last4: '4471' },
  { id: 'acc_2', name: 'Payroll Account', type: 'Bank', balance: 12980.00, institution: 'Chase', last4: '8823' },
  { id: 'acc_3', name: 'Petty Cash', type: 'Cash', balance: 640.00, institution: '—', last4: null },
  { id: 'acc_4', name: 'Corporate Card', type: 'Credit Card', balance: -3420.55, institution: 'Amex', last4: '1092' },
  { id: 'acc_5', name: 'Reserve Savings', type: 'Savings', balance: 85000.00, institution: 'Chase', last4: '5510' },
]

export const transactions = [
  { id: 'txn_1001', date: '2026-08-15', description: 'Client payment - Acme Corp', category: 'Sales', account: 'Business Checking', type: 'Income', amount: 12500, status: 'Completed', customer: 'Acme Corp' },
  { id: 'txn_1002', date: '2026-08-14', description: 'AWS Cloud Infrastructure', category: 'Software', account: 'Corporate Card', type: 'Expense', amount: -1840.22, status: 'Completed', vendor: 'Amazon Web Services' },
  { id: 'txn_1003', date: '2026-08-14', description: 'Payroll - August (1st half)', category: 'Salaries', account: 'Payroll Account', type: 'Expense', amount: -17200, status: 'Reconciled', vendor: 'Internal' },
  { id: 'txn_1004', date: '2026-08-13', description: 'Client payment - Bright Homes', category: 'Sales', account: 'Business Checking', type: 'Income', amount: 8200, status: 'Completed', customer: 'Bright Homes LLC' },
  { id: 'txn_1005', date: '2026-08-12', description: 'Office rent - August', category: 'Rent', account: 'Business Checking', type: 'Expense', amount: -6200, status: 'Completed', vendor: 'Meridian Properties' },
  { id: 'txn_1006', date: '2026-08-11', description: 'Google Workspace subscription', category: 'Software', account: 'Corporate Card', type: 'Expense', amount: -312.00, status: 'Pending', vendor: 'Google' },
  { id: 'txn_1007', date: '2026-08-10', description: 'Client payment - Sunrise Media', category: 'Sales', account: 'Business Checking', type: 'Income', amount: 5400, status: 'Completed', customer: 'Sunrise Media Group' },
  { id: 'txn_1008', date: '2026-08-09', description: 'Facebook Ads campaign', category: 'Marketing', account: 'Corporate Card', type: 'Expense', amount: -2100.75, status: 'Completed', vendor: 'Meta Platforms' },
  { id: 'txn_1009', date: '2026-08-08', description: 'Transfer to Reserve Savings', category: 'Transfer', account: 'Business Checking', type: 'Transfer', amount: -10000, status: 'Completed', vendor: 'Internal' },
  { id: 'txn_1010', date: '2026-08-07', description: 'Freelance design - Acme Corp', category: 'Sales', account: 'Business Checking', type: 'Income', amount: 3600, status: 'Failed', customer: 'Acme Corp' },
  { id: 'txn_1011', date: '2026-08-06', description: 'Electricity bill', category: 'Utilities', account: 'Business Checking', type: 'Expense', amount: -540.10, status: 'Completed', vendor: 'City Power Co' },
  { id: 'txn_1012', date: '2026-08-05', description: 'Client payment - Northline Retail', category: 'Sales', account: 'Business Checking', type: 'Income', amount: 15800, status: 'Completed', customer: 'Northline Retail' },
]

export const customers = [
  { id: 'cus_1', name: 'Acme Corp', contact: 'Diane Foster', email: 'diane@acmecorp.com', phone: '+1 415 555 0182', address: 'San Francisco, CA', totalRevenue: 84200, outstanding: 6200, status: 'Active' },
  { id: 'cus_2', name: 'Bright Homes LLC', contact: 'Marcus Yu', email: 'marcus@brighthomes.com', phone: '+1 312 555 0117', address: 'Chicago, IL', totalRevenue: 52300, outstanding: 0, status: 'Active' },
  { id: 'cus_3', name: 'Sunrise Media Group', contact: 'Elena Vargas', email: 'elena@sunrisemedia.com', phone: '+1 646 555 0199', address: 'New York, NY', totalRevenue: 31900, outstanding: 5400, status: 'Active' },
  { id: 'cus_4', name: 'Northline Retail', contact: 'Tom Baird', email: 'tom@northlineretail.com', phone: '+1 206 555 0143', address: 'Seattle, WA', totalRevenue: 61250, outstanding: 15800, status: 'Active' },
  { id: 'cus_5', name: 'Cedar & Co', contact: 'Priya Nair', email: 'priya@cedarco.com', phone: '+1 512 555 0161', address: 'Austin, TX', totalRevenue: 18400, outstanding: 2100, status: 'Inactive' },
]

export const vendors = [
  { id: 'ven_1', name: 'Amazon Web Services', contact: 'Billing Team', email: 'billing@aws.com', phone: '—', address: 'Seattle, WA', totalExpenses: 22800, outstanding: 1840.22, status: 'Active' },
  { id: 'ven_2', name: 'Meridian Properties', contact: 'Frank Lo', email: 'frank@meridianprops.com', phone: '+1 415 555 0110', address: 'San Francisco, CA', totalExpenses: 74400, outstanding: 0, status: 'Active' },
  { id: 'ven_3', name: 'Meta Platforms', contact: 'Ads Support', email: 'ads-billing@meta.com', phone: '—', address: 'Menlo Park, CA', totalExpenses: 25200, outstanding: 2100.75, status: 'Active' },
  { id: 'ven_4', name: 'City Power Co', contact: 'Utility Billing', email: 'billing@citypower.com', phone: '+1 415 555 0199', address: 'San Francisco, CA', totalExpenses: 6480, outstanding: 540.10, status: 'Active' },
]

export const invoices = [
  { id: 'INV-1023', customer: 'Northline Retail', issueDate: '2026-08-01', dueDate: '2026-08-15', amount: 15800, status: 'Overdue', items: [{ desc: 'Consulting - July', qty: 1, price: 15800 }] },
  { id: 'INV-1022', customer: 'Acme Corp', issueDate: '2026-08-05', dueDate: '2026-08-19', amount: 6200, status: 'Sent', items: [{ desc: 'Design retainer - August', qty: 1, price: 6200 }] },
  { id: 'INV-1021', customer: 'Sunrise Media Group', issueDate: '2026-08-02', dueDate: '2026-08-16', amount: 5400, status: 'Viewed', items: [{ desc: 'Video production', qty: 1, price: 5400 }] },
  { id: 'INV-1020', customer: 'Bright Homes LLC', issueDate: '2026-07-28', dueDate: '2026-08-11', amount: 8200, status: 'Paid', items: [{ desc: 'Renovation consulting', qty: 1, price: 8200 }] },
  { id: 'INV-1019', customer: 'Cedar & Co', issueDate: '2026-07-20', dueDate: '2026-08-03', amount: 2100, status: 'Partially Paid', items: [{ desc: 'Brand strategy session', qty: 1, price: 2100 }] },
  { id: 'INV-1018', customer: 'Acme Corp', issueDate: '2026-07-10', dueDate: '2026-07-24', amount: 3600, status: 'Draft', items: [{ desc: 'Freelance design hours', qty: 12, price: 300 }] },
]

export const bills = [
  { id: 'BILL-4410', vendor: 'Amazon Web Services', date: '2026-08-14', dueDate: '2026-08-28', amount: 1840.22, category: 'Software', status: 'Pending' },
  { id: 'BILL-4409', vendor: 'Meta Platforms', date: '2026-08-09', dueDate: '2026-08-23', amount: 2100.75, category: 'Marketing', status: 'Approved' },
  { id: 'BILL-4408', vendor: 'City Power Co', date: '2026-08-06', dueDate: '2026-08-20', amount: 540.10, category: 'Utilities', status: 'Overdue' },
  { id: 'BILL-4407', vendor: 'Meridian Properties', date: '2026-08-01', dueDate: '2026-08-05', amount: 6200.00, category: 'Rent', status: 'Paid' },
]

export const expenses = [
  { id: 'exp_1', date: '2026-08-14', vendor: 'Amazon Web Services', category: 'Software', amount: 1840.22, tax: 0, paymentMethod: 'Corporate Card', status: 'Approved' },
  { id: 'exp_2', date: '2026-08-11', vendor: 'Google', category: 'Software', amount: 312.00, tax: 0, paymentMethod: 'Corporate Card', status: 'Pending Review' },
  { id: 'exp_3', date: '2026-08-09', vendor: 'Meta Platforms', category: 'Marketing', amount: 2100.75, tax: 0, paymentMethod: 'Corporate Card', status: 'Approved' },
  { id: 'exp_4', date: '2026-08-06', vendor: 'City Power Co', category: 'Utilities', amount: 540.10, tax: 12.40, paymentMethod: 'Bank Transfer', status: 'Approved' },
  { id: 'exp_5', date: '2026-08-02', vendor: 'Staples', category: 'Operations', amount: 184.60, tax: 9.20, paymentMethod: 'Corporate Card', status: 'Draft' },
]

export const tasks = [
  { id: 'task_1', title: 'Collect August bank statements', client: 'NovaTech Solutions', assignee: 'Ahmed Raza', priority: 'High', dueDate: '2026-08-20', status: 'Completed' },
  { id: 'task_2', title: 'Reconcile Business Checking', client: 'NovaTech Solutions', assignee: 'Ahmed Raza', priority: 'High', dueDate: '2026-08-21', status: 'In Progress' },
  { id: 'task_3', title: 'Verify outstanding invoices', client: 'NovaTech Solutions', assignee: 'Sara Malik', priority: 'Medium', dueDate: '2026-08-22', status: 'Todo' },
  { id: 'task_4', title: 'Prepare draft P&L statement', client: 'NovaTech Solutions', assignee: 'Ahmed Raza', priority: 'Medium', dueDate: '2026-08-25', status: 'Todo' },
  { id: 'task_5', title: 'Review Vertex Trading expenses', client: 'Vertex Trading', assignee: 'Sara Malik', priority: 'High', dueDate: '2026-08-19', status: 'Review' },
  { id: 'task_6', title: 'Send monthly report to Tech Corp', client: 'Tech Corp', assignee: 'Zainab Hussain', priority: 'Low', dueDate: '2026-08-24', status: 'Todo' },
]

export const closingChecklist = [
  { label: 'Transactions', done: true },
  { label: 'Bank Reconciliation', done: true },
  { label: 'Expenses', done: true },
  { label: 'Invoices', done: true },
  { label: 'Bills', done: true },
  { label: 'Tax Review', done: false },
  { label: 'Financial Reports', done: false },
  { label: 'Client Approval', done: false },
]

export const documents = [
  { id: 'doc_1', name: 'Chase Statement - July 2026.pdf', category: 'Bank Statements', size: '412 KB', uploadedBy: 'Ahmed Raza', date: '2026-08-02' },
  { id: 'doc_2', name: 'AWS Invoice #88213.pdf', category: 'Invoices', size: '96 KB', uploadedBy: 'System', date: '2026-08-14' },
  { id: 'doc_3', name: 'Office Lease Agreement.pdf', category: 'Contracts', size: '1.2 MB', uploadedBy: 'Ahmed Raza', date: '2026-06-01' },
  { id: 'doc_4', name: 'Q2 Tax Filing.pdf', category: 'Tax Documents', size: '640 KB', uploadedBy: 'Sara Malik', date: '2026-07-15' },
  { id: 'doc_5', name: 'Payroll Summary - July.xlsx', category: 'Payroll', size: '58 KB', uploadedBy: 'Ahmed Raza', date: '2026-07-31' },
]

export const messages = [
  { id: 'm1', from: 'client', author: 'You', text: 'Can you review the Northline Retail invoice? It looks like it might be overdue.', time: '9:12 AM' },
  { id: 'm2', from: 'team', author: 'Ahmed Raza', text: "Sure, checking now — I'll follow up with them directly and confirm receipt.", time: '9:18 AM' },
  { id: 'm3', from: 'team', author: 'Ahmed Raza', text: 'Confirmed: it\'s 4 days overdue. I\'ve sent a reminder and flagged it in your AR report.', time: '9:24 AM' },
  { id: 'm4', from: 'client', author: 'You', text: 'Perfect, thank you! Also — is the August reconciliation on track?', time: '9:31 AM' },
  { id: 'm5', from: 'team', author: 'Ahmed Raza', text: "Yes, we're at 72% through the closing checklist. On pace for the 28th.", time: '9:33 AM' },
]

export const notifications = [
  { id: 'n1', title: 'Invoice overdue', body: 'INV-1023 for Northline Retail is 4 days overdue.', time: '2h ago', type: 'warning', unread: true },
  { id: 'n2', title: 'Expense needs approval', body: 'Google Workspace subscription ($312.00) is pending review.', time: '5h ago', type: 'info', unread: true },
  { id: 'n3', title: 'Report ready', body: 'Your July Profit & Loss statement has been generated.', time: '1d ago', type: 'success', unread: false },
  { id: 'n4', title: 'New message', body: 'Ahmed Raza replied in Messages.', time: '1d ago', type: 'info', unread: false },
  { id: 'n5', title: 'Reconciliation issue', body: '3 discrepancies found in Business Checking.', time: '2d ago', type: 'danger', unread: false },
]

export const financeTeam = [
  { id: 'emp_1', name: 'Ahmed Raza', role: 'Finance Manager', department: 'Client Operations', clients: 12, tasks: 38, pending: 7, status: 'Active' },
  { id: 'emp_2', name: 'Sara Malik', role: 'Accountant', department: 'Client Operations', clients: 9, tasks: 26, pending: 4, status: 'Active' },
  { id: 'emp_3', name: 'Zainab Hussain', role: 'Finance Executive', department: 'Client Operations', clients: 7, tasks: 19, pending: 2, status: 'Active' },
  { id: 'emp_4', name: 'Omar Siddiqui', role: 'Accountant', department: 'Client Operations', clients: 6, tasks: 15, pending: 1, status: 'On Leave' },
]

export const auditLogs = [
  { id: 'al1', actor: 'Ahmed Raza', action: 'updated Invoice #INV-1023', time: '18 Aug 2026 — 10:42 AM' },
  { id: 'al2', actor: 'Sara Malik', action: 'approved Expense — Meta Platforms ($2,100.75)', time: '18 Aug 2026 — 09:15 AM' },
  { id: 'al3', actor: 'System', action: 'reconciled Business Checking (Aug 1 – Aug 14)', time: '17 Aug 2026 — 11:30 PM' },
  { id: 'al4', actor: 'You', action: 'uploaded Chase Statement - July 2026.pdf', time: '02 Aug 2026 — 03:02 PM' },
  { id: 'al5', actor: 'Ahmed Raza', action: 'changed permission — Sara Malik → Accountant', time: '30 Jul 2026 — 04:51 PM' },
]

export const subscriptionPlans = [
  { id: 'starter', name: 'Starter', price: 49, period: 'month', description: 'For early-stage teams getting their books in order.', features: ['Up to 100 transactions/mo', 'Monthly bookkeeping', 'Basic reports', 'Email support'] },
  { id: 'professional', name: 'Professional', price: 149, period: 'month', description: 'For growing businesses that need a real finance function.', features: ['Up to 1,000 transactions/mo', 'Weekly bookkeeping', 'Full financial reports', 'Invoicing & bill pay', 'Priority support'], highlighted: true },
  { id: 'business', name: 'Business', price: 299, period: 'month', description: 'For established businesses with complex operations.', features: ['Unlimited transactions', 'Dedicated finance manager', 'Reconciliation & tax review', 'Custom report builder', 'Phone + priority support'] },
  { id: 'enterprise', name: 'Enterprise', price: null, period: null, description: 'For multi-entity organizations with custom needs.', features: ['Everything in Business', 'Multi-entity consolidation', 'Custom integrations', 'Dedicated account team', 'SLA-backed support'] },
]

export const adminKpis = {
  totalClients: { value: 128, change: 9.6 },
  activeClients: { value: 121, change: 4.2 },
  monthlyRevenue: { value: 28450, change: 12.8 },
  pendingTasks: { value: 47, change: -6.1 },
}

export const clientGrowthSeries = [
  { month: 'Feb', clients: 88 }, { month: 'Mar', clients: 94 }, { month: 'Apr', clients: 101 },
  { month: 'May', clients: 106 }, { month: 'Jun', clients: 113 }, { month: 'Jul', clients: 120 }, { month: 'Aug', clients: 128 },
]
