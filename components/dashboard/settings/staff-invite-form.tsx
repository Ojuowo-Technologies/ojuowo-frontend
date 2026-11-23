"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle2, Plus, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"

// ── Storage ───────────────────────────────────────────────────────────
const STAFF_KEY = "oj_staff_invites"
const ONBOARDING_KEY = "oj_onboarding"

// ── Types ─────────────────────────────────────────────────────────────
type Role = "worker" | "manager" | "cashier"

type StaffEntry = {
  id: string
  name: string
  phone: string
  role: Role | null
  nameError: string
  phoneError: string
}

type SavedStaff = { id: string; name: string; phone: string; role: Role }

const ROLES: { value: Role; label: string; desc: string }[] = [
  { value: "worker",   label: "Worker",   desc: "Sees and updates their own tasks only" },
  { value: "manager",  label: "Manager",  desc: "Manages orders, tasks, and staff" },
  { value: "cashier",  label: "Cashier",  desc: "Records payments and prints receipts" },
]

function makeEntry(): StaffEntry {
  return { id: crypto.randomUUID(), name: "", phone: "", role: null, nameError: "", phoneError: "" }
}

// ── Phone normalisation ───────────────────────────────────────────────
function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  if (digits.startsWith("234") && digits.length === 13) return "0" + digits.slice(3)
  return digits
}

function validatePhone(raw: string): string {
  const n = normalisePhone(raw)
  if (!n) return ""
  if (n.length !== 11) return "Enter an 11-digit Nigerian mobile number (e.g. 08012345678)."
  if (!/^0[7-9][01]\d{8}$/.test(n)) return "This doesn't look like a valid Nigerian number."
  return ""
}

function validateName(name: string): string {
  if (!name.trim()) return ""
  if (name.trim().length < 2) return "Name must be at least 2 characters."
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

export function StaffInviteForm() {
  const [entries, setEntries] = useState<StaffEntry[]>([makeEntry()])
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle")
  const [isExisting, setIsExisting] = useState(false)

  // Load saved data on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STAFF_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as SavedStaff[]
      if (!Array.isArray(saved) || saved.length === 0) return
      setEntries(saved.map((s) => ({ ...s, nameError: "", phoneError: "" })))
      setIsExisting(true)
    } catch {}
  }, [])

  // ── Entry mutators ────────────────────────────────────────────────
  function updateEntry(id: string, patch: Partial<StaffEntry>) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
    if (saveState === "saved") setSaveState("idle")
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
    if (saveState === "saved") setSaveState("idle")
  }

  function addEntry() {
    setEntries((prev) => [...prev, makeEntry()])
  }

  // ── Blur validators ───────────────────────────────────────────────
  function handleNameBlur(id: string, name: string) {
    updateEntry(id, { nameError: validateName(name) })
  }

  function handlePhoneBlur(id: string, phone: string) {
    updateEntry(id, { phoneError: validatePhone(phone) })
  }

  // ── Duplicate phone check ─────────────────────────────────────────
  function getDuplicatePhones(): Set<string> {
    const seen = new Map<string, number>()
    for (const e of entries) {
      const n = normalisePhone(e.phone)
      if (n.length === 11) seen.set(n, (seen.get(n) ?? 0) + 1)
    }
    const dupes = new Set<string>()
    for (const [n, count] of seen) if (count > 1) dupes.add(n)
    return dupes
  }

  // ── Save ──────────────────────────────────────────────────────────
  function handleSave() {
    // Run all validations first
    const dupes = getDuplicatePhones()
    let hasError = false

    const validated = entries.map((e) => {
      const nameErr = e.name.trim() ? validateName(e.name) : "Name is required."
      const rawPhone = normalisePhone(e.phone)
      let phoneErr = e.phone.trim() ? validatePhone(e.phone) : "Phone number is required."
      if (!phoneErr && dupes.has(rawPhone)) phoneErr = "This number appears more than once."
      const roleErr = e.role === null
      if (nameErr || phoneErr || roleErr) hasError = true
      return { ...e, nameError: nameErr, phoneError: phoneErr }
    })

    setEntries(validated)
    if (hasError) return

    try {
      const toSave: SavedStaff[] = entries.map((e) => ({
        id: e.id,
        name: e.name.trim(),
        phone: normalisePhone(e.phone),
        role: e.role as Role,
      }))
      localStorage.setItem(STAFF_KEY, JSON.stringify(toSave))
      const existing = JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? "{}") as Record<string, boolean>
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ ...existing, staff: true }))
      setSaveState("saved")
    } catch {
      setSaveState("error")
    }
  }

  const canSave = entries.length > 0 && entries.every(
    (e) => e.name.trim() && e.phone.trim() && e.role !== null && !e.nameError && !e.phoneError
  )

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #EBEBEB",
    borderRadius: 16,
    padding: "20px 24px",
    marginBottom: 12,
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

      {/* Header card */}
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.01em", marginBottom: 4 }}>
          Invite Your Team
        </div>
        <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#777", lineHeight: 1.5 }}>
          Add your staff and assign each person a role. They will receive a WhatsApp message with a link to set up their account.
        </div>
      </div>

      {/* Staff entries */}
      {entries.map((entry, idx) => {
        const dupes = getDuplicatePhones()
        const isDupePhone = normalisePhone(entry.phone).length === 11 && dupes.has(normalisePhone(entry.phone))

        return (
          <div key={entry.id} style={card}>
            {/* Entry header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", fontWeight: 700, color: "#AAA" }}>
                Staff Member {idx + 1}
              </span>
              {entries.length > 1 && (
                <button
                  onClick={() => removeEntry(entry.id)}
                  title="Remove"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 30, height: 30, borderRadius: 8, border: "none",
                    background: "var(--color-error-bg)", cursor: "pointer",
                    color: "var(--color-error)", transition: "opacity 0.15s",
                    boxShadow: "none",
                  }}
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            {/* Name + Phone row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              <div>
                <label style={fieldLabel}>Full Name</label>
                <input
                  type="text"
                  value={entry.name}
                  onChange={(e) => updateEntry(entry.id, { name: e.target.value, nameError: "" })}
                  onBlur={() => handleNameBlur(entry.id, entry.name)}
                  placeholder="Ada Okafor"
                  style={inputStyle(!!entry.nameError)}
                />
                <ErrorMsg msg={entry.nameError} />
              </div>
              <div>
                <label style={fieldLabel}>Phone Number</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={entry.phone}
                  onChange={(e) => updateEntry(entry.id, { phone: e.target.value, phoneError: "" })}
                  onBlur={() => handlePhoneBlur(entry.id, entry.phone)}
                  placeholder="08012345678"
                  style={inputStyle(!!entry.phoneError || isDupePhone)}
                />
                <ErrorMsg msg={entry.phoneError || (isDupePhone ? "This number appears more than once." : "")} />
              </div>
            </div>

            {/* Role picker */}
            <div>
              <label style={fieldLabel}>Role</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ROLES.map((r) => {
                  const selected = entry.role === r.value
                  return (
                    <button
                      key={r.value}
                      onClick={() => updateEntry(entry.id, { role: r.value })}
                      title={r.desc}
                      style={{
                        height: 36, padding: "0 14px", borderRadius: 8, cursor: "pointer",
                        border: selected ? "2px solid var(--color-accent)" : "2px solid #EBEBEB",
                        background: selected ? "var(--color-accent)" : "#fff",
                        fontFamily: "var(--font-jakarta)", fontSize: "0.8rem",
                        fontWeight: selected ? 700 : 500,
                        color: selected ? "#fff" : "#555",
                        transition: "all 0.15s",
                        boxShadow: "none",
                      }}
                    >
                      {r.label}
                    </button>
                  )
                })}
              </div>
              {entry.role && (
                <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#888", marginTop: 6 }}>
                  {ROLES.find((r) => r.value === entry.role)?.desc}
                </div>
              )}
              {!entry.role && saveState !== "idle" && (
                <ErrorMsg msg="Select a role for this person." />
              )}
            </div>
          </div>
        )
      })}

      {/* Add another */}
      <button
        onClick={addEntry}
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          height: 42, padding: "0 18px", borderRadius: 10,
          border: "2px dashed #DEDEDE", background: "transparent",
          fontFamily: "var(--font-jakarta)", fontSize: "0.825rem",
          fontWeight: 600, color: "#777", cursor: "pointer",
          marginBottom: 24, transition: "border-color 0.15s, color 0.15s",
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
        Add Another Staff Member
      </button>

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
          ) : isExisting ? (
            `Save Changes`
          ) : entries.length === 1 ? (
            "Send Invite"
          ) : (
            `Send ${entries.length} Invites`
          )}
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
