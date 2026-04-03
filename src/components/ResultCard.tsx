import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ResultCardProps {
  title: string
  children: ReactNode
  className?: string
  delay?: number
}

export function ResultCard({
  title,
  children,
  className = '',
  delay = 0,
}: ResultCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      <h2 className="mb-3 text-base font-bold text-mash-navy">{title}</h2>
      {children}
    </motion.section>
  )
}
