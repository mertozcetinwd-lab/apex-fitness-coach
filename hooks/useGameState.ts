'use client'
import { useState, useEffect, useCallback } from 'react'
import type { GameState, Message } from '@/lib/types'
import { getLevelFromXP, XP_PER_MESSAGE, calcStreakUpdate } from '@/lib/gameLogic'

const STORAGE_KEY = 'apex_game_state'
const MAX_HISTORY = 50

const WELCOME: Message = {
  id: 'welcome',
  role: 'coach',
  content:
    "Welcome to Apex. I'm your personal fitness coach — here to help with workout plans, nutrition, form, and motivation. What are you working toward?",
  timestamp: Date.now(),
}

function makeDefault(): GameState {
  return {
    xp: 0,
    level: 1,
    totalSessions: 0,
    todaySessions: 0,
    streak: 0,
    bestStreak: 0,
    lastSessionDate: '',
    chatHistory: [WELCOME],
    currentSessionId: crypto.randomUUID(),
    messagedToday: false,
  }
}

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return makeDefault()
    const saved: GameState = JSON.parse(raw)
    const today = new Date().toISOString().slice(0, 10)
    if (saved.lastSessionDate !== today) {
      saved.messagedToday = false
      saved.todaySessions = 0
    }
    return saved
  } catch {
    return makeDefault()
  }
}

function save(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function useGameState() {
  const [state, setState] = useState<GameState | null>(null)
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null)

  useEffect(() => {
    setState(loadState())
  }, [])

  const mutate = useCallback((updater: (prev: GameState) => GameState) => {
    setState(prev => {
      if (!prev) return prev
      const next = updater(prev)
      save(next)
      return next
    })
  }, [])

  const sendMessage = useCallback(
    (content: string): { userMsg: Message; sessionId: string } | null => {
      if (!state) return null

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: Date.now(),
      }

      const newXP = state.xp + XP_PER_MESSAGE
      const newLevel = getLevelFromXP(newXP)
      const streakUpdate = calcStreakUpdate(state)

      mutate(prev => ({
        ...prev,
        ...streakUpdate,
        xp: newXP,
        level: newLevel.number,
        chatHistory: [...prev.chatHistory, userMsg].slice(-MAX_HISTORY),
      }))

      if (newLevel.number > state.level) {
        setLevelUpTo(newLevel.number)
      }

      return { userMsg, sessionId: state.currentSessionId }
    },
    [state, mutate],
  )

  const addCoachMessage = useCallback(
    (content: string) => {
      const msg: Message = {
        id: crypto.randomUUID(),
        role: 'coach',
        content,
        timestamp: Date.now(),
      }
      mutate(prev => ({
        ...prev,
        chatHistory: [...prev.chatHistory, msg].slice(-MAX_HISTORY),
      }))
    },
    [mutate],
  )

  const startNewConversation = useCallback(() => {
    mutate(prev => ({
      ...prev,
      chatHistory: [{ ...WELCOME, id: crypto.randomUUID(), timestamp: Date.now() }],
      currentSessionId: crypto.randomUUID(),
    }))
  }, [mutate])

  const dismissLevelUp = useCallback(() => setLevelUpTo(null), [])

  return { state, sendMessage, addCoachMessage, startNewConversation, levelUpTo, dismissLevelUp }
}
