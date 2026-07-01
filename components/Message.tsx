'use client'
import type { Message as MessageType } from '@/lib/types'

interface Props {
  message: MessageType
}

export function Message({ message }: Props) {
  const isCoach = message.role === 'coach'

  return (
    <div className={`flex ${isCoach ? 'justify-start' : 'justify-end'} mb-5`}>
      <div
        className={`max-w-[78%] ${
          isCoach
            ? 'border-l-2 border-signal bg-layer pl-4 pr-5 py-3'
            : 'border border-edge bg-raised px-4 py-3'
        }`}
      >
        <p
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
          style={{ color: isCoach ? '#00E87A' : '#555E6A' }}
        >
          {isCoach ? 'Coach' : 'You'}
        </p>
        <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
