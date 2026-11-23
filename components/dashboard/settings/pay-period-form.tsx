"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle2, Calendar } from "lucide-react"
import Link from "next/link"

// ── Storage ───────────────────────────────────────────────────────────
const PAY_PERIOD_KEY = "oj_pay_period"
const ONBOARDING_KEY = "oj_onboarding"

// ── Types ─────────────────────────────────────────────────────────────
type Cycle = "weekly" | "biweekly" | "monthly"
type SavedPayPeriod = { cycle: Cycle; startDay: number }

const CYCLE_OPTIONS: { value: Cycle; label: string; desc: string }[] = [
  { value: "weekly",   label: "Weekly",    desc: "Workers are paid every 7 days" },
  { value: "biweekly", label: "Bi-weekly", desc: "Workers are paid every 2 weeks" },
  { value: "monthly",  label: "Monthly",   desc: "Workers are paid once a month" },
]

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// ── Next pay dates preview ────────────────────────────────────────────
function getNextPayDates(cycle: Cycle, startDay: number, count = 3): Date[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dates: Date[] = []

  if (cycle === "monthly") {
    // startDay: 1–31 (or 0 = last day of month)
    let d = new Date(today.getFullYear(), today.getMonth(), 1)
    while (dates.length < count) {
      const year = d.getFullYear()
      const month = d.getMonth()
      const lastDay = new Date(year, month + 1, 0).getDate()
      const day = startDay === 0 ? lastDay : Math.min(startDay, lastDay)
      const candidate = new Date(year, month, day)
      if (candidate >= today) dates.push(candidate)
      d = new Date(year, month + 1, 1)
    }
  } else {
    // startDay: 0–6 (Mon–Sun), JS getDay() is 0=Sun…6=Sat
    const jsDay = startDay === 6 ? 0 : startDay + 1
    const diff = (jsDay - today.getDay() + 7) % 7
    let next = new Date(today)
    next.setDate(today.getDate() + (diff === 0 ? 0 : diff))
    const step = cycle === "weekly" ? 7 : 14
    while (dates.length < count) {
      dates.push(new Date(next))
      next.setDate(next.getDate() + step)
    }
  }
  return dates
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
}

// ── Shared styles ─────────────────────────────────────────────────────
const fieldLabel: React.CSSProperties = {
  fontFamily: "var(--font-jakarta)",
  fontSize: "0.825rem",
  fontWeight: 600,
  color: "#333",
  marginBottom: 10,
  display: "block",
}

export function PayPeriodForm() {
  const [cycle, setCycle] = useState<Cycle | null>(null)
  const [startDay, setStartDay] = useState<number | null>(null)
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle")
  const [isExisting, setIsExisting] = useState(false)

  // Load saved data on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PAY_PERIOD_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as SavedPayPeriod
      if (saved.cycle) setCycle(saved.cycle)
      if (saved.startDay !== undefined) setStartDay(saved.startDay)
      setIsExisting(true)
    } catch {}
  }, [])

  // Reset startDay when cycle changes (days vs date)
  function handleCycleChange(c: Cycle) {
    if (c === cycle) return
    setCycle(c)
    setStartDay(null)
    if (saveState === "saved") setSaveState("idle")
  }

  function handleStartDayChange(d: number) {
    setStartDay(d)
    if (saveState === "saved") setSaveState("idle")
  }

  function handleSave() {
    if (!cycle || startDay === null) return
    try {
      localStorage.setItem(PAY_PERIOD_KEY, JSON.stringify({ cycle, startDay }))
      const existing = JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? "{}") as Record<string, boolean>
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ ...existing, "pay-period": true }))
      setSaveState("saved")
    } catch {
      setSaveState("error")
    }
  }

  const canSave = cycle !== null && startDay !== null
  const nextDates = canSave ? getNextPayDates(cycle!, startDay!) : []

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #EBEBEB",
    borderRadius: 16,
    padding: "24px 28px",
    marginBottom: 16,
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

      {/* ── Form card ─────────────────────────────────────────────────── */}
      <div style={card}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.01em", marginBottom: 4 }}>
          Pay Period
        </div>
        <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#777", lineHeight: 1.5, marginBottom: 28 }}>
          Set how often you pay your workers and which day the pay period starts on.
        </div>

        {/* ── Cycle picker ───────────────────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <label style={fieldLabel}>Pay Cycle</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CYCLE_OPTIONS.map((opt) => {
              const selected = cycle === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => handleCycleChange(opt.value)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                    border: selected ? "2px solid var(--color-accent)" : "2px solid #EBEBEB",
                    background: selected ? "var(--color-accent-muted)" : "#fff",
                    transition: "all 0.15s", textAlign: "left",
                    boxShadow: "none",
                  }}
                >
                  {/* Radio dot */}
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                    border: selected ? "5px solid var(--color-accent)" : "2px solid #DEDEDE",
                    background: "#fff",
                    transition: "all 0.15s",
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

        {/* ── Start day ──────────────────────────────────────────────── */}
        {cycle && cycle !== "monthly" && (
          <div style={{ marginBottom: 28 }}>
            <label style={fieldLabel}>Period Starts On</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {DAYS_OF_WEEK.map((day, i) => {
                const selected = startDay === i
                return (
                  <button
                    key={day}
                    onClick={() => handleStartDayChange(i)}
                    style={{
                      minWidth: 56, height: 44, borderRadius: 10, cursor: "pointer",
                      border: selected ? "2px solid var(--color-accent)" : "2px solid #EBEBEB",
                      background: selected ? "var(--color-accent)" : "#fff",
                      fontFamily: "var(--font-jakarta)", fontSize: "0.825rem",
                      fontWeight: selected ? 700 : 500,
                      color: selected ? "#fff" : "#555",
                      transition: "all 0.15s",
                      boxShadow: "none",
                    }}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {cycle === "monthly" && (
          <div style={{ marginBottom: 28 }}>
            <label style={fieldLabel}>Period Starts On (Day of Month)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => {
                const selected = startDay === d
                return (
                  <button
                    key={d}
                    onClick={() => handleStartDayChange(d)}
                    style={{
                      width: 44, height: 44, borderRadius: 10, cursor: "pointer",
                      border: selected ? "2px solid var(--color-accent)" : "2px solid #EBEBEB",
                      background: selected ? "var(--color-accent)" : "#fff",
                      fontFamily: "var(--font-jakarta)", fontSize: "0.825rem",
                      fontWeight: selected ? 700 : 500,
                      color: selected ? "#fff" : "#555",
                      transition: "all 0.15s",
                      boxShadow: "none",
                    }}
                  >
                    {d}
                  </button>
                )
              })}
              {/* Last day of month */}
              <button
                onClick={() => handleStartDayChange(0)}
                style={{
                  height: 44, padding: "0 14px", borderRadius: 10, cursor: "pointer",
                  border: startDay === 0 ? "2px solid var(--color-accent)" : "2px solid #EBEBEB",
                  background: startDay === 0 ? "var(--color-accent)" : "#fff",
                  fontFamily: "var(--font-jakarta)", fontSize: "0.775rem",
                  fontWeight: startDay === 0 ? 700 : 500,
                  color: startDay === 0 ? "#fff" : "#555",
                  transition: "all 0.15s",
                  boxShadow: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Last day
              </button>
            </div>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "#AAA", marginTop: 8 }}>
              Days 29–31 are not shown. If a month is shorter, the last day of that month is used instead.
            </div>
          </div>
        )}

        {/* ── Upcoming pay dates preview ──────────────────────────────── */}
        {canSave && nextDates.length > 0 && (
          <div style={{
            padding: "16px 18px",
            background: "var(--color-accent-muted)",
            border: "1px solid var(--color-accent-border, #DDD6FE)",
            borderRadius: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Calendar size={14} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-accent)" }}>
                Upcoming Pay Dates
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {nextDates.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", background: "var(--color-accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-jakarta)", fontSize: "0.65rem", fontWeight: 800, color: "#fff", flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.85rem", color: "#333" }}>
                    {formatDate(d)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
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
          disabled={!canSave || saveState === "saved"}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 44, padding: "0 28px", borderRadius: 10,
            fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", fontWeight: 600,
            color: "#fff",
            background: saveState === "saved" ? "#16a34a" : !canSave ? "#C4B5FD" : "var(--color-accent)",
            border: "none",
            cursor: !canSave || saveState === "saved" ? "not-allowed" : "pointer",
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
