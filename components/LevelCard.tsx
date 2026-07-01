'use client'
import { motion } from 'framer-motion'
import { getLevelFromXP, getXPProgress, LEVELS } from '@/lib/gameLogic'

interface Props {
  xp: number
}

export function LevelCard({ xp }: Props) {
  const level = getLevelFromXP(xp)
  const { current, next, pct } = getXPProgress(xp)
  const isMax = level.number === LEVELS[LEVELS.length - 1].number

  return (
    <div className="border border-edge bg-layer p-4">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft">Level</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft">
          {level.number} / {LEVELS.length}
        </span>
      </div>

      <div className="mb-1">
        <span className="font-mono text-2xl font-bold tracking-tight text-white">{level.name}</span>
      </div>

      <div className="mt-4">
        {/* XP bar track */}
        <div className="h-0.5 bg-edge w-full mb-2 overflow-hidden">
          <motion.div
            className="h-full bg-signal"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </div>

        <div className="flex justify-between">
          <span className="font-mono text-[10px] text-soft">
            {isMax ? 'MAX' : `${current} XP`}
          </span>
          <span className="font-mono text-[10px] text-soft">
            {isMax ? '' : `${next} XP`}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-edge">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft">Total XP</span>
        <span className="font-mono text-[10px] text-signal ml-2">{xp}</span>
      </div>
    </div>
  )
}
