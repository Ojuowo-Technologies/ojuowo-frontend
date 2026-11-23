"use client"

import React from "react"

// ── Shimmer keyframe injected once ────────────────────────────────────
const SHIMMER_STYLE = `
@keyframes oj-shimmer {
  0%   { background-position: -400px 0 }
  100% { background-position: 400px 0 }
}
.oj-shimmer {
  background: linear-gradient(90deg, #F3F4F6 25%, #E9EAEC 50%, #F3F4F6 75%);
  background-size: 800px 100%;
  animation: oj-shimmer 1.4s ease-in-out infinite;
}
`

function ShimmerStyle() {
  return <style>{SHIMMER_STYLE}</style>
}

function Block({ w, h, radius = 8, style }: { w: string | number; h: number; radius?: number; style?: React.CSSProperties }) {
  return (
    <div
      className="oj-shimmer"
      style={{ width: w, height: h, borderRadius: radius, flexShrink: 0, ...style }}
    />
  )
}

// ── Stat tile skeleton ────────────────────────────────────────────────
export function SkeletonStat() {
  return (
    <>
      <ShimmerStyle />
      <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 16, padding: "20px 24px" }}>
        <Block w={80} h={12} radius={6} style={{ marginBottom: 14 }} />
        <Block w={120} h={28} radius={8} style={{ marginBottom: 10 }} />
        <Block w={60} h={10} radius={5} />
      </div>
    </>
  )
}

// ── Table/list row skeleton ────────────────────────────────────────────
export function SkeletonRow({ cols = 4 }: { cols?: number }) {
  const widths = ["40%", "25%", "20%", "15%", "10%"]
  return (
    <>
      <ShimmerStyle />
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #F3F4F6" }}>
        <Block w={32} h={32} radius={8} style={{ flexShrink: 0 }} />
        {Array.from({ length: cols }).map((_, i) => (
          <Block key={i} w={widths[i] ?? "15%"} h={12} radius={5} style={{ flex: "none" }} />
        ))}
      </div>
    </>
  )
}

// ── Card skeleton ─────────────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <>
      <ShimmerStyle />
      <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <Block w={40} h={40} radius={10} />
          <div style={{ flex: 1 }}>
            <Block w="60%" h={12} radius={5} style={{ marginBottom: 8 }} />
            <Block w="40%" h={10} radius={4} />
          </div>
        </div>
        <Block w="100%" h={10} radius={4} style={{ marginBottom: 6 }} />
        <Block w="80%" h={10} radius={4} />
      </div>
    </>
  )
}

// ── Dashboard stats row ───────────────────────────────────────────────
export function SkeletonDashboard() {
  return (
    <div>
      <ShimmerStyle />
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <Block w={180} h={22} radius={8} style={{ marginBottom: 8 }} />
        <Block w={240} h={14} radius={6} />
      </div>
      {/* Stat tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[0, 1, 2, 3].map((i) => <SkeletonStat key={i} />)}
      </div>
      {/* Two-column content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 16, padding: "20px 24px" }}>
          <Block w={120} h={16} radius={6} style={{ marginBottom: 20 }} />
          {[0, 1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}
        </div>
        <div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
