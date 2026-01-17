'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  type?: 'words' | 'chars'
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  duration = 0.5,
  type = 'words'
}: AnimatedTextProps) {
  
  if (type === 'words') {
    const words = text.split(' ')
    
    return (
      <span className={className}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration,
              delay: delay + (index * 0.05),
              ease: [0.25, 0.4, 0.25, 1]
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    )
  }
  
  // Character animation
  const chars = text.split('')
  
  return (
    <span className={className}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.03,
            delay: delay + (index * 0.02),
            ease: 'easeOut'
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
