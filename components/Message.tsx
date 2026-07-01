'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message as MessageType } from '@/lib/types'

interface Props {
  message: MessageType
}

export function Message({ message }: Props) {
  const isCoach = message.role === 'coach'

  return (
    <div className={`flex ${isCoach ? 'justify-start' : 'justify-end'} mb-5`}>
      <div
        className={`max-w-[82%] ${
          isCoach
            ? 'border-l-2 border-signal bg-layer pl-4 pr-5 py-3'
            : 'border border-edge bg-raised px-4 py-3'
        }`}
      >
        <p
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2.5"
          style={{ color: isCoach ? '#00E87A' : '#555E6A' }}
        >
          {isCoach ? 'Coach' : 'You'}
        </p>

        {isCoach ? (
          <div className="text-sm text-white leading-relaxed space-y-3">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Paragraphs
                p: ({ children }) => (
                  <p className="text-sm text-white/90 leading-relaxed">{children}</p>
                ),

                // Headings
                h1: ({ children }) => (
                  <h1 className="font-mono text-base font-bold text-white mt-5 mb-2 first:mt-0 border-b border-edge pb-1">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-mono text-sm font-bold text-white mt-4 mb-2 first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-mono text-sm font-semibold text-signal mt-4 mb-2 first:mt-0">
                    {children}
                  </h3>
                ),

                // Inline
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic" style={{ color: 'rgba(255,255,255,0.7)' }}>{children}</em>
                ),
                code: ({ children }) => (
                  <code className="font-mono text-signal text-xs bg-raised px-1.5 py-0.5">
                    {children}
                  </code>
                ),

                // Lists
                ul: ({ children }) => (
                  <ul className="space-y-1.5 pl-0 my-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-1.5 pl-0 my-2 counter-reset-item">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="flex gap-2.5 text-sm text-white/90 leading-relaxed">
                    <span className="flex-shrink-0 font-mono text-signal mt-0.5">›</span>
                    <span>{children}</span>
                  </li>
                ),

                // Divider
                hr: () => <hr className="border-0 border-t border-edge my-1" />,

                // Blockquote
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-signal/50 pl-3 py-0.5 my-2 text-white/60 text-sm italic">
                    {children}
                  </blockquote>
                ),

                // Tables — styled as a data grid
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3 -mx-1">
                    <table className="w-full border-collapse text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead>{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody>{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr className="border-b border-edge last:border-b-0">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-signal text-left px-3 py-2 whitespace-nowrap bg-raised">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="text-white/85 text-xs px-3 py-2 align-top leading-relaxed">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        )}
      </div>
    </div>
  )
}
