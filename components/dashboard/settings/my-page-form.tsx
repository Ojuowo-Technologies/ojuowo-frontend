"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, CheckCircle2, Plus, Trash2, AlertTriangle, Phone } from "lucide-react"
import Link from "next/link"

// ── Storage ───────────────────────────────────────────────────────────
const MY_PAGE_KEY   = "oj_my_page"
const BRANDING_KEY  = "oj_branding"
const ONBOARDING_KEY = "oj_onboarding"

// ── Types ─────────────────────────────────────────────────────────────
type Service = {
  id: string
  name: string
  price: string   // whole naira, optional
  nameError: string
}

type SavedMyPage = {
  tagline: string
  about: string
  services: { id: string; name: string; priceKobo: number }[]
  whatsapp: string
}

type SavedBranding = { logoUrl?: string; logoName?: string; brandColor?: string }

function makeService(name = ""): Service {
  return { id: crypto.randomUUID(), name, price: "", nameError: "" }
}

function normalisePhone(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 11)
}

function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG")
}

// ── Shared styles ─────────────────────────────────────────────────────
const fieldLabel: React.CSSProperties = {
  fontFamily: "var(--font-jakarta)",
  fontSize: "0.825rem",
  fontWeight: 600,
  color: "#333",
  marginBottom: 8,
  display: "block",
}

const inputBase: React.CSSProperties = {
  width: "100%",
  height: 44,
  borderRadius: 10,
  border: "1px solid #DEDEDE",
  padding: "0 14px",
  fontFamily: "var(--font-jakarta)",
  fontSize: "0.9rem",
  color: "#111",
  outline: "none",
  background: "#fff",
  transition: "border-color 0.15s",
  boxSizing: "border-box" as const,
}

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

// ── Initials avatar (mirrors branding preview) ────────────────────────
function Initials({ name, color, size }: { name: string; color: string; size: number }) {
  const words = name.trim().split(/\s+/)
  const letters = words.length >= 2
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.22,
      background: color, display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: "var(--font-jakarta)",
      fontSize: size * 0.36, fontWeight: 800, color: "#fff", flexShrink: 0,
    }}>
      {letters}
    </div>
  )
}

// ── Phone-frame preview ───────────────────────────────────────────────
function PagePreview({
  tagline, about, services, whatsapp, branding,
}: {
  tagline: string
  about: string
  services: Service[]
  whatsapp: string
  branding: SavedBranding
}) {
  const color = branding.brandColor ?? "#5B4CF5"
  const bizName = "Your Business"

  return (
    <div style={{
      width: 260,
      border: "10px solid #1A1A2E",
      borderRadius: 32,
      overflow: "hidden",
      boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
      flexShrink: 0,
      background: "#fff",
      position: "sticky",
      top: 100,
    }}>
      {/* Status bar */}
      <div style={{ height: 28, background: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 60, height: 8, borderRadius: 4, background: "#2A2A3E" }} />
      </div>

      {/* Page content */}
      <div style={{ maxHeight: 540, overflowY: "auto", background: "#FAFAFA" }}>
        {/* Hero header */}
        <div style={{ background: color, padding: "20px 16px 24px", textAlign: "center" }}>
          {branding.logoUrl ? (
            <img src={branding.logoUrl} alt="logo" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "contain", marginBottom: 8, background: "rgba(255,255,255,0.15)" }} />
          ) : (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <Initials name={bizName} color="rgba(255,255,255,0.25)" size={44} />
            </div>
          )}
          <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
            {bizName}
          </div>
          {tagline && (
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 10, color: "rgba(255,255,255,0.80)", marginTop: 4, lineHeight: 1.4 }}>
              {tagline}
            </div>
          )}
        </div>

        {/* About */}
        {about && (
          <div style={{ padding: "14px 14px 0" }}>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 9.5, color: "#555", lineHeight: 1.6 }}>
              {about.length > 160 ? about.slice(0, 157) + "…" : about}
            </div>
          </div>
        )}

        {/* Services */}
        {services.some((s) => s.name.trim()) && (
          <div style={{ padding: "14px" }}>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 9, fontWeight: 700, color: "#AAA", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Services
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {services.filter((s) => s.name.trim()).slice(0, 5).map((s) => (
                <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "#fff", borderRadius: 8, border: "1px solid #EBEBEB" }}>
                  <span style={{ fontFamily: "var(--font-jakarta)", fontSize: 9.5, fontWeight: 600, color: "#111" }}>
                    {s.name}
                  </span>
                  {s.price && (
                    <span style={{ fontFamily: "var(--font-jakarta)", fontSize: 9.5, fontWeight: 700, color: color }}>
                      {formatNaira(Number(s.price))}
                    </span>
                  )}
                </div>
              ))}
              {services.filter((s) => s.name.trim()).length > 5 && (
                <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 8.5, color: "#AAA", textAlign: "center", padding: "4px 0" }}>
                  +{services.filter((s) => s.name.trim()).length - 5} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* WhatsApp CTA */}
        {whatsapp && (
          <div style={{ padding: "0 14px 16px" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              height: 34, borderRadius: 8, background: color,
              fontFamily: "var(--font-jakarta)", fontSize: 10, fontWeight: 700, color: "#fff",
            }}>
              <Phone size={11} />
              Chat on WhatsApp
            </div>
          </div>
        )}

        {/* Powered by footer */}
        <div style={{ padding: "10px 14px 14px", textAlign: "center", borderTop: "1px solid #F3F4F6" }}>
          <span style={{ fontFamily: "var(--font-jakarta)", fontSize: 8, color: "#CCC" }}>
            Powered by Ojúòwò
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Main form ─────────────────────────────────────────────────────────
export function MyPageForm() {
  const [tagline, setTagline]       = useState("")
  const [about, setAbout]           = useState("")
  const [services, setServices]     = useState<Service[]>([makeService()])
  const [whatsapp, setWhatsapp]     = useState("")
  const [whatsappError, setWhatsappError] = useState("")
  const [branding, setBranding]     = useState<SavedBranding>({})
  const [saveState, setSaveState]   = useState<"idle" | "saved" | "error">("idle")
  const [isExisting, setIsExisting] = useState(false)
  const newServiceRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    try {
      const b = localStorage.getItem(BRANDING_KEY)
      if (b) setBranding(JSON.parse(b) as SavedBranding)
    } catch {}
    try {
      const raw = localStorage.getItem(MY_PAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as SavedMyPage
      setTagline(saved.tagline ?? "")
      setAbout(saved.about ?? "")
      setServices(saved.services?.length
        ? saved.services.map((s) => ({
            id: s.id,
            name: s.name,
            price: s.priceKobo > 0 ? String(s.priceKobo / 100) : "",
            nameError: "",
          }))
        : [makeService()])
      setWhatsapp(saved.whatsapp ?? "")
      setIsExisting(true)
    } catch {}
  }, [])

  // ── Service mutators ──────────────────────────────────────────────
  function updateService(id: string, patch: Partial<Service>) {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
    if (saveState === "saved") setSaveState("idle")
  }

  function removeService(id: string) {
    setServices((prev) => prev.filter((s) => s.id !== id))
    if (saveState === "saved") setSaveState("idle")
  }

  function addService() {
    setServices((prev) => [...prev, makeService()])
    setTimeout(() => newServiceRef.current?.focus(), 50)
  }

  function handleServiceNameBlur(id: string, val: string) {
    if (!val.trim()) return
    const dupe = services.some((s) => s.id !== id && s.name.trim().toLowerCase() === val.trim().toLowerCase())
    updateService(id, { nameError: dupe ? "You already listed this service." : "" })
  }

  // ── WhatsApp ──────────────────────────────────────────────────────
  function handleWhatsappChange(raw: string) {
    setWhatsapp(normalisePhone(raw))
    setWhatsappError("")
    if (saveState === "saved") setSaveState("idle")
  }

  function handleWhatsappBlur() {
    if (!whatsapp) return
    if (whatsapp.length !== 11) setWhatsappError("Enter an 11-digit Nigerian mobile number.")
  }

  // ── Save ──────────────────────────────────────────────────────────
  function handleSave() {
    let hasError = false

    // Validate services
    const validatedServices = services.map((s) => {
      if (!s.name.trim()) return { ...s, nameError: "Service name is required." }
      const dupe = services.some((o) => o.id !== s.id && o.name.trim().toLowerCase() === s.name.trim().toLowerCase())
      return { ...s, nameError: dupe ? "You already listed this service." : "" }
    })
    setServices(validatedServices)
    if (validatedServices.some((s) => s.nameError)) hasError = true

    if (!tagline.trim()) hasError = true

    if (whatsapp && whatsapp.length !== 11) {
      setWhatsappError("Enter an 11-digit Nigerian mobile number.")
      hasError = true
    }

    if (hasError) return

    try {
      const toSave: SavedMyPage = {
        tagline: tagline.trim(),
        about: about.trim(),
        services: validatedServices.map((s) => ({
          id: s.id,
          name: s.name.trim(),
          priceKobo: s.price ? Number(s.price) * 100 : 0,
        })),
        whatsapp,
      }
      localStorage.setItem(MY_PAGE_KEY, JSON.stringify(toSave))
      const existing = JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? "{}") as Record<string, boolean>
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ ...existing, myPage: true }))
      setSaveState("saved")
    } catch {
      setSaveState("error")
    }
  }

  const taglineError = saveState !== "idle" && !tagline.trim() ? "Tagline is required." : ""
  const canSave = tagline.trim() && services.some((s) => s.name.trim()) && services.every((s) => !s.nameError) && !whatsappError

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #EBEBEB",
    borderRadius: 16,
    padding: "24px 28px",
    marginBottom: 14,
  }

  const smLabel: React.CSSProperties = {
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.775rem",
    fontWeight: 600,
    color: "#555",
    marginBottom: 6,
    display: "block",
  }

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
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

      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        {/* ── Left: form ──────────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={card}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.01em", marginBottom: 4 }}>
              My Page
            </div>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#777", lineHeight: 1.5 }}>
              Your public business page. Customers open it from their tracking link or when you share your link on WhatsApp.
            </div>
          </div>

          {/* Tagline */}
          <div style={card}>
            <label style={fieldLabel}>
              Tagline <span style={{ color: "var(--color-error)", marginLeft: 2 }}>*</span>
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => { setTagline(e.target.value.slice(0, 80)); if (saveState === "saved") setSaveState("idle") }}
              placeholder="e.g. Premium tailoring for Lagos professionals"
              style={{ ...inputBase, border: `1px solid ${taglineError ? "var(--color-error)" : "#DEDEDE"}` }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              {taglineError
                ? <ErrorMsg msg={taglineError} />
                : <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: "#AAA" }}>One line that tells customers what you do</span>
              }
              <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: tagline.length > 72 ? "var(--color-warning)" : "#CCC", marginLeft: "auto" }}>
                {tagline.length}/80
              </span>
            </div>
          </div>

          {/* About */}
          <div style={card}>
            <label style={fieldLabel}>
              About Your Business
              <span style={{ fontWeight: 400, color: "#AAA", marginLeft: 5 }}>(optional)</span>
            </label>
            <textarea
              value={about}
              onChange={(e) => { setAbout(e.target.value.slice(0, 500)); if (saveState === "saved") setSaveState("idle") }}
              placeholder="e.g. We have been crafting bespoke garments in Lagos since 2015. Every piece is made to order with premium fabrics and finished by hand."
              rows={4}
              style={{
                width: "100%", borderRadius: 10, border: "1px solid #DEDEDE",
                padding: "10px 14px", fontFamily: "var(--font-jakarta)",
                fontSize: "0.9rem", color: "#111", outline: "none",
                background: "#fff", resize: "vertical", lineHeight: 1.6,
                boxSizing: "border-box", transition: "border-color 0.15s",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
              <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: about.length > 460 ? "var(--color-warning)" : "#CCC" }}>
                {about.length}/500
              </span>
            </div>
          </div>

          {/* Services */}
          <div style={card}>
            <label style={fieldLabel}>
              Services <span style={{ color: "var(--color-error)", marginLeft: 2 }}>*</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 36px", gap: 8, marginBottom: 6, paddingBottom: 6, borderBottom: "1px solid #F3F4F6" }}>
              <span style={{ ...smLabel, marginBottom: 0 }}>Service Name</span>
              <span style={{ ...smLabel, marginBottom: 0 }}>Price (optional)</span>
              <span />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {services.map((svc, idx) => (
                <div key={svc.id}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 36px", gap: 8, alignItems: "flex-start" }}>
                    <div>
                      <input
                        ref={idx === services.length - 1 ? newServiceRef : undefined}
                        type="text"
                        value={svc.name}
                        onChange={(e) => updateService(svc.id, { name: e.target.value, nameError: "" })}
                        onBlur={() => handleServiceNameBlur(svc.id, svc.name)}
                        placeholder="e.g. Bespoke suit"
                        style={{ ...inputBase, height: 40, border: `1px solid ${svc.nameError ? "var(--color-error)" : "#DEDEDE"}` }}
                      />
                      <ErrorMsg msg={svc.nameError} />
                    </div>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "#AAA", pointerEvents: "none" }}>₦</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={svc.price}
                        onChange={(e) => updateService(svc.id, { price: e.target.value.replace(/[^\d]/g, "") })}
                        placeholder="0"
                        style={{ ...inputBase, height: 40, paddingLeft: 24, textAlign: "right" }}
                      />
                    </div>
                    <button
                      onClick={() => removeService(svc.id)}
                      disabled={services.length === 1}
                      title="Remove"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 36, height: 40, borderRadius: 8, border: "none",
                        background: services.length === 1 ? "#F9FAFB" : "var(--color-error-bg)",
                        cursor: services.length === 1 ? "not-allowed" : "pointer",
                        color: services.length === 1 ? "#CCC" : "var(--color-error)",
                        boxShadow: "none", flexShrink: 0,
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addService}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                height: 38, padding: "0 14px", borderRadius: 10, marginTop: 10,
                border: "2px dashed #DEDEDE", background: "transparent",
                fontFamily: "var(--font-jakarta)", fontSize: "0.8rem",
                fontWeight: 600, color: "#777", cursor: "pointer",
                transition: "border-color 0.15s, color 0.15s", boxShadow: "none",
              }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--color-accent)"; b.style.color = "var(--color-accent)" }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "#DEDEDE"; b.style.color = "#777" }}
            >
              <Plus size={13} />
              Add Service
            </button>
          </div>

          {/* Contact */}
          <div style={card}>
            <label style={fieldLabel}>
              WhatsApp Number
              <span style={{ fontWeight: 400, color: "#AAA", marginLeft: 5 }}>(optional)</span>
            </label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 6, pointerEvents: "none" }}>
                <span style={{ fontSize: 16 }}>🇳🇬</span>
                <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "#AAA" }}>+234</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                value={whatsapp}
                onChange={(e) => handleWhatsappChange(e.target.value)}
                onBlur={handleWhatsappBlur}
                placeholder="08012345678"
                style={{ ...inputBase, paddingLeft: 80, border: `1px solid ${whatsappError ? "var(--color-error)" : "#DEDEDE"}` }}
              />
            </div>
            {whatsappError
              ? <ErrorMsg msg={whatsappError} />
              : <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: "#AAA", marginTop: 5 }}>
                  Customers tap a button to open WhatsApp and message you directly.
                </div>
            }
          </div>

          {/* Save bar */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, marginTop: 4 }}>
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
                transition: "background 0.2s", boxShadow: "none",
              }}
            >
              {saveState === "saved" ? (
                <><CheckCircle2 size={16} /> Saved</>
              ) : isExisting ? "Save Changes" : "Publish Page"}
            </button>
          </div>

          {saveState === "error" && (
            <div style={{ marginTop: 10, padding: "10px 14px", background: "var(--color-error-bg)", border: "1px solid var(--color-error-border)", borderRadius: 8, fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "var(--color-error)" }}>
              Could not save. Please try again.
            </div>
          )}
        </div>

        {/* ── Right: preview ───────────────────────────────────────────── */}
        <PagePreview
          tagline={tagline}
          about={about}
          services={services}
          whatsapp={whatsapp}
          branding={branding}
        />
      </div>
    </div>
  )
}
