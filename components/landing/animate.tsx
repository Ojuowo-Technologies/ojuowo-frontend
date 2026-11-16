'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

const EASE = [0.25, 1, 0.35, 1] as const

export function FadeUp({
  children, delay = 0, className, style,
}: {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 52 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
} as const

const staggerParentInstant = {
  hidden: {},
  visible: {},
} as const

const staggerChild = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.25, 1, 0.35, 1] } },
} as const

const staggerChildInstant = {
  hidden:  {},
  visible: {},
} as const

export function StaggerContainer({
  children, className, style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={reduce ? staggerParentInstant : staggerParent}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children, className, style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      variants={reduce ? staggerChildInstant : staggerChild}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
