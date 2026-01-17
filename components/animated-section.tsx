'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

const getInitialPosition = (direction: string) => {
  switch (direction) {
    case 'up': return { opacity: 0, y: 50 }
    case 'down': return { opacity: 0, y: -50 }
    case 'left': return { opacity: 0, x: 50 }
    case 'right': return { opacity: 0, x: -50 }
    default: return { opacity: 0, y: 50 }
  }
}

const getAnimatePosition = (direction: string) => {
  switch (direction) {
    case 'up': return { opacity: 1, y: 0 }
    case 'down': return { opacity: 1, y: 0 }
    case 'left': return { opacity: 1, x: 0 }
    case 'right': return { opacity: 1, x: 0 }
    default: return { opacity: 1, y: 0 }
  }
}

export default function AnimatedSection({ 
  children, 
  delay = 0,
  duration = 0.8,
  className = '',
  direction = 'up'
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true,
    margin: '-100px'
  })

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition(direction)}
      animate={isInView ? getAnimatePosition(direction) : getInitialPosition(direction)}
      transition={{ 
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
