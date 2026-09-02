import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * The site's single scroll-reveal primitive: opacity + a short lift, once.
 * Everything animates the same way on purpose — variety here would read as noise.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0 },
}

interface RevealProps {
  children: ReactNode
  /** Seconds. Use for deliberate stagger within a group. */
  delay?: number
  duration?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer'
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  className,
  as = 'div',
}: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.02, margin: '0px 0px -8% 0px' }}
      variants={variants}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}
