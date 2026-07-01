'use client'
import { LevelCard } from './LevelCard'
import { StreakDisplay } from './StreakDisplay'
import type { GameState } from '@/lib/types'

interface Props {
  state: GameState
}

export function GamificationPanel({ state }: Props) {
  return (
    <aside className="flex flex-col h-full border-l border-edge bg-canvas overflow-y-auto">
      {/* Header */}
      <div className="border-b border-edge px-4 py-3 flex-shrink-0">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft">Progress</p>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <LevelCard xp={state.xp} />
        <StreakDisplay
          streak={state.streak}
          bestStreak={state.bestStreak}
          totalSessions={state.totalSessions}
          todaySessions={state.todaySessions}
        />

        {/* XP legend */}
        <div className="border border-edge bg-layer p-4">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft mb-3">How it works</p>
          <ul className="space-y-1.5">
            <li className="font-mono text-[10px] text-soft">
              <span className="text-signal">+10 XP</span> per message
            </li>
            <li className="font-mono text-[10px] text-soft">
              <span className="text-signal">Streak</span> for daily check-ins
            </li>
            <li className="font-mono text-[10px] text-soft">
              <span className="text-signal">10 levels</span> to climb
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
