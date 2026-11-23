"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, ArrowRight, TrendingUp, ShoppingBag, Users, Clock } from "lucide-react"
import { SkeletonDashboard } from "@/components/shared/skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"

// ── Storage keys ──────────────────────────────────────────────────────
const ONBOARDING_KEY = "oj_onboarding"
const STEP_IDS = ["branding", "bank", "pay-period", "staff", "pay-rates", "payment-plan", "my-page"]

type UIState = "loading" | "setup-incomplete" | "empty" | "error"

// ── Setup progress card ───────────────────────────────────────────────
function SetupPrompt({ completedCount, total }: { completedCount: number; total: number }) {
  const pct = Math.round((completedCount / total) * 100)
  return (
    <div style={{
      background: "#fff", border: "1px solid #EBEBEB", borderRadius: 20,
      padding: "32px 36px", maxWidth: 560, margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#0D0D0D", letterSpacing: "-0.02em", marginBottom: 6 }}>
            Finish setting up your business
          </div>
          <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "#777", lineHeight: 1.5 }}>
            {completedCount} of {total} steps complete. Your dashboard unlocks when setup is done.
          </div>
        </div>
        <div style={{
          minWidth: 56, height: 56, borderRadius: "50%",
          background: "var(--color-accent-muted)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 800,
          color: "var(--color-accent)", flexShrink: 0, marginLeft: 20,
        }}>
          {pct}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "#F3F4F6", borderRadius: 3, marginBottom: 24, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 3,
          background: "var(--color-accent)",
          width: `${pct}%`, transition: "width 0.6s ease",
        }} />
      </div>

      {/* Step list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {[
          { id: "branding",      label: "Add logo and brand colors",      href: "/dashboard/settings/branding" },
          { id: "bank",          label: "Set up bank account",             href: "/dashboard/settings/bank" },
          { id: "pay-period",    label: "Set pay period",                  href: "/dashboard/settings/pay-period" },
          { id: "staff",         label: "Invite first staff member",       href: "/dashboard/staff/invite" },
          { id: "pay-rates",     label: "Set pay rates",                   href: "/dashboard/staff/pay-rates" },
          { id: "payment-plan",  label: "Set default payment plan",        href: "/dashboard/settings/payments" },
          { id: "my-page",       label: "Publish your business page",      href: "/dashboard/my-page" },
        ].map(({ id, label, href }) => {
          const done = (() => {
            try {
              const raw = localStorage.getItem(ONBOARDING_KEY)
              if (!raw) return false
              return !!(JSON.parse(raw) as Record<string, boolean>)[id]
            } catch { return false }
          })()
          return (
            <Link
              key={id}
              href={href}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px", borderRadius: 10,
                background: done ? "#F0FDF4" : "#FAFAFA",
                border: `1px solid ${done ? "#BBF7D0" : "#F3F4F6"}`,
                textDecoration: "none", transition: "border-color 0.15s",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                background: done ? "#16a34a" : "#E5E7EB",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#9CA3AF" }} />
                )}
              </div>
              <span style={{
                fontFamily: "var(--font-jakarta)", fontSize: "0.85rem",
                fontWeight: done ? 500 : 600,
                color: done ? "#16a34a" : "#333",
                textDecoration: done ? "line-through" : "none",
                flex: 1,
              }}>
                {label}
              </span>
              {!done && <ArrowRight size={14} style={{ color: "#CCC", flexShrink: 0 }} />}
            </Link>
          )
        })}
      </div>

      <Link
        href="/dashboard/setup"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          height: 48, borderRadius: 12,
          background: "var(--color-accent)", color: "#fff",
          fontFamily: "var(--font-jakarta)", fontSize: "0.9rem", fontWeight: 700,
          textDecoration: "none", transition: "opacity 0.15s",
        }}
      >
        Continue Setup
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}

// ── Stat tile ─────────────────────────────────────────────────────────
function StatTile({ icon, label, value, sub, accent = false }: {
  icon: React.ReactNode; label: string; value: string; sub: string; accent?: boolean
}) {
  return (
    <div style={{
      background: accent ? "var(--color-accent)" : "#fff",
      border: accent ? "none" : "1px solid #EBEBEB",
      borderRadius: 16, padding: "20px 24px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: accent ? "rgba(255,255,255,0.18)" : "var(--color-accent-muted)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {icon}
        </div>
      </div>
      <div style={{
        fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800,
        color: accent ? "#fff" : "#0D0D0D", letterSpacing: "-0.02em", marginBottom: 4,
      }}>
        {value}
      </div>
      <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", fontWeight: 600, color: accent ? "rgba(255,255,255,0.75)" : "#777" }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: accent ? "rgba(255,255,255,0.5)" : "#AAA", marginTop: 2 }}>
        {sub}
      </div>
    </div>
  )
}

// ── Empty dashboard (setup done, no orders) ───────────────────────────
function EmptyDashboard() {
  return (
    <div>
      {/* Zero-state stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
        <StatTile
          icon={<ShoppingBag size={16} style={{ color: "var(--color-accent)" }} />}
          label="Total Orders"
          value="0"
          sub="All time"
          accent
        />
        <StatTile
          icon={<Clock size={16} style={{ color: "var(--color-accent)" }} />}
          label="Active Orders"
          value="0"
          sub="In progress"
        />
        <StatTile
          icon={<TrendingUp size={16} style={{ color: "var(--color-accent)" }} />}
          label="Revenue This Month"
          value="₦0"
          sub="Payments received"
        />
        <StatTile
          icon={<Users size={16} style={{ color: "var(--color-accent)" }} />}
          label="Customers"
          value="0"
          sub="All time"
        />
      </div>

      {/* Empty orders panel */}
      <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #F3F4F6" }}>
          <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.9rem", fontWeight: 700, color: "#0D0D0D" }}>
            Recent Orders
          </span>
          <Link href="/dashboard/orders/new" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            height: 36, padding: "0 16px", borderRadius: 8,
            background: "var(--color-accent)", color: "#fff",
            fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", fontWeight: 600,
            textDecoration: "none",
          }}>
            <Plus size={13} />
            New Order
          </Link>
        </div>
        <EmptyState
          variant="orders"
          size="sm"
        />
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [uiState, setUiState] = useState<UIState>("loading")
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    // Brief pause to simulate auth/data check, then read local state
    const t = setTimeout(() => {
      try {
        const raw = localStorage.getItem(ONBOARDING_KEY)
        const done = raw ? (JSON.parse(raw) as Record<string, boolean>) : {}
        const count = STEP_IDS.filter((id) => !!done[id]).length
        setCompletedCount(count)
        setUiState(count < STEP_IDS.length ? "setup-incomplete" : "empty")
      } catch {
        setUiState("error")
      }
    }, 600)
    return () => clearTimeout(t)
  }, [])

  if (uiState === "loading") {
    return (
      <div className="max-w-5xl mx-auto">
        <SkeletonDashboard />
      </div>
    )
  }

  if (uiState === "error") {
    return (
      <div className="max-w-5xl mx-auto">
        <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 16 }}>
          <ErrorState type="error" onRetry={() => setUiState("loading")} />
        </div>
      </div>
    )
  }

  if (uiState === "setup-incomplete") {
    return (
      <div style={{
        position: "fixed", inset: 0, top: 68,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px", overflowY: "auto",
        backgroundColor: "var(--color-background)",
      }}>
        <SetupPrompt completedCount={completedCount} total={STEP_IDS.length} />
      </div>
    )
  }

  // Empty: setup done, no orders yet
  return (
    <div className="max-w-5xl mx-auto">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "#0D0D0D", letterSpacing: "-0.02em", marginBottom: 4 }}>
          Dashboard
        </div>
        <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "#777" }}>
          Setup is complete. Create your first order to get started.
        </div>
      </div>
      <EmptyDashboard />
    </div>
  )
}
