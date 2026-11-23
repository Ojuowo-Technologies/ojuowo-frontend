"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, CheckCircle2, Plus, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"

// ── Storage ───────────────────────────────────────────────────────────
const PAY_RATES_KEY = "oj_pay_rates"
const ONBOARDING_KEY = "oj_onboarding"

// ── Types ─────────────────────────────────────────────────────────────
type RateEntry = {
  id: string
  taskName: string
  rateNaira: string   // string while editing; converted to kobo on save
  taskNameError: string
  rateError: string
}

// Stored as integer kobo (safe integer)
type SavedRate = { id: string; taskName: string; rateKobo: number }

const SEEDS: { taskName: string; rateNaira: string }[] = [
  { taskName: "Cutting",      rateNaira: "" },
  { taskName: "Sewing",       rateNaira: "" },
  { taskName: "Finishing",    rateNaira: "" },
  { taskName: "Embroidery",   rateNaira: "" },
  { taskName: "Alterations",  rateNaira: "" },
]

function makeEntry(taskName = "", rateNaira = ""): RateEntry {
  return { id: crypto.randomUUID(), taskName, rateNaira, taskNameError: "", rateError: "" }
}

// ── Validation ────────────────────────────────────────────────────────
function validateTaskName(val: string, allNames: string[], selfId: string, entries: RateEntry[]): string {
  if (!val.trim()) return ""
  if (val.trim().length < 2) return "Task name must be at least 2 characters."
  const dupe = entries.some((e) => e.id !== selfId && e.taskName.trim().toLowerCase() === val.trim().toLowerCase())
  if (dupe) return "You already have a task with this name."
  return ""
}

function validateRate(val: string): string {
  if (!val.trim()) return ""
  const n = Number(val)
  if (isNaN(n) || n < 0) return "Enter a valid amount."
  if (!Number.isInteger(n)) return "Use whole naira only (no decimal points)."
  return ""
}

// ── Shared styles ─────────────────────────────────────────────────────
const fieldLabel: React.CSSProperties = {
  fontFamily: "var(--font-jakarta)",
  fontSize: "0.775rem",
  fontWeight: 600,
  color: "#555",
  marginBottom: 6,
  display: "block",
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
  height: 42,
  borderRadius: 10,
  border: `1px solid ${hasError ? "var(--color-error)" : "#DEDEDE"}`,
  padding: "0 12px",
  fontFamily: "var(--font-jakarta)",
  fontSize: "0.875rem",
  color: "#111",
  outline: "none",
  background: "#fff",
  transition: "border-color 0.15s",
  boxSizing: "border-box" as const,
})

function ErrorMsg({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 5, marginTop: 5 }}>
      <AlertTriangle size={12} style={{ color: "var(--color-error)", flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "var(--color-error)", lineHeight: 1.4 }}>
        {msg}
      </span>
    </div>
  )
}

export function PayRatesForm() {
  const [entries, setEntries] = useState<RateEntry[]>(SEEDS.map((s) => makeEntry(s.taskName, s.rateNaira)))
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle")
  const [isExisting, setIsExisting] = useState(false)
  const newRowRef = useRef<HTMLInputElement | null>(null)

  // Load saved data on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PAY_RATES_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as SavedRate[]
      if (!Array.isArray(saved) || saved.length === 0) return
      setEntries(saved.map((s) => makeEntry(s.taskName, s.rateKobo > 0 ? String(s.rateKobo / 100) : "")))
      setIsExisting(true)
    } catch {}
  }, [])

  // ── Entry mutators ────────────────────────────────────────────────
  function updateEntry(id: string, patch: Partial<RateEntry>) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
    if (saveState === "saved") setSaveState("idle")
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
    if (saveState === "saved") setSaveState("idle")
  }

  function addEntry() {
    setEntries((prev) => [...prev, makeEntry()])
    // Focus the new task name input on next render
    setTimeout(() => newRowRef.current?.focus(), 50)
  }

  // ── Blur validators ───────────────────────────────────────────────
  function handleTaskNameBlur(id: string, val: string) {
    updateEntry(id, { taskNameError: validateTaskName(val, [], id, entries) })
  }

  function handleRateBlur(id: string, val: string) {
    updateEntry(id, { rateError: validateRate(val) })
  }

  // ── Rate input: digits only, no decimal ──────────────────────────
  function handleRateChange(id: string, raw: string) {
    const cleaned = raw.replace(/[^\d]/g, "")
    updateEntry(id, { rateNaira: cleaned, rateError: "" })
  }

  // ── Save ──────────────────────────────────────────────────────────
  function handleSave() {
    let hasError = false

    const validated = entries.map((e) => {
      const taskNameErr = e.taskName.trim() ? validateTaskName(e.taskName, [], e.id, entries) : "Task name is required."
      const rateErr = e.rateNaira.trim() ? validateRate(e.rateNaira) : "Enter a rate. Use 0 if this task is unpaid."
      if (taskNameErr || rateErr) hasError = true
      return { ...e, taskNameError: taskNameErr, rateError: rateErr }
    })

    setEntries(validated)
    if (hasError) return

    try {
      const toSave: SavedRate[] = entries.map((e) => ({
        id: e.id,
        taskName: e.taskName.trim(),
        rateKobo: Number(e.rateNaira) * 100,
      }))
      localStorage.setItem(PAY_RATES_KEY, JSON.stringify(toSave))
      const existing = JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? "{}") as Record<string, boolean>
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ ...existing, payRates: true }))
      setSaveState("saved")
    } catch {
      setSaveState("error")
    }
  }

  const filledEntries = entries.filter((e) => e.taskName.trim())
  const canSave = filledEntries.length > 0 && entries.every(
    (e) => !e.taskNameError && !e.rateError
  )

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

      {/* ── Main card ─────────────────────────────────────────────────── */}
      <div style={card}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.01em", marginBottom: 4 }}>
          Pay Rates
        </div>
        <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#777", lineHeight: 1.5, marginBottom: 28 }}>
          Set how much workers earn per task type. These rates are locked in when a task is approved — a later change never rewrites past earnings.
        </div>

        {/* ── Column headers ─────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 36px", gap: 12, alignItems: "center", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #F3F4F6" }}>
          <span style={{ ...fieldLabel, marginBottom: 0 }}>Task Type</span>
          <span style={{ ...fieldLabel, marginBottom: 0 }}>Rate Per Task</span>
          <span />
        </div>

        {/* ── Rate rows ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {entries.map((entry, idx) => (
            <div key={entry.id}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 36px", gap: 12, alignItems: "flex-start" }}>
                {/* Task name */}
                <div>
                  <input
                    ref={idx === entries.length - 1 ? newRowRef : undefined}
                    type="text"
                    value={entry.taskName}
                    onChange={(e) => updateEntry(entry.id, { taskName: e.target.value, taskNameError: "" })}
                    onBlur={() => handleTaskNameBlur(entry.id, entry.taskName)}
                    placeholder="e.g. Button work"
                    style={inputStyle(!!entry.taskNameError)}
                  />
                  <ErrorMsg msg={entry.taskNameError} />
                </div>

                {/* Rate */}
                <div>
                  <div style={{ position: "relative" }}>
                    <span style={{
                      position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                      fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "#AAA",
                      pointerEvents: "none", userSelect: "none",
                    }}>
                      ₦
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={entry.rateNaira}
                      onChange={(e) => handleRateChange(entry.id, e.target.value)}
                      onBlur={() => handleRateBlur(entry.id, entry.rateNaira)}
                      placeholder="0"
                      style={{ ...inputStyle(!!entry.rateError), paddingLeft: 26, textAlign: "right" }}
                    />
                  </div>
                  <ErrorMsg msg={entry.rateError} />
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeEntry(entry.id)}
                  disabled={entries.length === 1}
                  title="Remove"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 42, borderRadius: 8, border: "none",
                    background: entries.length === 1 ? "#F9FAFB" : "var(--color-error-bg)",
                    cursor: entries.length === 1 ? "not-allowed" : "pointer",
                    color: entries.length === 1 ? "#CCC" : "var(--color-error)",
                    transition: "opacity 0.15s",
                    flexShrink: 0,
                    boxShadow: "none",
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Add row ────────────────────────────────────────────────── */}
        <button
          onClick={addEntry}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            height: 40, padding: "0 16px", borderRadius: 10, marginTop: 14,
            border: "2px dashed #DEDEDE", background: "transparent",
            fontFamily: "var(--font-jakarta)", fontSize: "0.825rem",
            fontWeight: 600, color: "#777", cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
            boxShadow: "none",
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.borderColor = "var(--color-accent)"
            b.style.color = "var(--color-accent)"
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.borderColor = "#DEDEDE"
            b.style.color = "#777"
          }}
        >
          <Plus size={14} />
          Add Task Type
        </button>
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
          ) : isExisting ? "Save Changes" : "Save Rates"}
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
