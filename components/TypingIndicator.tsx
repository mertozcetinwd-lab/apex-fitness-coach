'use client'
import { motion } from 'framer-motion'

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-5">
      <div className="border-l-2 border-signal bg-layer pl-4 pr-5 py-3">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal mb-2">Coach</p>
        <div className="flex items-center gap-1.5 h-4">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block w-1.5 h-1.5 rounded-full bg-signal"
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
