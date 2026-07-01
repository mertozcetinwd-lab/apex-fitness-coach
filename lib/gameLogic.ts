import type { Level, GameState } from './types'

export const LEVELS: Level[] = [
  { number: 1,  name: 'Rookie',     xpRequired: 0     },
  { number: 2,  name: 'Active',     xpRequired: 50    },
  { number: 3,  name: 'Athlete',    xpRequired: 150   },
  { number: 4,  name: 'Competitor', xpRequired: 300   },
  { number: 5,  name: 'Elite',      xpRequired: 500   },
  { number: 6,  name: 'Pro',        xpRequired: 750   },
  { number: 7,  name: 'Champion',   xpRequired: 1100  },
  { number: 8,  name: 'Expert',     xpRequired: 1500  },
  { number: 9,  name: 'Master',     xpRequired: 2100  },
  { number: 10, name: 'Legend',     xpRequired: 2800  },
]

export const XP_PER_MESSAGE = 10

export function getLevelFromXP(xp: number): Level {
  let current = LEVELS[0]
  for (const l of LEVELS) {
    if (xp >= l.xpRequired) current = l
  }
  return current
}

export function getNextLevel(level: Level): Level | null {
  const idx = LEVELS.findIndex(l => l.number === level.number)
  return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null
}

export function getXPProgress(xp: number): { current: number; next: number; pct: number } {
  const level = getLevelFromXP(xp)
  const next = getNextLevel(level)
  if (!next) return { current: xp - level.xpRequired, next: 0, pct: 100 }
  const current = xp - level.xpRequired
  const range = next.xpRequired - level.xpRequired
  return { current, next: range, pct: Math.round((current / range) * 100) }
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayISO(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export function calcStreakUpdate(state: GameState): Partial<GameState> {
  if (state.messagedToday) return {}
  const today = todayISO()
  const streak = state.lastSessionDate === yesterdayISO() ? state.streak + 1 : 1
  return {
    streak,
    bestStreak: Math.max(streak, state.bestStreak),
    lastSessionDate: today,
    totalSessions: state.totalSessions + 1,
    todaySessions: state.todaySessions + 1,
    messagedToday: true,
  }
}
