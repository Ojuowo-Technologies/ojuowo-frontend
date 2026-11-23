"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import { ArrowLeft, CheckCircle2, AlertTriangle, Building2, Info } from "lucide-react"
import Link from "next/link"

// ── Storage ───────────────────────────────────────────────────────────
const BANK_KEY = "oj_bank"
const ONBOARDING_KEY = "oj_onboarding"

// ── Bank data ─────────────────────────────────────────────────────────
type Bank = {
  name: string   // display name
  slug: string   // nigerianbanks.xyz logo slug
  abbr: string   // fallback initials
  color: string  // fallback brand color
}

const BANKS: Bank[] = [
  { name: "Access Bank",                       slug: "access-bank",                      abbr: "ACC",  color: "#E31E24" },
  { name: "Citibank Nigeria",                  slug: "citibank-nigeria",                  abbr: "CITI", color: "#003B70" },
  { name: "Ecobank Nigeria",                   slug: "ecobank-nigeria",                   abbr: "ECO",  color: "#003087" },
  { name: "Fidelity Bank",                     slug: "fidelity-bank",                     abbr: "FID",  color: "#118A2C" },
  { name: "First Bank of Nigeria",             slug: "first-bank-of-nigeria",             abbr: "FBN",  color: "#002D5B" },
  { name: "First City Monument Bank (FCMB)",   slug: "first-city-monument-bank",          abbr: "FCMB", color: "#E8450C" },
  { name: "Globus Bank",                       slug: "globus-bank",                       abbr: "GLO",  color: "#0066CC" },
  { name: "Guaranty Trust Bank (GTBank)",      slug: "guaranty-trust-bank",               abbr: "GTB",  color: "#F97316" },
  { name: "Jaiz Bank",                         slug: "jaiz-bank",                         abbr: "JAIZ", color: "#009A44" },
  { name: "Keystone Bank",                     slug: "keystone-bank",                     abbr: "KEY",  color: "#003366" },
  { name: "Kuda Bank",                         slug: "kuda-bank",                         abbr: "KUD",  color: "#60269E" },
  { name: "Lotus Bank",                        slug: "lotus-bank",                        abbr: "LTB",  color: "#00703C" },
  { name: "Moniepoint MFB",                    slug: "moniepoint-microfinance-bank",      abbr: "MON",  color: "#0C4B3A" },
  { name: "Opay",                              slug: "opay",                              abbr: "OPY",  color: "#2CBD48" },
  { name: "PalmPay",                           slug: "palmpay",                           abbr: "PPY",  color: "#01C854" },
  { name: "Parallex Bank",                     slug: "parallex-bank",                     abbr: "PAR",  color: "#1A237E" },
  { name: "Polaris Bank",                      slug: "polaris-bank",                      abbr: "POL",  color: "#E8001F" },
  { name: "Premium Trust Bank",                slug: "premium-trust-bank",                abbr: "PTB",  color: "#1A1A2E" },
  { name: "Providus Bank",                     slug: "providus-bank",                     abbr: "PRV",  color: "#8B0000" },
  { name: "Rubies Bank",                       slug: "rubies-microfinance-bank",          abbr: "RUB",  color: "#CC0000" },
  { name: "Stanbic IBTC Bank",                 slug: "stanbic-ibtc-bank",                 abbr: "STB",  color: "#009EE0" },
  { name: "Standard Chartered Bank",           slug: "standard-chartered-bank",           abbr: "SCB",  color: "#0D9488" },
  { name: "Sterling Bank",                     slug: "sterling-bank",                     abbr: "STR",  color: "#CE0033" },
  { name: "SunTrust Bank",                     slug: "suntrust-bank",                     abbr: "SUN",  color: "#F4A100" },
  { name: "TAJBank",                           slug: "tajbank",                           abbr: "TAJ",  color: "#006633" },
  { name: "Titan Trust Bank",                  slug: "titan-trust-bank",                  abbr: "TTB",  color: "#003366" },
  { name: "Union Bank of Nigeria",             slug: "union-bank-of-nigeria",             abbr: "UBN",  color: "#231F20" },
  { name: "United Bank for Africa (UBA)",      slug: "united-bank-for-africa",            abbr: "UBA",  color: "#E31E24" },
  { name: "Unity Bank",                        slug: "unity-bank",                        abbr: "UTY",  color: "#008000" },
  { name: "VFD Microfinance Bank",             slug: "vfd-microfinance-bank",             abbr: "VFD",  color: "#1D1D1B" },
  { name: "Wema Bank",                         slug: "wema-bank",                         abbr: "WEM",  color: "#863991" },
  { name: "Zenith Bank",                       slug: "zenith-bank",                       abbr: "ZEN",  color: "#EC1C23" },
]

// ── Bank logo with initials fallback ──────────────────────────────────
function BankLogo({ bank, size = 28 }: { bank: Bank; size?: number }) {
  const [imgError, setImgError] = useState(false)
  const radius = Math.round(size * 0.25)
  const fontSize = Math.round(size * 0.32)

  return imgError ? (
    <div style={{
      width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: bank.color, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize, fontWeight: 800,
      color: "#fff", fontFamily: "var(--font-jakarta)", letterSpacing: "0.01em",
    }}>
      {bank.abbr.slice(0, 3)}
    </div>
  ) : (
    <img
      src={`https://nigerianbanks.xyz/logo/${bank.slug}.png`}
      alt={bank.name}
      width={size}
      height={size}
      onError={() => setImgError(true)}
      style={{ width: size, height: size, borderRadius: radius, objectFit: "contain", flexShrink: 0 }}
    />
  )
}

type SavedBank = { bankName: string; accountNumber: string; accountName: string }

// ── Fake NUBAN lookup (replace with real API call when backend is ready) ──
function simulateLookup(accountNumber: string, bankName: string): Promise<string | null> {
  // Deterministic fake name based on digits — real implementation calls the backend
  const fakeNames: Record<string, string> = {
    "0123456789": "S.I.G CLOTHING LTD",
    "1234567890": "ADUNOLA ADEYEMI",
    "9876543210": "BRIGHT TAILORS NIG",
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeNames[accountNumber] ?? "BUSINESS ACCOUNT")
    }, 1200)
  })
}

export function BankForm() {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [bankSearch, setBankSearch] = useState("")
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [lookupState, setLookupState] = useState<"idle" | "loading" | "success" | "failed">("idle")
  const [confirmed, setConfirmed] = useState(false)
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle")
  const [isExisting, setIsExisting] = useState(false)
  const [accountNumberError, setAccountNumberError] = useState("")

  // Load saved data on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BANK_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as SavedBank
      if (saved.bankName) {
        const match = BANKS.find((b) => b.name === saved.bankName)
        if (match) setSelectedBank(match)
      }
      if (saved.accountNumber) setAccountNumber(saved.accountNumber)
      if (saved.accountName) {
        setAccountName(saved.accountName)
        setLookupState("success")
        setConfirmed(true)
      }
      setIsExisting(true)
    } catch {}
  }, [])

  // ── NUBAN lookup — fires when account number reaches 10 digits ────────
  useEffect(() => {
    if (accountNumber.length !== 10 || !selectedBank) return
    setLookupState("loading")
    setAccountName("")
    setConfirmed(false)
    simulateLookup(accountNumber, selectedBank.name).then((name) => {
      if (name) {
        setAccountName(name)
        setLookupState("success")
      } else {
        setLookupState("failed")
      }
    })
  }, [accountNumber, selectedBank])

  // ── Handlers ──────────────────────────────────────────────────────────
  function handleAccountNumberChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10)
    setAccountNumber(val)
    setAccountNumberError("")
    setAccountName("")
    setConfirmed(false)
    setLookupState("idle")
    if (saveState === "saved") setSaveState("idle")
  }

  function handleAccountNumberBlur() {
    if (accountNumber.length > 0 && accountNumber.length < 10) {
      setAccountNumberError("Account numbers are 10 digits. Please check and try again.")
    }
  }

  function selectBank(bank: Bank) {
    setSelectedBank(bank)
    setBankSearch("")
    setBankDropdownOpen(false)
    setAccountName("")
    setConfirmed(false)
    setLookupState("idle")
    if (saveState === "saved") setSaveState("idle")
  }

  function handleSave() {
    if (!selectedBank || accountNumber.length !== 10 || !confirmed) return
    try {
      localStorage.setItem(BANK_KEY, JSON.stringify({ bankName: selectedBank.name, accountNumber, accountName }))
      const existing = JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? "{}") as Record<string, boolean>
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ ...existing, bank: true }))
      setSaveState("saved")
    } catch {
      setSaveState("error")
    }
  }

  const canSave = selectedBank && accountNumber.length === 10 && confirmed
  const filteredBanks = BANKS.filter((b) => b.name.toLowerCase().includes(bankSearch.toLowerCase()))

  // ── Shared styles ─────────────────────────────────────────────────────
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
    marginBottom: 7,
    display: "block",
  }

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    height: 44,
    borderRadius: 10,
    border: `1px solid ${hasError ? "var(--color-error)" : "#DEDEDE"}`,
    padding: "0 14px",
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.9rem",
    color: "#111",
    outline: "none",
    background: "#fff",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  })

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
          Bank Details
        </div>
        <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#777", lineHeight: 1.5, marginBottom: 28 }}>
          This account is printed on every invoice so customers know where to pay by transfer.
        </div>

        {/* ── Bank name ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: 20, position: "relative" }}>
          <label style={fieldLabel}>Bank</label>
          <div
            onClick={() => setBankDropdownOpen((v) => !v)}
            style={{
              ...inputStyle(false),
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer", userSelect: "none",
              color: selectedBank ? "#111" : "#AAA",
            }}
          >
            {selectedBank ? (
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <BankLogo bank={selectedBank} size={22} />
                {selectedBank.name}
              </span>
            ) : (
              <span>Select your bank</span>
            )}
            <Building2 size={16} style={{ color: "#AAA", flexShrink: 0 }} />
          </div>

          {bankDropdownOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
              zIndex: 40, background: "#fff", border: "1px solid #E5E7EB",
              borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              overflow: "hidden",
            }}>
              <div style={{ padding: "10px 12px", borderBottom: "1px solid #F3F4F6" }}>
                <input
                  autoFocus
                  type="text"
                  value={bankSearch}
                  onChange={(e) => setBankSearch(e.target.value)}
                  placeholder="Search banks..."
                  style={{
                    width: "100%", border: "none", outline: "none",
                    fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "#111",
                    background: "transparent",
                  }}
                />
              </div>
              <div style={{ maxHeight: 220, overflowY: "auto" }}>
                {filteredBanks.length > 0 ? (
                  filteredBanks.map((b) => {
                    const isSelected = b.name === selectedBank?.name
                    return (
                      <div
                        key={b.name}
                        onClick={() => selectBank(b)}
                        style={{
                          padding: "10px 14px",
                          display: "flex", alignItems: "center", gap: 10,
                          fontFamily: "var(--font-jakarta)", fontSize: "0.875rem",
                          color: isSelected ? "var(--color-accent)" : "#111",
                          background: isSelected ? "var(--color-accent-muted)" : "transparent",
                          cursor: "pointer",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "#F9FAFB" }}
                        onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = isSelected ? "var(--color-accent-muted)" : "transparent" }}
                      >
                        <BankLogo bank={b} size={24} />
                        {b.name}
                      </div>
                    )
                  })
                ) : (
                  <div style={{ padding: "14px", fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#AAA", textAlign: "center" }}>
                    No banks match. Contact support if yours is missing.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Account number ─────────────────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <label style={fieldLabel}>Account Number</label>
          <input
            type="text"
            inputMode="numeric"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            onBlur={handleAccountNumberBlur}
            placeholder="0123456789"
            maxLength={10}
            style={{
              ...inputStyle(!!accountNumberError),
              letterSpacing: "0.1em",
              fontWeight: 500,
            }}
            aria-label="10-digit NUBAN account number"
          />
          {accountNumberError && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginTop: 7 }}>
              <AlertTriangle size={13} style={{ color: "var(--color-error)", flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "var(--color-error)", lineHeight: 1.4 }}>
                {accountNumberError}
              </span>
            </div>
          )}
        </div>

        {/* ── NUBAN lookup result ────────────────────────────────────── */}
        {lookupState === "loading" && (
          <div style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 10, border: "1px solid #EBEBEB", marginBottom: 20 }}>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", color: "#777", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: "50%", border: "2px solid #DEDEDE", borderTopColor: "var(--color-accent)", animation: "spin 0.7s linear infinite" }} />
              Looking up account name...
            </div>
          </div>
        )}

        {lookupState === "success" && accountName && (
          <div style={{ marginBottom: 20 }}>
            <label style={fieldLabel}>Account Name</label>
            <div style={{
              padding: "12px 16px", background: confirmed ? "var(--color-success-bg)" : "#FAFAFA",
              border: `1px solid ${confirmed ? "var(--color-success-border)" : "#EBEBEB"}`,
              borderRadius: 10, transition: "all 0.2s",
            }}>
              <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.9rem", fontWeight: 700, color: "#111", letterSpacing: "0.02em" }}>
                {accountName}
              </div>
              {!confirmed ? (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "#555" }}>
                    Is this the correct account?
                  </span>
                  <button
                    onClick={() => setConfirmed(true)}
                    style={{
                      height: 30, padding: "0 14px", borderRadius: 7,
                      background: "var(--color-accent)", color: "#fff", border: "none", cursor: "pointer",
                      fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", fontWeight: 700,
                    }}
                  >
                    Yes, that&apos;s mine
                  </button>
                  <button
                    onClick={() => { setAccountNumber(""); setLookupState("idle"); setAccountName("") }}
                    style={{
                      height: 30, padding: "0 12px", borderRadius: 7,
                      background: "transparent", color: "var(--color-error)", border: "1px solid var(--color-error-border)",
                      cursor: "pointer", fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", fontWeight: 600,
                    }}
                  >
                    No, re-enter
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={13} style={{ color: "var(--color-success)" }} />
                  <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "var(--color-success)", fontWeight: 600 }}>
                    Confirmed
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {lookupState === "failed" && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 20, padding: "12px 14px", background: "var(--color-warning-bg)", border: "1px solid var(--color-warning-border)", borderRadius: 10 }}>
            <AlertTriangle size={14} style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", fontWeight: 600, color: "var(--color-warning)" }}>
                Account name lookup failed
              </div>
              <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.775rem", color: "#92400E", marginTop: 2, lineHeight: 1.5 }}>
                We could not confirm this account number with {selectedBank?.name ?? "your bank"}. Check the number and try again, or enter your account name manually below.
              </div>
              <input
                type="text"
                placeholder="Enter account name manually"
                value={accountName}
                onChange={(e) => { setAccountName(e.target.value); if (e.target.value.trim().length > 2) setConfirmed(true) }}
                style={{
                  marginTop: 10, width: "100%", height: 38, borderRadius: 8,
                  border: "1px solid #FDE68A", padding: "0 12px",
                  fontFamily: "var(--font-jakarta)", fontSize: "0.85rem", color: "#111",
                  outline: "none", background: "#fff",
                }}
              />
            </div>
          </div>
        )}

        {/* ── Info banner ────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "11px 14px", background: "var(--color-info-bg)", border: "1px solid var(--color-info-border)", borderRadius: 10 }}>
          <Info size={14} style={{ color: "var(--color-info)", flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8rem", color: "var(--color-info)", lineHeight: 1.5 }}>
            Ojúòwò does not process payments. This account is shown on invoices only so your customers know where to send money.
          </span>
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

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
