"use client"

import React from "react"
import Link from "next/link"

// ── Illustrations ─────────────────────────────────────────────────────
const ILLUSTRATIONS: Record<string, React.ReactElement> = {
  orders: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="20" fill="#F0EDFF" />
      <rect x="22" y="18" width="36" height="44" rx="6" fill="#DDD6FE" />
      <rect x="28" y="26" width="24" height="3" rx="1.5" fill="#8B5CF6" />
      <rect x="28" y="33" width="18" height="3" rx="1.5" fill="#A78BFA" />
      <rect x="28" y="40" width="21" height="3" rx="1.5" fill="#A78BFA" />
      <rect x="28" y="47" width="14" height="3" rx="1.5" fill="#C4B5FD" />
      <circle cx="55" cy="55" r="12" fill="#5B4CF5" />
      <path d="M50 55h10M55 50v10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  tasks: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="20" fill="#F0EDFF" />
      <rect x="20" y="22" width="40" height="8" rx="4" fill="#DDD6FE" />
      <rect x="20" y="36" width="40" height="8" rx="4" fill="#DDD6FE" />
      <rect x="20" y="50" width="28" height="8" rx="4" fill="#EDE9FE" />
      <circle cx="25" cy="26" r="3" fill="#5B4CF5" />
      <path d="M23.5 26l1.2 1.2 2.3-2.3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25" cy="40" r="3" fill="#A78BFA" />
      <circle cx="25" cy="54" r="3" fill="#DDD6FE" stroke="#C4B5FD" strokeWidth="1.5" />
    </svg>
  ),
  staff: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="20" fill="#F0EDFF" />
      <circle cx="32" cy="30" r="9" fill="#DDD6FE" />
      <path d="M18 56c0-7.73 6.27-14 14-14s14 6.27 14 14" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="54" cy="34" r="7" fill="#EDE9FE" />
      <path d="M43 56c0-6.08 4.92-11 11-11" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="54" cy="54" r="10" fill="#5B4CF5" />
      <path d="M50 54h8M54 50v8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  customers: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="20" fill="#F0EDFF" />
      <circle cx="40" cy="30" r="12" fill="#DDD6FE" />
      <path d="M20 62c0-11.05 8.95-20 20-20s20 8.95 20 20" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="52" y="20" width="16" height="16" rx="8" fill="#5B4CF5" />
      <path d="M57 28h6M60 25v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  invoices: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="20" fill="#F0EDFF" />
      <rect x="20" y="14" width="34" height="44" rx="6" fill="#DDD6FE" />
      <rect x="20" y="14" width="34" height="12" rx="6" fill="#A78BFA" />
      <rect x="20" y="20" width="34" height="6" fill="#A78BFA" />
      <rect x="26" y="34" width="22" height="2.5" rx="1.25" fill="#8B5CF6" />
      <rect x="26" y="40" width="16" height="2.5" rx="1.25" fill="#C4B5FD" />
      <rect x="26" y="46" width="19" height="2.5" rx="1.25" fill="#C4B5FD" />
      <rect x="36" y="52" width="9" height="2.5" rx="1.25" fill="#8B5CF6" />
      <circle cx="58" cy="58" r="10" fill="#16a34a" />
      <path d="M54.5 58l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  wages: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="20" fill="#F0EDFF" />
      <rect x="16" y="28" width="48" height="30" rx="8" fill="#DDD6FE" />
      <rect x="16" y="28" width="48" height="12" rx="8" fill="#A78BFA" />
      <rect x="16" y="34" width="48" height="6" fill="#A78BFA" />
      <circle cx="40" cy="47" r="7" fill="#fff" />
      <path d="M37.5 47h5M40 44v6" stroke="#5B4CF5" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="22" y="22" width="8" height="12" rx="4" fill="#5B4CF5" />
      <rect x="50" y="22" width="8" height="12" rx="4" fill="#5B4CF5" />
    </svg>
  ),
  search: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="20" fill="#F3F4F6" />
      <circle cx="36" cy="36" r="16" stroke="#D1D5DB" strokeWidth="3" fill="none" />
      <path d="M48 48l10 10" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <path d="M31 36h10M36 31v10" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  ready: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="20" fill="#F0EDFF" />
      <rect x="18" y="30" width="44" height="28" rx="8" fill="#DDD6FE" />
      <path d="M18 44h44" stroke="#A78BFA" strokeWidth="1.5" />
      <rect x="30" y="22" width="8" height="12" rx="4" fill="#5B4CF5" />
      <rect x="42" y="22" width="8" height="12" rx="4" fill="#5B4CF5" />
      <circle cx="40" cy="49" r="8" fill="#5B4CF5" />
      <path d="M36.5 49l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

// ── Types ─────────────────────────────────────────────────────────────
export type EmptyVariant = keyof typeof ILLUSTRATIONS | "generic"

export interface EmptyStateAction {
  label: string
  href?: string
  onClick?: () => void
}

export interface EmptyStateProps {
  variant?: EmptyVariant
  illustration?: React.ReactNode
  title?: string
  description?: string
  action?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  size?: "sm" | "md"
}

const DEFAULT_CONFIGS: Record<EmptyVariant, Partial<EmptyStateProps>> = {
  orders: {
    title: "No Orders Yet",
    description: "Create your first order to get started. Add a customer, pick their garments, and assign tasks to your team.",
    action: { label: "Create New Order", href: "/dashboard/orders/new" },
  },
  tasks: {
    title: "No Tasks Assigned",
    description: "You have no tasks right now. Check back later or ask your manager if something is pending.",
  },
  staff: {
    title: "No Staff Members Yet",
    description: "Invite your first worker, manager, or cashier. They will receive a WhatsApp message to set up their account.",
    action: { label: "Invite Staff", href: "/dashboard/staff/invite" },
  },
  customers: {
    title: "No Customers Yet",
    description: "Customers are added automatically when you create their first order. Create an order to get started.",
    action: { label: "Create New Order", href: "/dashboard/orders/new" },
  },
  invoices: {
    title: "No Invoices Yet",
    description: "Invoices are generated from orders. Once an order is confirmed, you can create and send an invoice.",
    action: { label: "View Orders", href: "/dashboard/orders" },
  },
  wages: {
    title: "No Pay Runs Yet",
    description: "Run your first payroll to calculate and record what your workers have earned this pay period.",
    action: { label: "Run Payroll", href: "/dashboard/wages/run" },
  },
  search: {
    title: "No Results Found",
    description: "Nothing matches your search. Try different keywords or clear the filter.",
  },
  ready: {
    title: "Your Workspace is Ready",
    description: "Setup is complete. Create your first order and your team will be notified automatically.",
    action: { label: "Create New Order", href: "/dashboard/orders/new" },
    secondaryAction: { label: "View My Page", href: "/dashboard/my-page" },
  },
  generic: {
    title: "Nothing Here Yet",
    description: "There is nothing to show at the moment.",
  },
}

// ── Component ─────────────────────────────────────────────────────────
export function EmptyState({
  variant = "generic",
  illustration,
  title,
  description,
  action,
  secondaryAction,
  size = "md",
}: EmptyStateProps) {
  const defaults = DEFAULT_CONFIGS[variant] ?? {}
  const resolvedTitle = title ?? defaults.title ?? "Nothing Here"
  const resolvedDesc  = description ?? defaults.description ?? ""
  const resolvedAction = action ?? defaults.action
  const resolvedSecondary = secondaryAction ?? defaults.secondaryAction
  const resolvedIllustration = illustration ?? (variant in ILLUSTRATIONS ? ILLUSTRATIONS[variant as keyof typeof ILLUSTRATIONS] : null)

  const isSmall = size === "sm"

  function ActionButton({ act, primary }: { act: EmptyStateAction; primary: boolean }) {
    const style: React.CSSProperties = {
      display: "inline-flex", alignItems: "center",
      height: isSmall ? 36 : 42,
      padding: isSmall ? "0 16px" : "0 22px",
      borderRadius: 10,
      fontFamily: "var(--font-jakarta)",
      fontSize: isSmall ? "0.8rem" : "0.875rem",
      fontWeight: 600,
      cursor: "pointer",
      textDecoration: "none",
      border: "none",
      transition: "opacity 0.15s",
      boxShadow: "none",
      ...(primary
        ? { background: "var(--color-accent)", color: "#fff" }
        : { background: "var(--color-accent-muted)", color: "var(--color-accent)" }),
    }

    if (act.href) {
      return <Link href={act.href} style={style}>{act.label}</Link>
    }
    return (
      <button onClick={act.onClick} style={style}>{act.label}</button>
    )
  }

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center",
      padding: isSmall ? "32px 24px" : "56px 32px",
    }}>
      {resolvedIllustration && (
        <div style={{ marginBottom: isSmall ? 16 : 24 }}>
          {resolvedIllustration}
        </div>
      )}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: isSmall ? "1rem" : "1.125rem",
        fontWeight: 700,
        color: "#0D0D0D",
        letterSpacing: "-0.01em",
        marginBottom: 8,
      }}>
        {resolvedTitle}
      </div>
      <div style={{
        fontFamily: "var(--font-jakarta)",
        fontSize: isSmall ? "0.8rem" : "0.875rem",
        color: "#777",
        lineHeight: 1.6,
        maxWidth: 360,
        marginBottom: (resolvedAction || resolvedSecondary) ? (isSmall ? 20 : 28) : 0,
      }}>
        {resolvedDesc}
      </div>
      {(resolvedAction || resolvedSecondary) && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {resolvedAction && <ActionButton act={resolvedAction} primary />}
          {resolvedSecondary && <ActionButton act={resolvedSecondary} primary={false} />}
        </div>
      )}
    </div>
  )
}
