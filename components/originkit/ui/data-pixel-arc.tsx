/* eslint-disable */
// Originkit — props baked into the default export.
"use client"

import * as React from "react"
import { useEffect, useRef } from "react"

const MAX_DPR = 2

const VERT_SRC = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime, uDpr, uCell, uFill, uHover, uReach;
uniform vec2  uPtr;   // CSS px, y from the top
uniform float uCenter, uDrop, uThick, uFall;
uniform vec3  uBg, uBase, uAccent, uHigh;

void main(){
  float cs = max(uCell, 2.0);
  vec2 ci = floor(gl_FragCoord.xy / cs);
  vec2 cc = (ci + 0.5) * cs;

  float x = cc.x / uDpr;
  float y = (uRes.y - cc.y) / uDpr;        // canvas y runs down
  float w = uRes.x / uDpr;
  float h = uRes.y / uDpr;

  float nx = (x / w) * 2.0 - 1.0;
  float curveY = h * uCenter + pow(abs(nx), 1.8) * (h * uDrop);
  float i = max(0.0, 1.0 - abs(y - curveY) / max(h * uThick, 1.0));

  float probe = (1.0 - smoothstep(0.0, 1.0, distance(vec2(x, y), uPtr) / max(uReach, 1.0))) * uHover;
  i = clamp(i + probe * 0.45, 0.0, 1.2);

  vec3 col = uBg;
  if (i > 0.01) {
    float wave1 = sin(nx * 4.0 - uTime * 1.5) * 0.1;
    float wave2 = cos(y * 0.01 + uTime) * 0.1;
    i = clamp(i + wave1 + wave2, 0.0, 1.0);
    i *= max(0.0, 1.0 - pow(abs(nx), uFall));

    if (i > 0.02) {
      float side = cs * uFill;
      vec2 d = abs(gl_FragCoord.xy - cc);
      float cov = 1.0 - smoothstep(side * 0.5 - 1.0, side * 0.5 + 1.0, length(d));

      float core = i * i * i;
      float mid = pow(i, 1.5);
      vec3 ink = uBase * i * 0.35 + uAccent * mid * 0.95 + uHigh * core * 0.35;
      vec3 loColor = uHigh * 0.5 + uAccent * 0.5;
      ink = mix(loColor, ink, i);
      col = mix(uBg, clamp(ink, 0.0, 1.0), cov * i);
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
    const sh = gl.createShader(type)
    if (!sh) return null
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("DataPixelArc shader:", gl.getShaderInfoLog(sh))
        gl.deleteShader(sh)
        return null
    }
    return sh
}

function parseColor(input: string | undefined, fb: [number, number, number]): [number, number, number] {
    if (!input) return fb
    const str = String(input).trim()
    if (str.charAt(0) === "#") {
        let hex = str.slice(1)
        if (hex.length === 3 || hex.length === 4) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        }
        if (hex.length >= 6) {
            const r = parseInt(hex.slice(0, 2), 16)
            const g = parseInt(hex.slice(2, 4), 16)
            const b = parseInt(hex.slice(4, 6), 16)
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r / 255, g / 255, b / 255]
        }
        return fb
    }
    const m = str.match(/[\d.]+/g)
    if (m && m.length >= 3) {
        return [
            Math.min(255, parseFloat(m[0])) / 255,
            Math.min(255, parseFloat(m[1])) / 255,
            Math.min(255, parseFloat(m[2])) / 255,
        ]
    }
    return fb
}

function num(v: unknown, fb: number): number {
    return typeof v === "number" && isFinite(v) ? v : fb
}

function clampN(v: number, lo: number, hi: number): number {
    return v < lo ? lo : v > hi ? hi : v
}

interface ArcGroup {
    center?: number
    drop?: number
    thickness?: number
    falloff?: number
}
const ARC_DEFAULTS: Required<ArcGroup> = { center: 40, drop: 90, thickness: 35, falloff: 250 }

interface DataPixelArcProps {
    style?: React.CSSProperties
    width?: number
    height?: number
    background?: string
    baseColor?: string
    accentColor?: string
    highlight?: string
    density?: number
    dotSize?: number
    speed?: number
    hover?: number
    arc?: ArcGroup
}

function __OriginkitBase_DataPixelArc(props: DataPixelArcProps) {
    const {
        style,
        background = "#030308",
        baseColor = "#22FF00",
        accentColor = "#00FF7D",
        highlight = "#EAFFF0",
        density = 89,
        dotSize = 69,
        speed = 100,
        hover = 46,
        arc,
        width,
        height,
    } = props

    const arc_ = { ...ARC_DEFAULTS, ...(arc || {}) }

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ptrRef = useRef({ tx: -1, ty: -1, x: -1, y: -1 })
    const sizeRef = useRef({ w: 0, h: 0 })
    sizeRef.current = { w: num(width, 0), h: num(height, 0) }

    const vRef = useRef<Record<string, number | string>>({})
    vRef.current = {
        bg: background,
        base: baseColor,
        accent: accentColor,
        high: highlight,
        density: Math.round(clampN(num(density, 100), 24, 260)),
        dotSize: clampN(num(dotSize, 88), 20, 100) / 100,
        speed: clampN(num(speed, 50), 0, 100) / 50,
        hover: clampN(num(hover, 100), 0, 200) / 100,
        center: clampN(num(arc_.center, 40), 0, 100) / 100,
        drop: clampN(num(arc_.drop, 90), 0, 300) / 100,
        thickness: clampN(num(arc_.thickness, 35), 2, 120) / 100,
        falloff: clampN(num(arc_.falloff, 250), 50, 600) / 100,
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false })
        if (!gl) {
            console.error("DataPixelArc: WebGL unavailable")
            return
        }

        const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC)
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
        if (!vs || !fs) return
        const prog = gl.createProgram()
        if (!prog) return
        gl.attachShader(prog, vs)
        gl.attachShader(prog, fs)
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error("DataPixelArc link:", gl.getProgramInfoLog(prog))
            return
        }
        gl.useProgram(prog)

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const aPos = gl.getAttribLocation(prog, "a_pos")
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const locs: Record<string, WebGLUniformLocation | null> = {}
        const u = (name: string) => {
            if (!(name in locs)) locs[name] = gl.getUniformLocation(prog, name)
            return locs[name]
        }

        let raf = 0
        let last = performance.now()
        let clock = 0
        const PTR_RATE = 9.0

        const render = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            const v = vRef.current
            clock = (clock + dt * 1.2 * (v.speed as number)) % 6283

            const ptr = ptrRef.current
            const k = 1 - Math.exp(-dt * PTR_RATE)
            ptr.x += (ptr.tx - ptr.x) * k
            ptr.y += (ptr.ty - ptr.y) * k

            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
            const cw = sizeRef.current.w || canvas.clientWidth || 1200
            const ch = sizeRef.current.h || canvas.clientHeight || 800
            const bw = Math.max(1, Math.round(cw * dpr))
            const bh = Math.max(1, Math.round(ch * dpr))
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw
                canvas.height = bh
            }
            gl.viewport(0, 0, bw, bh)

            const pitchCss = Math.min(bw, bh) / dpr / (v.density as number)

            gl.uniform2f(u("uRes"), bw, bh)
            gl.uniform1f(u("uTime"), clock)
            gl.uniform1f(u("uDpr"), dpr)
            gl.uniform1f(u("uCell"), Math.max(2, pitchCss * dpr))
            gl.uniform1f(u("uFill"), v.dotSize as number)
            gl.uniform1f(u("uCenter"), v.center as number)
            gl.uniform1f(u("uDrop"), v.drop as number)
            gl.uniform1f(u("uThick"), v.thickness as number)
            gl.uniform1f(u("uFall"), v.falloff as number)
            gl.uniform1f(u("uHover"), v.hover as number)
            gl.uniform1f(u("uReach"), Math.min(bw, bh) / dpr * 0.28)
            gl.uniform2f(u("uPtr"), ptr.x * (bw / dpr), ptr.y * (bh / dpr))
            const cg = parseColor(v.bg as string, [0.012, 0.012, 0.031])
            const cb = parseColor(v.base as string, [0.118, 0.392, 0.22])
            const ca = parseColor(v.accent as string, [0.133, 0.863, 0.314])
            const chh = parseColor(v.high as string, [0.918, 1.0, 0.941])
            gl.uniform3f(u("uBg"), cg[0], cg[1], cg[2])
            gl.uniform3f(u("uBase"), cb[0], cb[1], cb[2])
            gl.uniform3f(u("uAccent"), ca[0], ca[1], ca[2])
            gl.uniform3f(u("uHigh"), chh[0], chh[1], chh[2])

            gl.drawArrays(gl.TRIANGLES, 0, 3)
            raf = requestAnimationFrame(render)
        }

        const track = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect()
            if (r.width <= 0 || r.height <= 0) return
            ptrRef.current.tx = clampN((e.clientX - r.left) / r.width, 0, 1)
            ptrRef.current.ty = clampN((e.clientY - r.top) / r.height, 0, 1)
        }
        const onLeave = () => {
            ptrRef.current.tx = -1
            ptrRef.current.ty = -1
        }
        canvas.addEventListener("pointermove", track)
        canvas.addEventListener("pointerenter", track)
        canvas.addEventListener("pointerleave", onLeave)

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            render(performance.now())
            return () => { cancelAnimationFrame(raf) }
        }

        raf = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(raf)
            canvas.removeEventListener("pointermove", track)
            canvas.removeEventListener("pointerenter", track)
            canvas.removeEventListener("pointerleave", onLeave)
        }
    }, [])

    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                background,
                minWidth: 1200,
                minHeight: 800,
                width: typeof width === "number" && width > 0 ? width : "100%",
                height: typeof height === "number" && height > 0 ? height : "100%",
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
            />
        </div>
    )
}

const __originkitPresetProps = {
  "arc": {
    "drop": 0,
    "center": 80,
    "falloff": 600,
    "thickness": 44
  },
  "hover": 46,
  "speed": 100,
  "density": 89,
  "dotSize": 69,
  "baseColor": "#22FF00",
  "highlight": "#EAFFF0",
  "background": "#030308",
  "accentColor": "#00FF7D"
};

export default function DataPixelArc(props: Record<string, unknown>) {
  return <__OriginkitBase_DataPixelArc {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
