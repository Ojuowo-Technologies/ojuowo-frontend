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
import { LogoMark, Logo } from "@/components/ui/logo"
import { WelcomeModal } from "@/components/dashboard/welcome-modal"
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
    <nav className="flex-1 overflow-y-auto overflow-x-hidden" style={{ padding: '12px 16px 16px' }}>
      {NAV_GROUPS.map((group, gi) => (
        <div key={gi} style={{ marginTop: gi > 0 ? 20 : 0 }}>
          {group.label && !collapsed && (
            <p
              className="text-[0.65rem] font-semibold uppercase tracking-[0.08em]"
              style={{ color: "var(--color-text-muted)", paddingBottom: 6 }}
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
                        active ? "bg-[var(--color-accent)]" : ""
                      )}
                      style={{ color: active ? '#fff' : 'var(--color-text-secondary)' }}
                      onMouseEnter={e => {
                        if (active) return
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.backgroundColor = 'var(--color-accent-muted)'
                        el.style.color = 'var(--color-accent)'
                      }}
                      onMouseLeave={e => {
                        if (active) return
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.backgroundColor = ''
                        el.style.color = 'var(--color-text-secondary)'
                      }}
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
                    "flex items-center gap-3 rounded-[10px] text-sm font-medium transition-colors",
                    active ? "bg-[var(--color-accent)]" : ""
                  )}
                  style={{
                    height: 44, paddingLeft: 12, paddingRight: 12,
                    color: active ? '#fff' : 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={e => {
                    if (active) return
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.backgroundColor = 'var(--color-accent-muted)'
                    el.style.color = 'var(--color-accent)'
                  }}
                  onMouseLeave={e => {
                    if (active) return
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.backgroundColor = ''
                    el.style.color = 'var(--color-text-secondary)'
                  }}
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
      <WelcomeModal />
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
        {/* Logo + collapse toggle */}
        <div
          style={{
            display: 'flex', alignItems: 'center', flexShrink: 0,
            height: 68,
            padding: collapsed ? '0 12px' : '0 12px 0 16px',
            justifyContent: collapsed ? 'center' : 'space-between',
            borderBottom: '1px solid #EBEBEB',
          }}
        >
          {collapsed
            ? <LogoMark size={30} />
            : <Logo className="h-10 w-auto" />
          }
          <button
            onClick={toggleCollapsed}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: 8, border: '1px solid #EBEBEB',
              backgroundColor: 'transparent', cursor: 'pointer', flexShrink: 0,
              color: 'var(--color-text-muted)', transition: 'background-color 0.15s, color 0.15s',
              marginLeft: collapsed ? 0 : 8,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-accent-muted)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)' }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>
        </div>

        {/* Nav */}
        <SidebarNav collapsed={collapsed} />

        {/* User */}
        <div
          style={{ flexShrink: 0, padding: '16px', borderTop: "1px solid #EBEBEB" }}
        >
          <SidebarUser collapsed={collapsed} />
        </div>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', flexShrink: 0 }}>
              <Logo className="h-9 w-auto" />
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
              style={{ flexShrink: 0, padding: '16px', borderTop: "1px solid #EBEBEB" }}
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
                border: "none",
                background: "transparent",
                color: "#666",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-accent-muted)"
                e.currentTarget.style.color = "var(--color-accent)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-accent-muted)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = ""
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
