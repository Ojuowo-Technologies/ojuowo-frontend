"use client"

import React from "react"
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react"

interface ErrorStateProps {
  type?: "error" | "offline" | "forbidden" | "not-found"
  title?: string
  description?: string
  onRetry?: () => void
  traceId?: string
}

const DEFAULTS: Record<NonNullable<ErrorStateProps["type"]>, { title: string; description: string; icon: React.ReactElement }> = {
  error: {
    title: "Something Went Wrong",
    description: "We could not load this data. This is on us, not you. Try again or come back in a moment.",
    icon: <AlertTriangle size={28} style={{ color: "var(--color-error)" }} />,
  },
  offline: {
    title: "You Are Offline",
    description: "No internet connection. Changes you make are saved on your device and will sync when you reconnect.",
    icon: <WifiOff size={28} style={{ color: "#888" }} />,
  },
  forbidden: {
    title: "Access Denied",
    description: "You do not have permission to view this page. Contact your business owner if you think this is wrong.",
    icon: <AlertTriangle size={28} style={{ color: "var(--color-warning)" }} />,
  },
  "not-found": {
    title: "Page Not Found",
    description: "The page you are looking for does not exist or may have been moved.",
    icon: <AlertTriangle size={28} style={{ color: "#888" }} />,
  },
}

export function ErrorState({ type = "error", title, description, onRetry, traceId }: ErrorStateProps) {
  const defaults = DEFAULTS[type]
  const bg = type === "offline" ? "#F3F4F6" : type === "error" ? "var(--color-error-bg)" : "#FFF7ED"
  const borderColor = type === "offline" ? "#E5E7EB" : type === "error" ? "var(--color-error-border)" : "#FED7AA"

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center", padding: "56px 32px",
    }}>
      {/* Icon circle */}
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: bg, border: `1.5px solid ${borderColor}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
      }}>
        {defaults.icon}
      </div>

      <div style={{
        fontFamily: "var(--font-display)", fontSize: "1.125rem",
        fontWeight: 700, color: "#0D0D0D", letterSpacing: "-0.01em", marginBottom: 8,
      }}>
        {title ?? defaults.title}
      </div>
      <div style={{
        fontFamily: "var(--font-jakarta)", fontSize: "0.875rem",
        color: "#777", lineHeight: 1.6, maxWidth: 360,
        marginBottom: onRetry ? 24 : 0,
      }}>
        {description ?? defaults.description}
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 42, padding: "0 20px", borderRadius: 10,
            background: "#fff", border: "1.5px solid #DEDEDE",
            fontFamily: "var(--font-jakarta)", fontSize: "0.875rem",
            fontWeight: 600, color: "#333", cursor: "pointer",
            transition: "border-color 0.15s", boxShadow: "none",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-accent)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#DEDEDE")}
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      )}

      {traceId && (
        <div style={{ marginTop: 16, fontFamily: "var(--font-jakarta)", fontSize: "0.72rem", color: "#CCC" }}>
          Error ID: {traceId}
        </div>
      )}
    </div>
  )
}
