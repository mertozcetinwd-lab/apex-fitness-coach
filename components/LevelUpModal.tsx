'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { LEVELS } from '@/lib/gameLogic'

interface Props {
  levelNumber: number | null
  onDismiss: () => void
}

export function LevelUpModal({ levelNumber, onDismiss }: Props) {
  const level = levelNumber ? LEVELS.find(l => l.number === levelNumber) : null

  return (
    <AnimatePresence>
      {level && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onDismiss}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Card */}
          <motion.div
            className="relative border border-signal bg-layer p-8 text-center max-w-xs w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Accent corner lines */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-signal" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-signal" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-signal" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-signal" />

            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal mb-4">
              Level Up
            </p>

            <p className="font-mono text-5xl font-bold text-white mb-2">{level.number}</p>

            <p className="font-mono text-xl tracking-wide text-signal mb-6">{level.name}</p>

            <button
              onClick={onDismiss}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft hover:text-white transition-colors cursor-pointer"
            >
              Continue →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
