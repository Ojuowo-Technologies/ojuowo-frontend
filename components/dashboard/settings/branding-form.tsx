"use client"

import { useState, useRef, useEffect, type DragEvent, type ChangeEvent } from "react"
import { Upload, Check, AlertTriangle, CheckCircle2, ArrowLeft, Palette, Trash2, RefreshCw } from "lucide-react"
import { HexColorPicker } from "react-colorful"
import Link from "next/link"

// ── Storage ───────────────────────────────────────────────────────────
const BRANDING_KEY = "oj_branding"
const ONBOARDING_KEY = "oj_onboarding"

// ── File constraints ──────────────────────────────────────────────────
const MAX_BYTES = 5 * 1024 * 1024
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"]
const ACCEPTED_EXT = ".jpg,.jpeg,.png,.svg,.webp"

// ── Color presets ─────────────────────────────────────────────────────
const PRESETS = [
  { hex: "#5B4CF5", name: "Purple" },
  { hex: "#111827", name: "Black" },
  { hex: "#1E3A5F", name: "Navy" },
  { hex: "#0F766E", name: "Teal" },
  { hex: "#B45309", name: "Gold" },
  { hex: "#9333EA", name: "Violet" },
  { hex: "#15803D", name: "Forest" },
  { hex: "#B91C1C", name: "Crimson" },
]

// ── WCAG contrast helpers ─────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace("#", "")
  if (h.length !== 6) return null
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  if ([r, g, b].some(isNaN)) return null
  return [r, g, b]
}

function getLuminance(r: number, g: number, b: number): number {
  return [r, g, b]
    .map((c) => {
      const s = c / 255
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
    })
    .reduce((acc, c, i) => acc + [0.2126, 0.7152, 0.0722][i] * c, 0)
}

function contrastWithWhite(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  return 1.05 / (getLuminance(...rgb) + 0.05)
}

function isValidHex(v: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(v)
}

// ── Invoice preview ───────────────────────────────────────────────────
function InvoicePreview({ logoUrl, color }: { logoUrl: string | null; color: string }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: 12,
      overflow: "hidden",
      width: "100%",
      fontFamily: "var(--font-jakarta)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    }}>
      {/* Invoice header */}
      <div style={{ background: color, padding: "22px 28px", display: "flex", alignItems: "center", gap: 16 }}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Business logo"
            style={{ width: 52, height: 52, borderRadius: 8, objectFit: "contain", background: "rgba(255,255,255,0.15)", flexShrink: 0 }}
          />
        ) : (
          <div style={{ width: 52, height: 52, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0, letterSpacing: "0.02em" }}>
            SIG
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>S.I.G Clothing</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>Invoice</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>INV-0024</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Nov 23, 2026</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 28px" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#111", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Billed to</div>
          <div style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>Adunola Adeyemi</div>
          <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>+234 801 234 5678</div>
        </div>

        <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 14 }}>
          {[["Ankara Suit, Top + Trouser", "₦35,000"], ["Express delivery fee", "₦2,500"]].map(([label, amount], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#333", marginBottom: 8, gap: 12 }}>
              <span style={{ flex: 1, minWidth: 0 }}>{label}</span>
              <span style={{ fontWeight: 600, flexShrink: 0 }}>{amount}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #F3F4F6", marginTop: 10, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Total</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: color }}>₦37,500</span>
        </div>

        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#777" }}>Paid: ₦15,000</span>
          <span style={{ background: "#FEF3C7", color: "#92400E", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
            Balance ₦22,500
          </span>
        </div>
      </div>

      <div style={{ padding: "14px 28px", background: "#F9FAFB", borderTop: "1px solid #F3F4F6" }}>
        <div style={{ fontSize: 11, color: "#777" }}>Pay to: Access Bank · 0123456789 · S.I.G Clothing</div>
        <div style={{ fontSize: 10, color: "#BBB", marginTop: 4 }}>Powered by Ojúòwò</div>
      </div>
    </div>
  )
}

// ── Main form ─────────────────────────────────────────────────────────
export function BrandingForm() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [logoName, setLogoName] = useState<string>("")
  const [uploadError, setUploadError] = useState<"size" | "format" | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const [brandColor, setBrandColor] = useState<string>("#5B4CF5")
  const [pickerOpen, setPickerOpen] = useState(false)
  const [hexInput, setHexInput] = useState<string>("#5B4CF5")
  const [hexInputError, setHexInputError] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle")
  const [isExisting, setIsExisting] = useState(false)

  // Load saved branding on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BRANDING_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as { logoUrl?: string; brandColor?: string }
      if (saved.logoUrl) { setLogoUrl(saved.logoUrl); setLogoName("Saved logo") }
      if (saved.brandColor) {
        setBrandColor(saved.brandColor)
        setHexInput(saved.brandColor)
      }
      setIsExisting(true)
    } catch {}
  }, [])

  // ── File processing ────────────────────────────────────────────────
  function processFile(file: File) {
    setUploadError(null)
    if (!ACCEPTED_TYPES.includes(file.type)) { setUploadError("format"); return }
    if (file.size > MAX_BYTES) { setUploadError("size"); return }
    const reader = new FileReader()
    reader.onload = (e) => {
      setLogoUrl(e.target?.result as string)
      setLogoName(file.name)
    }
    reader.readAsDataURL(file)
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    // Reset input so the same file can be re-selected after removal
    e.target.value = ""
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function removeLogo() {
    setLogoUrl(null)
    setLogoName("")
    setUploadError(null)
  }

  // ── Color selection ────────────────────────────────────────────────
  function selectPreset(hex: string) {
    setBrandColor(hex)
    setHexInput(hex)
    setPickerOpen(false)
    setHexInputError(false)
  }

  function handlePickerChange(hex: string) {
    setBrandColor(hex)
    setHexInput(hex)
    setHexInputError(false)
  }

  function handleHexInputChange(e: ChangeEvent<HTMLInputElement>) {
    let val = e.target.value.trim()
    if (val && !val.startsWith("#")) val = "#" + val
    setHexInput(val)
    setHexInputError(false)
    if (isValidHex(val)) setBrandColor(val)
  }

  function handleHexInputBlur() {
    if (hexInput && !isValidHex(hexInput)) setHexInputError(true)
  }

  // Close picker on outside click
  useEffect(() => {
    if (!pickerOpen) return
    function handleOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [pickerOpen])

  // ── Contrast check ─────────────────────────────────────────────────
  const contrast = contrastWithWhite(brandColor)
  const contrastWarn = contrast < 3.0

  // ── Save ───────────────────────────────────────────────────────────
  function handleSave() {
    try {
      localStorage.setItem(BRANDING_KEY, JSON.stringify({ logoUrl, brandColor }))
      const existing = JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? "{}") as Record<string, boolean>
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ ...existing, branding: true }))
      setSaveState("saved")
    } catch {
      setSaveState("error")
    }
  }

  // ── Shared card style ──────────────────────────────────────────────
  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #EBEBEB",
    borderRadius: 16,
    padding: "24px 28px",
    marginBottom: 16,
  }

  const sectionLabel: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#0D0D0D",
    letterSpacing: "-0.01em",
    marginBottom: 4,
  }

  const sectionSub: React.CSSProperties = {
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.825rem",
    color: "#777",
    lineHeight: 1.5,
    marginBottom: 20,
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Back link */}
      <Link
        href="/dashboard/setup"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-jakarta)", fontSize: "0.825rem",
          fontWeight: 500, color: "#777", textDecoration: "none",
          marginBottom: 24,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#777")}
      >
        <ArrowLeft size={14} />
        Get Started
      </Link>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>

        {/* ── Left: form ────────────────────────────────────────────── */}
        <div>
          {/* ── Logo section ──────────────────────────────────────── */}
          <div style={card}>
            <div style={sectionLabel}>Business Logo</div>
            <div style={sectionSub}>
              Upload a PNG, JPG, SVG or WEBP file. Max 5 MB. Your logo appears on every invoice and your public business page.
            </div>

            {/* Drop zone / preview */}
            {logoUrl ? (
              <div style={{
                border: "1px solid #EBEBEB",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "#FAFAFA",
              }}>
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  style={{ width: 72, height: 72, objectFit: "contain", borderRadius: 8, background: "#F3F4F6", flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", fontWeight: 600, color: "#111", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {logoName}
                  </div>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "#777" }}>
                    Logo uploaded
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <RefreshCw size={13} />
                    Replace
                  </button>
                  <button
                    onClick={removeLogo}
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-error)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  border: `2px dashed ${isDragging ? "var(--color-accent)" : uploadError ? "var(--color-error)" : "#DEDEDE"}`,
                  borderRadius: 12,
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  background: isDragging ? "var(--color-accent-muted)" : "#FAFAFA",
                  transition: "all 0.15s",
                  userSelect: "none",
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: isDragging ? "var(--color-accent-light)" : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}>
                  <Upload size={20} style={{ color: isDragging ? "var(--color-accent)" : "#999" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", fontWeight: 600, color: isDragging ? "var(--color-accent)" : "#333" }}>
                    {isDragging ? "Drop your logo here" : "Click to upload or drag and drop"}
                  </div>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "#999", marginTop: 4 }}>
                    PNG, JPG, SVG, WEBP · Max 5 MB
                  </div>
                </div>
              </div>
            )}

            {/* Upload errors */}
            {uploadError && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 10, padding: "10px 14px", background: "var(--color-error-bg)", border: "1px solid var(--color-error-border)", borderRadius: 8 }}>
                <AlertTriangle size={14} style={{ color: "var(--color-error)", flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "var(--color-error)", lineHeight: 1.4 }}>
                  {uploadError === "size"
                    ? "That file is too large. Please use an image under 5 MB. You can resize it in Photos or Preview before uploading."
                    : "That file type is not supported. Please upload a PNG, JPG, SVG, or WEBP image."}
                </span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_EXT}
              onChange={handleFileChange}
              style={{ display: "none" }}
              aria-label="Upload business logo"
            />

            {/* Skip nudge */}
            {!logoUrl && (
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "#AAA", marginTop: 12 }}>
                No logo yet? You can skip this for now and add it later. Your initials will show as a placeholder on invoices.
              </p>
            )}
          </div>

          {/* ── Brand color section ────────────────────────────────── */}
          <div style={card}>
            <div style={sectionLabel}>Brand Color</div>
            <div style={sectionSub}>
              This color appears on your invoice header, the total amount, and your public business page. Choose something that represents your business.
            </div>

            {/* Preset swatches + custom picker in one row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              {PRESETS.map(({ hex, name }) => {
                const selected = !pickerOpen && brandColor === hex
                return (
                  <button
                    key={hex}
                    onClick={() => selectPreset(hex)}
                    title={name}
                    aria-label={`${name} (${hex})`}
                    aria-pressed={selected}
                    style={{
                      width: 40, height: 40, flexShrink: 0,
                      borderRadius: "50%",
                      background: hex,
                      border: selected ? "3px solid #fff" : "2px solid transparent",
                      outline: selected ? `3px solid ${hex}` : "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.1s, outline 0.1s",
                      transform: selected ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {selected && <Check size={13} strokeWidth={3} style={{ color: "#fff" }} />}
                  </button>
                )
              })}
            </div>

            {/* Custom color — wheel trigger + popover */}
            <div ref={pickerRef} style={{ position: "relative", display: "inline-block" }}>
              <button
                onClick={() => setPickerOpen((v) => !v)}
                title="Custom color"
                aria-label="Open color picker"
                aria-expanded={pickerOpen}
                style={{
                  width: 40, height: 40, borderRadius: "50%", cursor: "pointer",
                  border: pickerOpen ? "3px solid #fff" : "2px solid transparent",
                  outline: pickerOpen ? `3px solid ${brandColor}` : "none",
                  background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "outline 0.1s, transform 0.1s",
                  transform: pickerOpen ? "scale(1.1)" : "scale(1)",
                  flexShrink: 0,
                }}
              >
                <Palette size={14} style={{ color: "#fff", filter: "drop-shadow(0 0 2px rgba(0,0,0,0.6))" }} />
              </button>

              {pickerOpen && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  zIndex: 50,
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 14,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                  padding: 16,
                  width: 232,
                }}>
                  {/* react-colorful wheel */}
                  <HexColorPicker
                    color={brandColor}
                    onChange={handlePickerChange}
                    style={{ width: "100%", height: 180 }}
                  />

                  {/* Hex input + preview swatch */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: brandColor, flexShrink: 0, border: "1px solid rgba(0,0,0,0.08)" }} />
                    <input
                      type="text"
                      value={hexInput}
                      onChange={handleHexInputChange}
                      onBlur={handleHexInputBlur}
                      placeholder="#000000"
                      maxLength={7}
                      style={{
                        flex: 1,
                        height: 32,
                        borderRadius: 7,
                        border: `1px solid ${hexInputError ? "var(--color-error)" : "#DEDEDE"}`,
                        padding: "0 10px",
                        fontFamily: "var(--font-jakarta)",
                        fontSize: "0.825rem",
                        color: "#111",
                        outline: "none",
                        letterSpacing: "0.04em",
                        background: "#fff",
                      }}
                      aria-label="Hex color code"
                    />
                  </div>
                  {hexInputError && (
                    <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "var(--color-error)", marginTop: 6 }}>
                      Enter a valid hex code, e.g. #3A86FF
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contrast warning */}
            {contrastWarn && isValidHex(brandColor) && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 14, padding: "10px 14px", background: "var(--color-warning-bg)", border: "1px solid var(--color-warning-border)", borderRadius: 8 }}>
                <AlertTriangle size={14} style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-warning)", lineHeight: 1.3 }}>
                    Low contrast ({contrast.toFixed(1)}:1)
                  </div>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "#92400E", lineHeight: 1.5, marginTop: 2 }}>
                    White text on this color may be hard to read on invoices and your public page. A contrast ratio of 3.0:1 or higher is recommended. Try a darker shade.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Save bar ───────────────────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
            {saveState === "saved" && (
              <Link
                href="/dashboard/setup"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  height: 44, padding: "0 20px", borderRadius: 10,
                  fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", fontWeight: 600,
                  color: "var(--color-accent)", background: "var(--color-accent-muted)",
                  border: "none", textDecoration: "none", transition: "background 0.15s",
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
                background: saveState === "saved" ? "#16a34a" : "var(--color-accent)",
                border: "none", cursor: saveState === "saved" ? "default" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {saveState === "saved" ? (
                <><CheckCircle2 size={16} /> Saved</>
              ) : isExisting ? (
                "Save Changes"
              ) : (
                "Save"
              )}
            </button>
          </div>

          {saveState === "error" && (
            <div style={{ marginTop: 10, padding: "10px 14px", background: "var(--color-error-bg)", border: "1px solid var(--color-error-border)", borderRadius: 8, fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "var(--color-error)" }}>
              Could not save. Your browser may be blocking storage. Please try again.
            </div>
          )}
        </div>

        {/* ── Right: live preview ────────────────────────────────────── */}
        <div style={{ position: "sticky", top: 100 }}>
          <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "#AAA", marginBottom: 10 }}>
            Invoice Preview
          </div>
          <InvoicePreview logoUrl={logoUrl} color={brandColor} />
        </div>
      </div>
    </div>
  )
}
