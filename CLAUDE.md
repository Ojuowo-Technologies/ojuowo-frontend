# CLAUDE.md — Ojúòwò Frontend

This file is the single source of truth for AI-assisted development on this repo.
Read it fully before writing any code.

---

## Project overview

**Ojúòwò** (Yoruba: "face of the business") is a multi-tenant Business OS for any
stage-based, made-to-order business — tailoring, shoe-making, bakery, farm, salon, and more.
This repo is the **frontend only**. The backend is a separate REST API project.

The product has four phases. We are building **Phase 1** (Tailoring MVP) first.
Before the app itself, we build the **Ojúòwò marketing landing page** (waitlist, one page).

Full product spec: [doc/PRD](doc/PRD)

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14+ — App Router, TypeScript strict mode |
| UI components | shadcn/ui (never write raw HTML primitives when a shadcn component exists) |
| Styling | Tailwind CSS — utility-first, no custom CSS files unless absolutely necessary |
| Data fetching | Next.js Server Components + Server Actions — no React Query or SWR |
| Auth | Bearer token stored in `localStorage`; protected via `middleware.ts` |
| Offline (worker app) | IndexedDB via `idb` + Zustand for the action queue |
| PWA | `@ducanh2912/next-pwa` |
| Hosting | Vercel |
| Language | TypeScript — `strict: true`, no `any`, no type assertions without a comment |

---

## Repo structure

```
ojuowo/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Ojúòwò marketing landing page
│   ├── (auth)/                 # Login, OTP, PIN flows
│   ├── (dashboard)/            # Owner + Manager views (web/tablet)
│   ├── worker/                 # Worker PWA (phone-first)
│   └── track/[token]/          # Customer tracking page (public, no login)
├── components/
│   ├── ui/                     # shadcn/ui primitives — do not edit these by hand
│   ├── landing/                # Marketing landing page components
│   ├── auth/
│   ├── orders/
│   ├── tasks/
│   ├── invoices/
│   ├── wages/
│   ├── customers/
│   ├── tracking/               # Public branded tracking page
│   └── shared/                 # EmptyState, OfflineBanner, SyncStatus, etc.
├── lib/
│   ├── api/                    # REST API client functions (one file per domain)
│   │   └── client.ts           # Base fetch wrapper — always use this, never raw fetch
│   ├── types/                  # TypeScript types mirroring the backend Prisma schema
│   ├── offline/                # IndexedDB store + sync queue
│   └── utils/
│       ├── money.ts            # Kobo ↔ display — always use these, never raw arithmetic
│       ├── date.ts             # UTC ↔ Africa/Lagos — always use these
│       └── roles.ts            # Permission checks matching PRD §2.2
├── hooks/                      # useOffline, useSync, useRole
├── public/                     # PWA manifest, service worker
└── middleware.ts               # Tenant subdomain resolution + route auth guard
```

---

## Conventions

### TypeScript
- Strict mode is on. No `any`. No `as X` without an explanatory comment.
- All types that model backend data live in `lib/types/`. They mirror the Prisma schema
  in `doc/PRD §14`. Do not redefine these inline.
- Use `BigInt` for all money values. Never use `number` for kobo amounts.

### Components
- One component per file. File name matches the exported component name in kebab-case
  (`order-timeline.tsx` exports `OrderTimeline`).
- Server Components by default. Add `"use client"` only when the component needs
  browser APIs, event handlers, or hooks.
- Never put business logic inside a component. Logic goes in `lib/` or a custom hook.
- Do not create a new shadcn component from scratch — run `npx shadcn@latest add <name>`.

### API calls
- All calls go through `lib/api/client.ts`. Never use `fetch` directly in a component or page.
- Each domain has its own file: `lib/api/orders.ts`, `lib/api/tasks.ts`, etc.
- The base URL is read from `NEXT_PUBLIC_API_URL` (env var). Never hardcode a URL.
- Server Actions call API functions from `lib/api/`. They never contain fetch logic themselves.

### Money
- All amounts are stored and passed as `BigInt` in kobo (smallest Naira unit).
- Always use `lib/utils/money.ts` to format for display. Never divide or multiply kobo
  values inline — the helper handles this safely.
- Never use `parseFloat` or `toFixed` on money values anywhere in this repo.

### Dates and times
- All times from the API are UTC ISO strings.
- Always use `lib/utils/date.ts` to format for display. The business timezone is
  `Africa/Lagos` by default (a business setting in the backend).
- Never call `new Date()` to display a time without going through the date utils.

### Routing and auth
- `middleware.ts` resolves the tenant from the subdomain and enforces route-level auth.
- Role-based access is enforced in `middleware.ts` and re-checked in Server Components
  via `lib/utils/roles.ts`. Never rely on hiding a UI element as the only access control.
- Route groups: `(auth)` for unauthenticated flows, `(dashboard)` for Owner/Manager,
  `worker/` for the Worker PWA. Customer tracking at `track/[token]` is fully public.

### Offline (worker app only)
- The worker app must open and show assigned tasks with no internet connection.
- Status changes made offline are stored in the IndexedDB action queue (`lib/offline/`).
- On reconnect, queued actions are replayed as individual REST calls in order.
- Every queued action carries a unique ID so a retry never creates a duplicate.
- If a task was reassigned or cancelled before the update arrives, show the **Held** state
  — do not silently overwrite or discard the queued action.
- Offline state is always communicated with **text + icon**, never color alone.

### Naming
| Thing | Convention |
|---|---|
| Files | `kebab-case.tsx` |
| Components | `PascalCase` |
| Functions and variables | `camelCase` |
| Types and interfaces | `PascalCase` |
| Constants | `SCREAMING_SNAKE_CASE` |
| API route handlers | `route.ts` inside the relevant `app/api/` folder |

---

## Roles and permissions (PRD §2.2)

There are five roles. Design and code each as a distinct experience.

| Role | Main surface | Key constraint |
|---|---|---|
| Owner | Web / tablet | Sees everything for their business |
| Manager | Web / tablet | No access to wage runs (unless owner grants it) |
| Cashier | Web / tablet | Records payments and prints receipts; views orders and invoices only |
| Worker | Phone (PWA) | Sees only their own assigned tasks |
| Customer | Phone browser (tracking link) | No login; unguessable token only |
| Platform admin | Web (internal) | Our team only; lowest design priority |

The permission matrix is in PRD §2.2. When in doubt, **deny** and add a reason.

---

## Key domain rules (from PRD — always enforce these)

- **Money is append-only.** Payments and wage lines are never edited or deleted.
  A mistake is corrected with a reversing entry.
- **Task pay is locked at approval.** `task.payKobo` is copied from the pay rate at
  the moment of approval. A later rate change never rewrites it.
- **Measurements are snapshotted at order confirmation.** `orderItem.measurementSnapshot`
  is a copy. Changes to the customer's saved measurements do not affect past orders.
- **Invoices lock when sent.** A change creates a new numbered revision; the old one
  is marked superseded.
- **Tracking tokens are unguessable.** At least 128 bits of randomness. Never expose
  the order number or any predictable ID in a customer-facing URL.
- **Task state machine is strict.** Only the transitions in PRD §5.4 are valid.
  Enforce them in the UI — never show a button for an illegal transition.
- **History is append-only.** The order timeline, activity events, and payments are
  read-only after creation. Never offer an edit or delete action on these.

---

## UI and design rules

- **Worker app: phone-first.** Large touch targets (minimum 44 × 44 px). One primary
  action per screen. Readable in bright sunlight. Test on a low-end Android device.
- **Manager / Owner: tablet and web.** Minimum supported width is tablet.
  Customer tracking page supports any phone browser width.
- **Status is never shown by color alone.** Always pair color with a text label or icon.
- **Empty states guide the next action.** A screen with no data tells the user what to do,
  not just "no items found".
- **Money is always clear.** Wherever an amount appears, show the paid amount, the
  balance, and the status consistently. Use the same layout and labels everywhere.
- **Every business feels like its own.** Customer-facing pages take the business's logo
  and brand colors. The Ojúòwò brand stays in the footer only ("Powered by Ojúòwò").
- Use shadcn/ui components before writing anything custom.
- Load the `artifact-design` skill before creating any new artifact or page template.

---

## Performance budgets (PRD §4.3.3)

| Surface | Limit |
|---|---|
| Customer tracking page | < 3 seconds on 3G, < 200 KB before photos |
| Worker app first load | < 300 KB of JavaScript (starting value) |
| Photos | Resized on device to 1 600 px long edge before upload |

A page that exceeds its budget should be flagged immediately — do not ship it.

---

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend REST API base URL (e.g. `https://api.ojuowo.com/v1`) |
| `NEXT_PUBLIC_APP_URL` | Frontend base URL (used for subdomain resolution in dev) |

Never hardcode URLs. Never commit `.env` files.

---

## What NOT to do

- Do not add React Query, SWR, Axios, or any other data-fetching library. Use Server
  Components and Server Actions.
- Do not write raw `fetch` calls outside `lib/api/client.ts`.
- Do not use `float` or `number` for money values. Always `BigInt` in kobo.
- Do not write inline styles. Use Tailwind classes.
- Do not add backend logic, database calls, or Prisma to this repo. It is frontend only.
- Do not add features or abstractions beyond what the current task requires.
- Do not add comments that explain what code does. Add a comment only when the WHY
  is non-obvious (a hidden constraint, a workaround, a subtle invariant).
- Do not use `any` or silence TypeScript errors with `@ts-ignore`.

---

## Build order reference

We build in this order. Do not skip ahead.

0. Ojúòwò marketing landing page + waitlist
1. Project setup (Next.js, Tailwind, shadcn, PWA, `lib/types/`)
2. Auth (Login → OTP → PIN, middleware)
3. Customer tracking page (`track/[token]`)
4. Worker app (task queue, task detail, offline, earnings)
5. Order intake (new order form, customer lookup, measurement sheet)
6. Order detail (timeline, task assignment, verification, rework)
7. Invoicing + payments
8. Dashboard
9. Business setup wizard + go-live checklist
10. Staff + wages
11. Business landing page editor (public page builder, Phase 1)
12. Staff payouts + business balances (Paga integration, Phase 1)
13. Priority B (reports, notifications, empty states)
