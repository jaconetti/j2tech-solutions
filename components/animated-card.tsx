'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

const getInitialPosition = (direction: string) => {
  switch (direction) {
    case 'up': return { opacity: 0, y: 60 }
    case 'down': return { opacity: 0, y: -60 }
    case 'left': return { opacity: 0, x: 60 }
    case 'right': return { opacity: 0, x: -60 }
    default: return { opacity: 0, y: 60 }
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

export default function AnimatedCard({ 
  children, 
  delay = 0,
  className = '',
  direction = 'up'
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={getInitialPosition(direction)}
      whileInView={getAnimatePosition(direction)}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      className="h-full"
    >
      <Card className={`h-full transition-shadow duration-300 hover:shadow-xl ${className}`}>
        {children}
      </Card>
    </motion.div>
  )
}
