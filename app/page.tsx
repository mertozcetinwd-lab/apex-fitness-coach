'use client'
import { useState, useCallback } from 'react'
import { useGameState } from '@/hooks/useGameState'
import { ChatInterface } from '@/components/ChatInterface'
import { GamificationPanel } from '@/components/GamificationPanel'
import { LevelUpModal } from '@/components/LevelUpModal'

export default function Page() {
  const { state, sendMessage, addCoachMessage, startNewConversation, levelUpTo, dismissLevelUp } =
    useGameState()
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = useCallback(
    async (text: string) => {
      if (!state || isLoading) return

      const result = sendMessage(text)
      if (!result) return

      setIsLoading(true)
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, sessionId: result.sessionId }),
        })
        const data = await res.json()
        if (data.success && data.data?.response) {
          addCoachMessage(data.data.response)
        } else {
          addCoachMessage(data.error ?? "I couldn't process that — please try rephrasing.")
        }
      } catch {
        addCoachMessage('Connection error. Please check your internet and try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [state, isLoading, sendMessage, addCoachMessage],
  )

  // Prevent hydration mismatch — state loads from localStorage after mount
  if (!state) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-soft animate-pulse">
          Loading...
        </span>
      </div>
    )
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Chat column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="border-b border-edge px-6 py-4 flex items-center justify-between flex-shrink-0 bg-canvas">
          <span className="font-mono text-sm tracking-[0.35em] uppercase text-white select-none">
            Apex
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-soft">
            Fitness Coach
          </span>
        </header>

        <ChatInterface
          messages={state.chatHistory}
          isLoading={isLoading}
          onSend={handleSend}
          onNewConversation={startNewConversation}
        />
      </div>

      {/* Gamification sidebar — hidden on small screens */}
      <div className="w-64 flex-shrink-0 hidden lg:flex lg:flex-col overflow-hidden">
        <GamificationPanel state={state} />
      </div>

      {/* Level-up celebration modal */}
      <LevelUpModal levelNumber={levelUpTo} onDismiss={dismissLevelUp} />
    </div>
  )
}
