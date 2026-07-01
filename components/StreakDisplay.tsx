'use client'

interface Props {
  streak: number
  bestStreak: number
  totalSessions: number
  todaySessions: number
}

export function StreakDisplay({ streak, bestStreak, totalSessions, todaySessions }: Props) {
  return (
    <div className="space-y-3">
      {/* Streak */}
      <div className="border border-edge bg-layer p-4">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft mb-3">Streak</p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold text-white">{streak}</span>
          <span className="font-mono text-xs text-soft">
            {streak === 1 ? 'day' : 'days'}
          </span>
        </div>
        <p className="font-mono text-[10px] text-soft mt-1">
          Best <span className="text-signal">{bestStreak}</span>
        </p>
      </div>

      {/* Sessions */}
      <div className="border border-edge bg-layer p-4">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft mb-3">Sessions</p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold text-white">{totalSessions}</span>
          <span className="font-mono text-xs text-soft">total</span>
        </div>
        <p className="font-mono text-[10px] text-soft mt-1">
          Today <span className="text-signal">{todaySessions}</span>
        </p>
      </div>
    </div>
  )
}
