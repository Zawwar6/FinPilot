import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from '@/context/ToastContext'

import PublicNavbar from '@/components/layout/PublicNavbar'
import PublicFooter from '@/components/layout/PublicFooter'
import Home from '@/pages/public/Home'

import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import Onboarding from '@/pages/onboarding/Onboarding'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { clientNav, adminNav, financeNav } from '@/config/nav'
import { LayoutDashboard, ArrowLeftRight, FileText, ListChecks } from 'lucide-react'

import Dashboard from '@/pages/client/Dashboard'
import Transactions from '@/pages/client/Transactions'
import Income from '@/pages/client/Income'
import Expenses from '@/pages/client/Expenses'
import Invoices from '@/pages/client/Invoices'
import Bills from '@/pages/client/Bills'
import Accounts from '@/pages/client/Accounts'
import Customers from '@/pages/client/Customers'
import Vendors from '@/pages/client/Vendors'
import Reports from '@/pages/client/Reports'
import Reconciliation from '@/pages/client/Reconciliation'
import Tasks from '@/pages/client/Tasks'
import Documents from '@/pages/client/Documents'
import Messages from '@/pages/client/Messages'
import Settings from '@/pages/client/Settings'

import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminClients from '@/pages/admin/AdminClients'
import AdminTeam from '@/pages/admin/AdminTeam'
import AdminSubscriptions from '@/pages/admin/AdminSubscriptions'
import AdminAuditLogs from '@/pages/admin/AdminAuditLogs'
import AdminGeneric from '@/pages/admin/AdminGeneric'

import FinanceWorkspace from '@/pages/finance/FinanceWorkspace'

import NotFound from '@/pages/public/NotFound'

const clientUser = { name: 'Jordan Reeves', email: 'jordan@novatechsolutions.com' }
const adminUser = { name: 'Ahmed Raza', email: 'ahmed@finpilot.com' }
const financeUser = { name: 'Ahmed Raza', email: 'ahmed@finpilot.com' }

const clientBottomNav = [
  { label: 'Home', path: '/app', icon: LayoutDashboard, end: true },
  { label: 'Transactions', path: '/app/transactions', icon: ArrowLeftRight },
  { label: 'Invoices', path: '/app/invoices', icon: FileText },
  { label: 'Tasks', path: '/app/tasks', icon: ListChecks },
]

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public marketing site */}
          <Route path="/" element={<PublicSite><Home /></PublicSite>} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Onboarding */}
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Client Portal */}
          <Route path="/app" element={<DashboardLayout nav={clientNav} user={clientUser} brand="FinPilot" bottomNavItems={clientBottomNav} />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="income" element={<Income />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="bills" element={<Bills />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="customers" element={<Customers />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reconciliation" element={<Reconciliation />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="documents" element={<Documents />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Super Admin Portal */}
          <Route path="/admin" element={<DashboardLayout nav={adminNav} user={adminUser} brand="FinPilot Admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="tasks" element={<AdminGeneric title="Tasks" description="All finance tasks across every client." />} />
            <Route path="reports" element={<AdminGeneric title="Reports" description="Cross-client financial and operational reporting." />} />
            <Route path="subscriptions" element={<AdminSubscriptions />} />
            <Route path="documents" element={<AdminGeneric title="Documents" description="Documents uploaded across all client workspaces." />} />
            <Route path="messages" element={<AdminGeneric title="Messages" description="Conversations across every client workspace." />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
            <Route path="settings" element={<AdminGeneric title="Platform Settings" description="Global configuration for the FinPilot platform." />} />
          </Route>

          {/* Finance Team Portal */}
          <Route path="/finance" element={<DashboardLayout nav={financeNav} user={financeUser} brand="FinPilot Team" />}>
            <Route index element={<FinanceWorkspace />} />
            <Route path="clients" element={<FinanceWorkspace view="clients" />} />
            <Route path="tasks" element={<FinanceWorkspace view="tasks" />} />
            <Route path="messages" element={<FinanceWorkspace view="messages" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

function PublicSite({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  )
}
