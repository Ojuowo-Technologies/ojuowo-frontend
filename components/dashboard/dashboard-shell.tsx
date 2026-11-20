"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  UserCheck,
  CheckSquare,
  Wallet,
  PiggyBank,
  Globe,
  Settings2,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Menu,
  Bell,
  ChevronDown,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { LogoMark } from "@/components/ui/logo"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ExpandButton } from "@/components/ui/expand-button"
import { cn } from "@/lib/utils"

const SIDEBAR_KEY = "oj_sidebar"
const SIDEBAR_EXPANDED = 240
const SIDEBAR_COLLAPSED = 64

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

type NavGroup = {
  label: string | null
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: null,
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "MANAGE",
    items: [
      { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
      { label: "Customers", href: "/dashboard/customers", icon: Users },
      { label: "Staff", href: "/dashboard/staff", icon: UserCheck },
      { label: "Verify", href: "/dashboard/verify", icon: CheckSquare },
    ],
  },
  {
    label: "MONEY",
    items: [
      { label: "Wages", href: "/dashboard/wages", icon: Wallet },
      { label: "Balances", href: "/dashboard/balances", icon: PiggyBank },
    ],
  },
  {
    label: "SETUP",
    items: [
      { label: "My Page", href: "/dashboard/my-page", icon: Globe },
      { label: "Settings", href: "/dashboard/settings", icon: Settings2 },
    ],
  },
]

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/setup": "Get Started",
  "/dashboard/orders": "Orders",
  "/dashboard/customers": "Customers",
  "/dashboard/staff": "Staff",
  "/dashboard/staff/invite": "Invite Staff",
  "/dashboard/staff/pay-rates": "Pay Rates",
  "/dashboard/verify": "Verification",
  "/dashboard/wages": "Wages",
  "/dashboard/balances": "Balances",
  "/dashboard/my-page": "My Page",
  "/dashboard/settings": "Settings",
  "/dashboard/settings/general": "General Settings",
  "/dashboard/settings/branding": "Branding",
  "/dashboard/settings/bank": "Bank Details",
  "/dashboard/settings/payments": "Payment Terms",
  "/dashboard/settings/pay-period": "Pay Period",
  "/dashboard/settings/stages": "Workflow Stages",
}

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith("/dashboard/orders/")) return "Order"
  if (pathname.startsWith("/dashboard/customers/")) return "Customer"
  if (pathname.startsWith("/dashboard/staff/")) return "Staff"
  if (pathname.startsWith("/dashboard/wages/")) return "Wage Run"
  return "Dashboard"
}

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard"
  return pathname === href || pathname.startsWith(href + "/")
}

// Shared nav content — used by both desktop and mobile sidebar
function SidebarNav({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-4">
      {NAV_GROUPS.map((group, gi) => (
        <div key={gi} className={gi > 0 ? "mt-4" : ""}>
          {group.label && !collapsed && (
            <p
              className="px-3 pb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {group.label}
            </p>
          )}
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = item.icon
              const active = isNavItemActive(pathname, item.href)

              if (collapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger
                      onClick={() => { router.push(item.href); onNavigate?.() }}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors mx-auto",
                        active
                          ? "bg-[var(--color-accent)] text-white"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-accent)]"
                      )}
                      aria-label={item.label}
                    >
                      <Icon size={18} />
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-[10px] px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}

function signOut() {
  try {
    localStorage.removeItem("ojuowo_token")
    localStorage.removeItem("ojuowo_refresh")
  } catch {}
  // Expire the routing cookie so middleware no longer sees the user as authed
  document.cookie = "oj_auth=; path=/; max-age=0"
  window.location.href = "/login"
}

// User row — shown at bottom of sidebar
function SidebarUser({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger
          onClick={signOut}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors mx-auto text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-error)]"
          aria-label="Sign out"
        >
          <LogOut size={18} />
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Sign out
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div className="flex items-center gap-2 px-2">
      <div
        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        SG
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate"
          style={{ color: "var(--color-text-primary)" }}
        >
          Business Owner
        </p>
        <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
          Owner
        </p>
      </div>
      <button
        onClick={signOut}
        className="p-1 rounded-md transition-colors hover:text-red-500"
        style={{ color: "var(--color-text-muted)" }}
        aria-label="Sign out"
      >
        <LogOut size={16} />
      </button>
    </div>
  )
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Restore sidebar state from localStorage
    try {
      if (localStorage.getItem(SIDEBAR_KEY) === "collapsed") setCollapsed(true)
    } catch {}

    // Detect mobile
    const mq = window.matchMedia("(max-width: 1023px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem(SIDEBAR_KEY, next ? "collapsed" : "expanded")
      } catch {}
      return next
    })
  }, [])

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED
  const effectiveWidth = mounted ? sidebarWidth : SIDEBAR_EXPANDED
  const contentMargin = mounted && !isMobile ? effectiveWidth : 0

  const pageTitle = getPageTitle(pathname)

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      {/* ── Desktop sidebar ──────────────────────────────── */}
      <motion.aside
        animate={{ width: effectiveWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen z-30 hidden lg:flex flex-col overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface)",
          borderRight: "1px solid #EBEBEB",
        }}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center gap-2.5 shrink-0 py-5",
            collapsed ? "justify-center px-0" : "px-4"
          )}
        >
          <LogoMark size={28} />
          {!collapsed && (
            <span
              className="text-base font-semibold truncate"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              Ojúòwò
            </span>
          )}
        </div>

        {/* Nav */}
        <SidebarNav collapsed={collapsed} />

        {/* User */}
        <div
          className="shrink-0 px-2 py-3"
          style={{ borderTop: "1px solid #EBEBEB" }}
        >
          <SidebarUser collapsed={collapsed} />
        </div>

        {/* Collapse toggle tab */}
        <button
          onClick={toggleCollapsed}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full transition-colors"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid #EBEBEB",
            color: "var(--color-text-muted)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={12} /> : <PanelLeftClose size={12} />}
        </button>
      </motion.aside>

      {/* ── Mobile overlay ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 lg:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile sidebar drawer ────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -SIDEBAR_EXPANDED }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_EXPANDED }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-screen z-30 flex flex-col overflow-hidden lg:hidden"
            style={{
              width: SIDEBAR_EXPANDED,
              backgroundColor: "var(--color-surface)",
              borderRight: "1px solid #EBEBEB",
            }}
          >
            {/* Logo + close */}
            <div className="flex items-center justify-between px-4 py-5 shrink-0">
              <div className="flex items-center gap-2.5">
                <LogoMark size={28} />
                <span
                  className="text-base font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Ojúòwò
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="transition-colors"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav */}
            <SidebarNav collapsed={false} onNavigate={() => setMobileOpen(false)} />

            {/* User */}
            <div
              className="shrink-0 px-2 py-3"
              style={{ borderTop: "1px solid #EBEBEB" }}
            >
              <SidebarUser collapsed={false} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main content area ────────────────────────────── */}
      <div
        className="flex flex-col min-h-screen"
        style={{
          marginLeft: contentMargin,
          transition: mounted ? "margin-left 0.2s ease-in-out" : "none",
        }}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-20 flex shrink-0"
          style={{
            height: 68,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #EBEBEB",
          }}
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden transition-colors"
              style={{ color: "#555", marginRight: 4 }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#0D0D0D",
                letterSpacing: "-0.01em",
              }}
            >
              {pageTitle}
            </h1>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* Notifications */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "1px solid transparent",
                background: "transparent",
                color: "#666",
                cursor: "pointer",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#5B4CF5"
                e.currentTarget.style.color = "#5B4CF5"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent"
                e.currentTarget.style.color = "#666"
              }}
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>

            {/* Business profile */}
            <ExpandButton
              icon={
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "#5B4CF5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  color: "#fff",
                  fontFamily: "var(--font-jakarta)",
                  flexShrink: 0,
                }}>
                  SI
                </div>
              }
              label="S.I.G Clothing"
              suffix={<ChevronDown size={14} style={{ color: "#999", marginLeft: 6 }} />}
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#0D0D0D",
                fontFamily: "var(--font-jakarta)",
                height: 44,
                paddingLeft: 8,
                paddingRight: 10,
              }}
            />
          </div>
        </header>

        {/* Page content */}
        <main
          className="flex-1"
          style={{
            backgroundColor: "var(--color-background)",
            padding: "24px 32px 32px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
