"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"

const WELCOME_KEY = "oj_welcome_shown"

export function WelcomeModal() {
  const [visible, setVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const forceShow = new URLSearchParams(window.location.search).get("welcome") === "1"
    try {
      if (forceShow || !localStorage.getItem(WELCOME_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  // Confetti — fires when modal becomes visible
  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return
    // getContext returns null only when the element isn't a canvas — it is, so this assert is safe
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    const COLORS = ["#5B4CF5","#A99BFF","#F59E0B","#F87171","#34D399","#60A5FA","#F472B6","#FBBF24"]
    const SHAPES = ["rect", "circle", "ribbon"] as const
    type Shape = typeof SHAPES[number]

    type Piece = {
      x: number; y: number; vx: number; vy: number
      rotation: number; rotSpeed: number
      color: string; shape: Shape
      w: number; h: number; alpha: number
      gravity: number; wobble: number; wobbleSpeed: number; wobbleAcc: number
      life: number
    }

    const pieces: Piece[] = []

    function rand(min: number, max: number) { return min + Math.random() * (max - min) }

    function burst() {
      const origins = [
        { x: W * 0.25, y: H * 0.92 },
        { x: W * 0.75, y: H * 0.92 },
        { x: W * 0.5,  y: H * 0.96 },
      ]
      origins.forEach((o, i) => {
        const count = i === 2 ? 70 : 45
        for (let n = 0; n < count; n++) {
          const angle = rand(-Math.PI * 1.1, -Math.PI * 0.1)
          const speed = rand(8, 20)
          pieces.push({
            x: o.x + rand(-20, 20), y: o.y,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            rotation: rand(0, Math.PI * 2), rotSpeed: rand(-0.15, 0.15),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
            w: rand(7, 14), h: rand(4, 9),
            alpha: 1, gravity: rand(0.3, 0.55),
            wobble: rand(-0.08, 0.08), wobbleSpeed: rand(0.03, 0.08), wobbleAcc: 0,
            life: rand(220, 320),
          })
        }
      })
    }

    burst()
    const t2 = setTimeout(burst, 450)
    const t3 = setTimeout(burst, 900)

    function draw() {
      ctx.clearRect(0, 0, W, H)
      let alive = false
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i]
        p.life--
        if (p.life <= 0) { pieces.splice(i, 1); continue }
        alive = true
        p.wobbleAcc += p.wobbleSpeed
        p.vx += Math.sin(p.wobbleAcc) * p.wobble
        p.vy += p.gravity
        p.x += p.vx; p.y += p.vy
        p.rotation += p.rotSpeed
        p.alpha = p.life < 60 ? p.life / 60 : 1
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color
        if (p.shape === "circle") {
          ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill()
        } else if (p.shape === "ribbon") {
          ctx.beginPath()
          ctx.moveTo(-p.w / 2, 0)
          ctx.quadraticCurveTo(0, -p.h, p.w / 2, 0)
          ctx.quadraticCurveTo(0, p.h, -p.w / 2, 0)
          ctx.fill()
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        }
        ctx.restore()
      }
      if (alive) rafRef.current = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, W, H)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", onResize)
      clearTimeout(t2)
      clearTimeout(t3)
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  const dismiss = useCallback(() => {
    try { localStorage.setItem(WELCOME_KEY, "1") } catch {}
    cancelAnimationFrame(rafRef.current)
    setVisible(false)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Confetti canvas — sits above everything */}
          <canvas
            ref={canvasRef}
            style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 60 }}
          />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              backgroundColor: "rgba(10,8,32,0.78)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
          />

          {/* Modal card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Welcome to Ojúòwò"
            initial={{ opacity: 0, scale: 0.88, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 55,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
              padding: "0 24px",
            }}
          >
            <div
              style={{
                width: "100%", maxWidth: 480,
                background: "#100A44",
                borderRadius: 20,
                overflow: "hidden",
                pointerEvents: "auto",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              {/* Hero band */}
              <div
                style={{
                  position: "relative",
                  padding: "44px 40px 32px",
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                {/* Concentric rings */}
                <svg
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                  viewBox="0 0 480 240"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <circle cx="240" cy="120" r="80"  fill="none" stroke="rgba(91,76,245,0.22)" strokeWidth="1"/>
                  <circle cx="240" cy="120" r="130" fill="none" stroke="rgba(91,76,245,0.14)" strokeWidth="1"/>
                  <circle cx="240" cy="120" r="185" fill="none" stroke="rgba(91,76,245,0.09)" strokeWidth="1"/>
                  <circle cx="240" cy="120" r="245" fill="none" stroke="rgba(91,76,245,0.05)" strokeWidth="1"/>
                  <circle cx="240" cy="38"  r="3"   fill="rgba(91,76,245,0.55)"/>
                  <polygon points="240,20 244.5,25 240,30 235.5,25" fill="rgba(169,155,255,0.38)"/>
                </svg>

                {/* Logo row */}
                <div
                  style={{
                    position: "relative", zIndex: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 10, marginBottom: 28,
                  }}
                >
                  <Logo variant="light" className="h-12 w-auto" />
                </div>

                {/* Badge */}
                <div
                  style={{
                    position: "relative", zIndex: 1,
                    display: "inline-block",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 100, padding: "4px 14px",
                    fontFamily: "var(--font-jakarta)",
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: 18,
                  }}
                >
                  You&apos;re In
                </div>

                {/* Headline */}
                <h2
                  style={{
                    position: "relative", zIndex: 1,
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.45rem, 4vw, 1.85rem)",
                    fontWeight: 700, color: "#FFFFFF",
                    lineHeight: 1.2, letterSpacing: "-0.025em",
                    marginBottom: 12,
                  }}
                >
                  Welcome To Ojúòwò,<br />
                  <span style={{ color: "#A99BFF" }}>SIG Clothing.</span>
                </h2>

                {/* Subtext */}
                <p
                  style={{
                    position: "relative", zIndex: 1,
                    fontFamily: "var(--font-jakarta)",
                    fontSize: 14, color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.65, maxWidth: 320, margin: "0 auto",
                  }}
                >
                  Your workspace is ready. Follow the setup checklist to go live and start taking orders.
                </p>
              </div>

              {/* CTA */}
              <div style={{ padding: "0 40px 36px", display: "flex", flexDirection: "column", gap: 12 }}>
                <button
                  onClick={dismiss}
                  style={{
                    width: "100%", height: 50,
                    background: "#5B4CF5",
                    color: "#FFFFFF", border: "none",
                    borderRadius: 100,
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.95rem", fontWeight: 700,
                    cursor: "pointer", letterSpacing: "-0.01em",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1" }}
                >
                  Let&apos;s Get Started <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
