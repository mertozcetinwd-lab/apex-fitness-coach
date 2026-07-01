'use client'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import type { Message as MessageType } from '@/lib/types'
import { Message } from './Message'
import { TypingIndicator } from './TypingIndicator'

interface Props {
  messages: MessageType[]
  isLoading: boolean
  onSend: (text: string) => void
  onNewConversation: () => void
}

export function ChatInterface({ messages, isLoading, onSend, onNewConversation }: Props) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSubmit = () => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    onSend(text)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-edge bg-canvas flex-shrink-0">
        <div className="flex items-end gap-0">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Ask your coach..."
            rows={1}
            disabled={isLoading}
            className={`
              flex-1 resize-none bg-transparent border-0 px-6 py-4
              text-sm text-white placeholder:text-soft
              font-sans leading-relaxed
              focus:outline-none
              disabled:opacity-40 disabled:cursor-not-allowed
            `}
            style={{ maxHeight: '160px' }}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className={`
              flex-shrink-0 px-6 py-4 font-mono text-[10px] tracking-[0.2em] uppercase
              transition-colors self-stretch flex items-center
              disabled:opacity-30 disabled:cursor-not-allowed
              enabled:cursor-pointer
              bg-signal text-black hover:bg-white
            `}
          >
            Send
          </button>
        </div>
        <div className="px-6 pb-3">
          <p className="font-mono text-[9px] text-soft">
            Enter to send · Shift+Enter for new line ·{' '}
            <button
              onClick={onNewConversation}
              className="hover:text-white transition-colors cursor-pointer underline underline-offset-2"
            >
              New conversation
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
