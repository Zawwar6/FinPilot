# FinPilot — Finance Management SaaS Platform

A multi-tenant finance management + managed finance services platform, built with React + Vite, Tailwind CSS, Framer Motion, Recharts, React Router, and React Hook Form + Zod.

## What's included (this build)

- **Public marketing site** — hero, trusted-by, features, how-it-works, services, dashboard preview, benefits, testimonials, pricing, FAQ, CTA, footer, all with scroll animations.
- **Authentication** — login, register, forgot/reset password (mocked, no backend).
- **Onboarding** — 7-step animated flow (business info, type, currency, financial year, size, services, invite team) + success screen.
- **Client Portal** (`/app`) — dashboard with animated KPIs and charts, Transactions, Income, Expenses (with approval workflow + drag-drop receipt upload), Invoices (with PDF-style preview), Bills, Accounts, Customers (with detail view), Vendors, Reports (report builder with P&L / Balance Sheet / Cash Flow / etc.), Reconciliation (matching interface), Tasks + Monthly Closing tracker, Documents (drag & drop), Messages (chat UI), Settings (8 tabs).
- **Super Admin Portal** (`/admin`) — platform overview, client management (with detail drill-in), finance team management, subscriptions, audit logs, plus scaffolded sections for tasks/reports/documents/messages.
- **Finance Team Portal** (`/finance`) — employee workspace with "my clients" / "my tasks" / messages.
- **Design system** — light theme only, tokens in `src/index.css`, reusable UI kit in `src/components/ui` (Button, Card, Badge, Input/Select/Textarea, Modal, Toast, DataTable w/ search+sort+pagination, Skeletons, EmptyState, ConfirmDialog, AnimatedNumber).
- **Global command palette** (⌘K / Ctrl+K) searching transactions, invoices, customers, vendors, documents, tasks.
- Realistic mock data in `src/data/mockData.js` standing in for a backend.

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL. Demo login accepts any email + 6+ character password.

## What's mocked vs. real

This is a frontend-only build — there is no live database, auth server, or payment processor. Every "backend" concept (organizations, transactions, invoices, tasks, audit logs, etc.) is represented as realistic mock data in `src/data/mockData.js`, structured to map directly onto the relational schema described in the original spec (`organizations`, `transactions`, `invoices`, `tasks`, `audit_logs`, etc.) so it's straightforward to swap in real API calls later. Stripe billing is a placeholder UI in Settings → Billing with a note marking where real credentials/webhooks would go.

## Structure

```
src/
  components/ui/       reusable design-system primitives
  components/layout/   sidebar, topbar, auth layout, public nav/footer, command palette
  components/charts/   Recharts wrappers
  pages/public/        marketing site + 404
  pages/auth/          login, register, forgot/reset password
  pages/onboarding/    multi-step onboarding
  pages/client/         client portal pages
  pages/admin/          super admin portal pages
  pages/finance/         finance team portal
  data/mockData.js     mock backend
  config/nav.js        sidebar nav config per portal
  context/ToastContext.jsx
  lib/utils.js
```

## Next steps toward production

- Wire `src/data/mockData.js` reads/writes to real REST endpoints (see the `/api/*` route list in the original spec).
- Add real auth (JWT/session) and role-based route guards per the role list (SUPER_ADMIN, ADMIN, FINANCE_MANAGER, ACCOUNTANT, FINANCE_EXECUTIVE, CLIENT_OWNER, CLIENT_ADMIN, CLIENT_MEMBER).
- Code-split routes (`React.lazy`) — the single JS bundle is ~1MB minified since everything is eagerly imported right now.
- Connect Stripe for real billing in Settings → Billing.
