'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedListProps {
  children: ReactNode[]
  delay?: number
  stagger?: number
  className?: string
}

export default function AnimatedList({ 
  children, 
  delay = 0,
  stagger = 0.1,
  className = ''
}: AnimatedListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.5,
            delay: delay + (index * stagger),
            ease: [0.25, 0.4, 0.25, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
