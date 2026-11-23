"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react"
import Link from "next/link"

// ── Storage ───────────────────────────────────────────────────────────
const PAYMENT_PLAN_KEY = "oj_payment_plan"
const ONBOARDING_KEY = "oj_onboarding"

// ── Types ─────────────────────────────────────────────────────────────
type PlanType = "full" | "half" | "custom"

type SavedPlan = {
  planType: PlanType
  depositPct: number   // 100 for full, 50 for half, 1–99 for custom
  note: string
}

const PLAN_OPTIONS: { value: PlanType; label: string; desc: string; pct: number | null }[] = [
  { value: "full",   label: "Full Payment Upfront",       desc: "Customers pay 100% before work begins",           pct: 100 },
  { value: "half",   label: "50% Deposit, 50% on Delivery", desc: "Half paid upfront, half collected on delivery", pct: 50  },
  { value: "custom", label: "Custom Deposit",              desc: "You choose the percentage paid upfront",          pct: null },
]

const SAMPLE_ORDER_NAIRA = 25000

function formatNaira(naira: number): string {
  return "₦" + naira.toLocaleString("en-NG")
}

function resolvedPct(planType: PlanType, customPct: string): number | null {
  if (planType === "full") return 100
  if (planType === "half") return 50
  const n = parseInt(customPct, 10)
  if (isNaN(n) || n < 1 || n > 99) return null
  return n
}

export function PaymentPlanForm() {
  const [planType, setPlanType] = useState<PlanType | null>(null)
  const [customPct, setCustomPct] = useState("")
  const [customPctError, setCustomPctError] = useState("")
  const [note, setNote] = useState("")
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle")
  const [isExisting, setIsExisting] = useState(false)

  // Load saved data on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PAYMENT_PLAN_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as SavedPlan
      setPlanType(saved.planType)
      if (saved.planType === "custom") setCustomPct(String(saved.depositPct))
      setNote(saved.note ?? "")
      setIsExisting(true)
    } catch {}
  }, [])

  function handlePlanChange(p: PlanType) {
    setPlanType(p)
    setCustomPctError("")
    if (saveState === "saved") setSaveState("idle")
  }

  function handleCustomPctChange(raw: string) {
    const cleaned = raw.replace(/[^\d]/g, "").slice(0, 2)
    setCustomPct(cleaned)
    setCustomPctError("")
    if (saveState === "saved") setSaveState("idle")
  }

  function handleCustomPctBlur() {
    if (!customPct) return
    const n = parseInt(customPct, 10)
    if (isNaN(n) || n < 1 || n > 99) {
      setCustomPctError("Enter a whole number between 1 and 99.")
    }
  }

  function handleSave() {
    if (!planType) return
    if (planType === "custom") {
      const n = parseInt(customPct, 10)
      if (isNaN(n) || n < 1 || n > 99) {
        setCustomPctError("Enter a whole number between 1 and 99.")
        return
      }
    }
    const pct = resolvedPct(planType, customPct)!
    try {
      localStorage.setItem(PAYMENT_PLAN_KEY, JSON.stringify({ planType, depositPct: pct, note: note.trim() }))
      const existing = JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? "{}") as Record<string, boolean>
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ ...existing, payments: true }))
      setSaveState("saved")
    } catch {
      setSaveState("error")
    }
  }

  const pct = planType ? resolvedPct(planType, customPct) : null
  const depositAmt  = pct !== null ? Math.round(SAMPLE_ORDER_NAIRA * pct / 100) : null
  const balanceAmt  = depositAmt  !== null ? SAMPLE_ORDER_NAIRA - depositAmt : null
  const canSave = planType !== null && (planType !== "custom" || (parseInt(customPct, 10) >= 1 && parseInt(customPct, 10) <= 99))

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #EBEBEB",
    borderRadius: 16,
    padding: "24px 28px",
    marginBottom: 16,
  }

  const fieldLabel: React.CSSProperties = {
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.825rem",
    fontWeight: 600,
    color: "#333",
    marginBottom: 10,
    display: "block",
  }

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {/* Back link */}
      <Link
        href="/dashboard/setup"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-jakarta)", fontSize: "0.825rem",
          fontWeight: 500, color: "#777", textDecoration: "none", marginBottom: 24,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#777")}
      >
        <ArrowLeft size={14} />
        Get Started
      </Link>

      {/* ── Plan picker card ──────────────────────────────────────────── */}
      <div style={card}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.01em", marginBottom: 4 }}>
          Default Payment Plan
        </div>
        <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#777", lineHeight: 1.5, marginBottom: 28 }}>
          This is printed on every new invoice. You can override it per order.
        </div>

        {/* Plan options */}
        <div style={{ marginBottom: 28 }}>
          <label style={fieldLabel}>How do customers pay?</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PLAN_OPTIONS.map((opt) => {
              const selected = planType === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => handlePlanChange(opt.value)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                    border: selected ? "2px solid var(--color-accent)" : "2px solid #EBEBEB",
                    background: selected ? "var(--color-accent-muted)" : "#fff",
                    transition: "all 0.15s", textAlign: "left",
                    boxShadow: "none",
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                    border: selected ? "5px solid var(--color-accent)" : "2px solid #DEDEDE",
                    background: "#fff", transition: "all 0.15s",
                  }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.9rem", fontWeight: 700, color: selected ? "var(--color-accent)" : "#111" }}>
                      {opt.label}
                    </div>
                    <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "#777", marginTop: 2 }}>
                      {opt.desc}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Custom percentage input */}
        {planType === "custom" && (
          <div style={{ marginBottom: 28 }}>
            <label style={fieldLabel}>Deposit Percentage</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative", width: 120 }}>
                <input
                  autoFocus
                  type="text"
                  inputMode="numeric"
                  value={customPct}
                  onChange={(e) => handleCustomPctChange(e.target.value)}
                  onBlur={handleCustomPctBlur}
                  placeholder="e.g. 30"
                  style={{
                    width: "100%", height: 44, borderRadius: 10,
                    border: `1px solid ${customPctError ? "var(--color-error)" : "#DEDEDE"}`,
                    padding: "0 36px 0 14px",
                    fontFamily: "var(--font-jakarta)", fontSize: "1rem", fontWeight: 700,
                    color: "#111", outline: "none", background: "#fff",
                    boxSizing: "border-box",
                  }}
                />
                <span style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  fontFamily: "var(--font-jakarta)", fontSize: "0.9rem", fontWeight: 700, color: "#AAA",
                  pointerEvents: "none",
                }}>
                  %
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#777" }}>
                of the order total is paid upfront
              </span>
            </div>
            {customPctError && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 7 }}>
                <AlertTriangle size={12} style={{ color: "var(--color-error)", flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "var(--color-error)" }}>
                  {customPctError}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Live split preview */}
        {pct !== null && (
          <div style={{
            padding: "16px 20px",
            background: "var(--color-accent-muted)",
            border: "1px solid var(--color-accent-border, #DDD6FE)",
            borderRadius: 12,
            marginBottom: 28,
          }}>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-accent)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Sample Order · {formatNaira(SAMPLE_ORDER_NAIRA)}
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <div>
                <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#777", marginBottom: 3 }}>
                  Due at booking{pct === 100 ? " (full)" : ` (${pct}%)`}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#111" }}>
                  {formatNaira(depositAmt!)}
                </div>
              </div>
              {pct < 100 && (
                <>
                  <div style={{ width: 1, background: "#DDD6FE", alignSelf: "stretch" }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#777", marginBottom: 3 }}>
                      Balance on delivery ({100 - pct}%)
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#111" }}>
                      {formatNaira(balanceAmt!)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Invoice note */}
        <div>
          <label style={fieldLabel}>
            Invoice Note
            <span style={{ fontWeight: 400, color: "#AAA", marginLeft: 5 }}>(optional)</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => { setNote(e.target.value); if (saveState === "saved") setSaveState("idle") }}
            placeholder="e.g. Please pay the deposit before we begin work. Balance is due on collection."
            rows={3}
            style={{
              width: "100%", borderRadius: 10, border: "1px solid #DEDEDE",
              padding: "10px 14px", fontFamily: "var(--font-jakarta)",
              fontSize: "0.875rem", color: "#111", outline: "none",
              background: "#fff", resize: "vertical", lineHeight: 1.6,
              boxSizing: "border-box", transition: "border-color 0.15s",
            }}
          />
          <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: "#AAA", marginTop: 5 }}>
            Printed at the bottom of every invoice.
          </div>
        </div>
      </div>

      {/* ── Save bar ──────────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
        {saveState === "saved" && (
          <Link
            href="/dashboard/setup"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              height: 44, padding: "0 20px", borderRadius: 10,
              fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", fontWeight: 600,
              color: "var(--color-accent)", background: "var(--color-accent-muted)",
              border: "none", textDecoration: "none",
            }}
          >
            Back to Get Started
          </Link>
        )}
        <button
          onClick={handleSave}
          disabled={saveState === "saved"}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 44, padding: "0 28px", borderRadius: 10,
            fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", fontWeight: 600,
            color: "#fff",
            background: saveState === "saved" ? "#16a34a" : !canSave ? "#C4B5FD" : "var(--color-accent)",
            border: "none",
            cursor: saveState === "saved" ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            boxShadow: "none",
          }}
        >
          {saveState === "saved" ? (
            <><CheckCircle2 size={16} /> Saved</>
          ) : isExisting ? "Save Changes" : "Save"}
        </button>
      </div>

      {saveState === "error" && (
        <div style={{ marginTop: 10, padding: "10px 14px", background: "var(--color-error-bg)", border: "1px solid var(--color-error-border)", borderRadius: 8, fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "var(--color-error)" }}>
          Could not save. Please try again.
        </div>
      )}
    </div>
  )
}
