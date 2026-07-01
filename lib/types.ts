export interface Message {
  id: string
  role: 'user' | 'coach'
  content: string
  timestamp: number
}

export interface Level {
  number: number
  name: string
  xpRequired: number
}

export interface GameState {
  xp: number
  level: number
  totalSessions: number
  todaySessions: number
  streak: number
  bestStreak: number
  lastSessionDate: string
  chatHistory: Message[]
  currentSessionId: string
  messagedToday: boolean
}
