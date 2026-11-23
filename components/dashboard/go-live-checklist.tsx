"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"

const ONBOARDING_KEY = "oj_onboarding"

type Step = {
  id: string
  shortLabel: string
  title: string
  description: string
  href: string
}

const STEPS: Step[] = [
  {
    id: "branding",
    shortLabel: "Branding",
    title: "Add Your Logo and Brand Colors",
    description: "Upload your business logo and pick your brand color. Both appear on every invoice and your public business page. First impressions count.",
    href: "/dashboard/settings/branding",
  },
  {
    id: "bank",
    shortLabel: "Bank",
    title: "Add Your Bank Details",
    description: "Add the bank account where you want to receive payments. This shows on every invoice you send so customers know exactly where to pay.",
    href: "/dashboard/settings/bank",
  },
  {
    id: "pay-period",
    shortLabel: "Pay Period",
    title: "Set Your Pay Period",
    description: "Define when your workers get paid: the start day of the pay cycle, the cut-off time, and the actual payday. Workers see this in their app.",
    href: "/dashboard/settings/pay-period",
  },
  {
    id: "staff",
    shortLabel: "Staff",
    title: "Add Your First Staff Member",
    description: "Invite your first worker, manager, or cashier by phone number. They will get a link to download the app and set their own PIN.",
    href: "/dashboard/staff/invite",
  },
  {
    id: "pay-rates",
    shortLabel: "Pay Rates",
    title: "Set Pay Rates",
    description: "Define how much each worker earns per piece, by item type and workflow stage. These rates lock in permanently once a task is approved.",
    href: "/dashboard/staff/pay-rates",
  },
  {
    id: "payment-plan",
    shortLabel: "Payments",
    title: "Set Your Default Payment Plan",
    description: "Choose your default payment structure: full upfront, a deposit now with the balance due later, or installments. You can always override this per order.",
    href: "/dashboard/settings/payments",
  },
  {
    id: "my-page",
    shortLabel: "My Page",
    title: "Preview and Publish Your Business Page",
    description: "Your free public page is pre-built and ready. Customise it, preview it, then publish. Share the link on WhatsApp so customers can track orders from it.",
    href: "/dashboard/my-page",
  },
]

const STEP_ILLUSTRATIONS: Record<string, React.ReactElement> = {
  branding: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#F0EDFF"/>
      <rect x="13" y="11" width="54" height="42" rx="7" fill="white"/>
      <circle cx="40" cy="32" r="12" fill="#EDE9FF"/>
      <circle cx="40" cy="32" r="7" fill="#5B4CF5"/>
      <circle cx="40" cy="32" r="3" fill="white"/>
      <circle cx="20" cy="62" r="7" fill="#5B4CF5"/>
      <circle cx="34" cy="62" r="7" fill="#F472B6"/>
      <circle cx="48" cy="62" r="7" fill="#FB923C"/>
      <circle cx="62" cy="62" r="7" fill="#34D399"/>
    </svg>
  ),
  bank: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#F0EDFF"/>
      <path d="M40 11L70 36H10L40 11Z" fill="#5B4CF5"/>
      <rect x="12" y="36" width="56" height="5" fill="#3730A3"/>
      <rect x="12" y="41" width="56" height="23" fill="#EDE9FF"/>
      <rect x="19" y="43" width="8" height="19" rx="2" fill="white"/>
      <rect x="36" y="43" width="8" height="19" rx="2" fill="white"/>
      <rect x="53" y="43" width="8" height="19" rx="2" fill="white"/>
      <rect x="32" y="53" width="16" height="11" rx="3" fill="#3730A3"/>
      <rect x="8" y="64" width="64" height="5" rx="2" fill="#C4B5FD"/>
    </svg>
  ),
  "pay-period": (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#F0EDFF"/>
      <rect x="10" y="20" width="60" height="52" rx="8" fill="white"/>
      <rect x="10" y="20" width="60" height="20" rx="8" fill="#5B4CF5"/>
      <rect x="10" y="32" width="60" height="8" fill="#5B4CF5"/>
      <circle cx="24" cy="20" r="5" fill="#C4B5FD"/>
      <circle cx="56" cy="20" r="5" fill="#C4B5FD"/>
      <rect x="15" y="44" width="10" height="8" rx="2" fill="#EDE9FF"/>
      <rect x="29" y="44" width="10" height="8" rx="2" fill="#EDE9FF"/>
      <rect x="43" y="44" width="10" height="8" rx="2" fill="#3730A3"/>
      <rect x="57" y="44" width="10" height="8" rx="2" fill="#EDE9FF"/>
      <rect x="15" y="56" width="10" height="8" rx="2" fill="#EDE9FF"/>
      <rect x="29" y="56" width="10" height="8" rx="2" fill="#C4B5FD"/>
      <rect x="43" y="56" width="10" height="8" rx="2" fill="#EDE9FF"/>
      <rect x="57" y="56" width="10" height="8" rx="2" fill="#EDE9FF"/>
    </svg>
  ),
  staff: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#F0EDFF"/>
      <circle cx="30" cy="29" r="12" fill="#C4B5FD"/>
      <path d="M12 66c0-11 8-18 18-18s18 7 18 18" fill="#C4B5FD"/>
      <circle cx="48" cy="29" r="12" fill="#8B7EF8"/>
      <path d="M30 66c0-11 8-18 18-18s18 7 18 18" fill="#8B7EF8"/>
      <circle cx="63" cy="17" r="10" fill="#5B4CF5"/>
      <rect x="58" y="15.75" width="10" height="2.5" rx="1.25" fill="white"/>
      <rect x="61.75" y="12" width="2.5" height="10" rx="1.25" fill="white"/>
    </svg>
  ),
  "pay-rates": (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#F0EDFF"/>
      <ellipse cx="40" cy="62" rx="24" ry="8" fill="#C4B5FD"/>
      <ellipse cx="40" cy="58" rx="24" ry="8" fill="#8B7EF8"/>
      <ellipse cx="40" cy="48" rx="24" ry="8" fill="#C4B5FD"/>
      <ellipse cx="40" cy="44" rx="24" ry="8" fill="#8B7EF8"/>
      <ellipse cx="40" cy="34" rx="24" ry="8" fill="#5B4CF5"/>
      <ellipse cx="40" cy="30" rx="24" ry="8" fill="#EDE9FF"/>
      <text x="40" y="34" textAnchor="middle" fontSize="11" fontWeight="800" fill="#5B4CF5" fontFamily="sans-serif">₦</text>
    </svg>
  ),
  "payment-plan": (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#F0EDFF"/>
      <rect x="22" y="8" width="36" height="54" rx="4" fill="white"/>
      <rect x="29" y="16" width="22" height="3.5" rx="1.75" fill="#C4B5FD"/>
      <rect x="29" y="24" width="15" height="3" rx="1.5" fill="#EDE9FF"/>
      <rect x="29" y="31" width="20" height="3" rx="1.5" fill="#EDE9FF"/>
      <rect x="29" y="38" width="11" height="3" rx="1.5" fill="#C4B5FD"/>
      <rect x="29" y="45" width="17" height="3" rx="1.5" fill="#EDE9FF"/>
      <circle cx="58" cy="64" r="12" fill="#5B4CF5"/>
      <path d="M52.5 64l4 5 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "my-page": (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#F0EDFF"/>
      <rect x="22" y="6" width="36" height="66" rx="9" fill="white" stroke="#C4B5FD" strokeWidth="1.5"/>
      <rect x="34" y="11" width="12" height="4" rx="2" fill="#EDE9FF"/>
      <rect x="22" y="20" width="36" height="16" fill="#5B4CF5"/>
      <circle cx="40" cy="28" r="5" fill="white" fillOpacity="0.25"/>
      <rect x="28" y="40" width="24" height="4" rx="2" fill="#C4B5FD"/>
      <rect x="28" y="48" width="16" height="3" rx="1.5" fill="#EDE9FF"/>
      <rect x="28" y="55" width="20" height="3" rx="1.5" fill="#EDE9FF"/>
      <rect x="31" y="62" width="18" height="6" rx="3" fill="#5B4CF5"/>
    </svg>
  ),
}

function StepIllustration({ stepId, isDone }: { stepId: string; isDone: boolean }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {STEP_ILLUSTRATIONS[stepId]}
      {isDone && (
        <div style={{
          position: "absolute",
          bottom: -4,
          right: -4,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#16a34a",
          border: "2.5px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Check size={11} strokeWidth={3} style={{ color: "white" }} />
        </div>
      )}
    </div>
  )
}

type DoneState = Record<string, boolean>

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
}

export function GoLiveChecklist() {
  const [done, setDone] = useState<DoneState>({})
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [nextHovered, setNextHovered] = useState(false)
  const [prevHovered, setPrevHovered] = useState(false)
  const [skipHovered, setSkipHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(ONBOARDING_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as DoneState
        setDone(parsed)
        const firstIncomplete = STEPS.findIndex((s) => !parsed[s.id])
        if (firstIncomplete !== -1) setActiveIndex(firstIncomplete)
      }
    } catch {}
  }, [])

  const goTo = useCallback((index: number, currentIndex: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setActiveIndex(index)
  }, [])

  const completedCount = STEPS.filter((s) => done[s.id]).length
  const allDone = completedCount === STEPS.length
  const progressPct = (completedCount / STEPS.length) * 100

  const activeStep = STEPS[activeIndex]
  const isActiveDone = !!done[activeStep.id]

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>

      {/* ── Dark header ──────────────────────────────────────────────── */}
      <div style={{
        borderRadius: "20px 20px 0 0",
        padding: "32px 40px 28px",
        background: "#5B4CF5",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -40, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, right: 90, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <div>
            <span style={{ display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8, fontFamily: "var(--font-jakarta)" }}>
              Getting Started
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.35rem, 2vw, 1.8rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 6 }}>
              Let&apos;s Set Up Your Business
            </h2>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Complete these steps to start taking orders.
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.03em" }}>
              {Math.round(progressPct)}%
            </div>
            <div style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
              {completedCount} of {STEPS.length} done
            </div>
          </div>
        </div>

        <div style={{ position: "relative", marginTop: 20, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", borderRadius: 999, background: "#5B4CF5" }}
            initial={{ width: 0 }}
            animate={{ width: mounted ? `${progressPct}%` : "0%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ── Step card ─────────────────────────────────────────────────── */}
      <div style={{
        borderRadius: "0 0 20px 20px",
        background: "#FFFFFF",
        boxShadow: "none",
        border: "1px solid #EBEBEB",
        borderTop: "none",
        overflow: "hidden",
      }}>

        {/* ── Tab row ────────────────────────────────────────────────── */}
        <div
          role="tablist"
          style={{
            display: "flex",
            borderBottom: "1px solid #EBEBEB",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {STEPS.map((step, index) => {
            const isActive = index === activeIndex
            const isDone = !!done[step.id]

            return (
              <button
                key={step.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => goTo(index, activeIndex)}
                style={{
                  flex: "1 1 0",
                  minWidth: 100,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "14px 10px",
                  border: "none",
                  borderBottom: isActive ? "2px solid #5B4CF5" : "2px solid transparent",
                  background: isActive ? "#F5F3FF" : "transparent",
                  cursor: "pointer",
                  transition: "background 0.15s, border-color 0.15s",
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s, border-color 0.2s",
                  background: isDone ? "#DCFCE7" : "transparent",
                  border: isDone ? "none" : `1.5px solid ${isActive ? "#5B4CF5" : "#D0D0D8"}`,
                }}>
                  {isDone ? (
                    <Check size={12} strokeWidth={2.5} style={{ color: "#16a34a" }} />
                  ) : (
                    <span style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-jakarta)",
                      color: isActive ? "#5B4CF5" : "#AAA",
                    }}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: "0.75rem",
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: "var(--font-jakarta)",
                  color: isDone ? "#16a34a" : isActive ? "#5B4CF5" : "#666",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  transition: "color 0.15s",
                }}>
                  {step.shortLabel}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Detail panel ───────────────────────────────────────────── */}
        <div style={{ overflow: "hidden", minHeight: 220 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeStep.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ padding: "36px 40px 32px" }}
            >
              {allDone ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "12px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Check size={28} strokeWidth={2.5} style={{ color: "#16a34a" }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#0D0D0D", marginBottom: 8 }}>
                    You&apos;re All Set!
                  </h3>
                  <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "#666", maxWidth: 380, lineHeight: 1.65, marginBottom: 24 }}>
                    Your business is fully configured and ready to take its first order.
                  </p>
                  <Link href="/dashboard">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 10, background: "#5B4CF5", color: "#fff", fontSize: "0.9rem", fontWeight: 700, fontFamily: "var(--font-jakarta)", cursor: "pointer" }}>
                      Go to Dashboard <ArrowRight size={15} />
                    </span>
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                  {/* Icon */}
                  <StepIllustration stepId={activeStep.id} isDone={isActiveDone} />

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, fontFamily: "var(--font-jakarta)", color: "#AAA", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                        Step {activeIndex + 1} of {STEPS.length}
                      </span>
                      {isActiveDone && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 9px", borderRadius: 999, background: "#DCFCE7", color: "#15803d", fontSize: "0.68rem", fontWeight: 600, fontFamily: "var(--font-jakarta)" }}>
                          <Check size={10} strokeWidth={3} /> Done
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "#0D0D0D", lineHeight: 1.3, letterSpacing: "-0.01em", marginBottom: 10 }}>
                      {activeStep.title}
                    </h3>

                    <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.875rem", color: "#555", lineHeight: 1.7, marginBottom: 24, maxWidth: 520 }}>
                      {activeStep.description}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <Link href={activeStep.href}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 7,
                          padding: "10px 22px",
                          borderRadius: 10,
                          background: "#5B4CF5",
                          color: "#fff",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          fontFamily: "var(--font-jakarta)",
                          cursor: "pointer",
                        }}>
                          Set Up <ArrowRight size={14} />
                        </span>
                      </Link>

                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation footer ──────────────────────────────────────── */}
        {!allDone && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "13px 40px 16px",
            borderTop: "1px solid #EBEBEB",
          }}>
            {activeIndex > 0 ? (
              <button
                onClick={() => goTo(activeIndex - 1, activeIndex)}
                onMouseEnter={() => setPrevHovered(true)}
                onMouseLeave={() => setPrevHovered(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  color: prevHovered ? "#5B4CF5" : "#777",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-jakarta)",
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}
              >
                <ArrowLeft size={13} /> Previous
              </button>
            ) : (
              <div />
            )}

            {/* Step dots */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, activeIndex)}
                  aria-label={`Go to step ${i + 1}`}
                  style={{
                    width: i === activeIndex ? 22 : 7,
                    height: 7,
                    borderRadius: 999,
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 0.25s ease, background 0.2s",
                    background: i === activeIndex
                      ? "#5B4CF5"
                      : done[s.id]
                      ? "#86efac"
                      : "#E0E0E6",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => activeIndex < STEPS.length - 1 && goTo(activeIndex + 1, activeIndex)}
              disabled={activeIndex === STEPS.length - 1}
              onMouseEnter={() => setNextHovered(true)}
              onMouseLeave={() => setNextHovered(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 8,
                border: "none",
                background: "transparent",
                color: activeIndex === STEPS.length - 1 ? "#CCC" : nextHovered ? "#5B4CF5" : "#777",
                fontSize: "0.78rem",
                fontWeight: 600,
                fontFamily: "var(--font-jakarta)",
                cursor: activeIndex === STEPS.length - 1 ? "default" : "pointer",
                transition: "color 0.15s",
              }}
            >
              Next <ArrowRight size={13} />
            </button>
          </div>
        )}

        {/* Skip */}
        {!allDone && (
          <div style={{ textAlign: "center", paddingBottom: 18 }}>
            <Link href="/dashboard">
              <span
                onMouseEnter={() => setSkipHovered(true)}
                onMouseLeave={() => setSkipHovered(false)}
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontSize: "0.78rem",
                  color: skipHovered ? "#555" : "#BABAC0",
                  cursor: "pointer",
                  transition: "color 0.15s",
                  textDecoration: skipHovered ? "underline" : "none",
                }}
              >
                Skip for now
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
