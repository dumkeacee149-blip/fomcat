'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { IconSparkles } from '@/components/icons/Icons'

interface Message {
  readonly id: string
  readonly role: 'user' | 'assistant'
  readonly content: string
  readonly timestamp: number
}

const SUGGESTED_QUESTIONS = [
  'What is "Freedom of Money" about?',
  'Tell me about CZ\'s childhood',
  'How was Binance founded?',
  'What happened with the DOJ case?',
  'Why did CZ write this book in prison?',
  'What are the key lessons from the book?',
] as const

export default function AIPage() {
  const [messages, setMessages] = useState<readonly Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Meow... something went wrong! Please try again later.',
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleSuggestion = (q: string) => {
    sendMessage(q)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
      {/* Header */}
      <motion.div
        className="text-center mb-4 flex-shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-[var(--color-gold)] shadow-md">
            <Image
              src="/images/hakimi-avatar.jpg"
              alt="Hakimi"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1
              className="text-2xl text-[var(--color-text-primary)]"
              style={{ fontFamily: 'Lilita One, cursive' }}
            >
              Ask Hakimi
            </h1>
            <p className="text-xs text-[var(--color-text-muted)] font-bold">AI Reading Companion</p>
          </div>
        </div>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto rounded-3xl border-3 border-[var(--color-border-thick)] bg-white p-4 mb-4" style={{ boxShadow: '6px 6px 0 #E5D0A8' }}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            {/* Welcome state */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[var(--color-gold)] mx-auto mb-4 shadow-lg">
                <Image
                  src="/images/hakimi-avatar.jpg"
                  alt="Hakimi"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="speech-bubble inline-block mb-6 max-w-sm">
                <p className="text-sm font-extrabold text-[var(--color-text-primary)]">
                  Hey there! I&apos;m Hakimi, your reading buddy for &quot;Freedom of Money&quot;. Ask me anything about CZ&apos;s book!
                </p>
              </div>

              {/* Suggested questions */}
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    className="text-xs px-3 py-2 rounded-full bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border-thick)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-light)] transition-all font-bold text-[var(--color-text-secondary)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {msg.role === 'assistant' ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--color-gold)] flex-shrink-0 shadow-sm">
                      <Image
                        src="/images/hakimi-avatar.jpg"
                        alt="Hakimi"
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-pink)] flex items-center justify-center flex-shrink-0 border-2 border-white shadow-sm">
                      <span className="text-xs font-black text-white">You</span>
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm font-bold leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[var(--color-gold)] text-[#2D1B0E] border-2 border-[var(--color-gold-dark)]'
                        : 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border-2 border-[var(--color-border-thick)]'
                    }`}
                    style={{
                      boxShadow: msg.role === 'user' ? '3px 3px 0 var(--color-gold-dark)' : '3px 3px 0 #E5D0A8',
                    }}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--color-gold)] flex-shrink-0 shadow-sm animate-wiggle">
                  <Image
                    src="/images/hakimi-avatar.jpg"
                    alt="Hakimi thinking"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="bg-[var(--color-bg-primary)] border-2 border-[var(--color-border-thick)] rounded-2xl px-4 py-3" style={{ boxShadow: '3px 3px 0 #E5D0A8' }}>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--color-pink)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex-shrink-0">
        <div
          className="flex items-end gap-3 bg-white rounded-2xl border-3 border-[var(--color-border-thick)] p-3"
          style={{ boxShadow: '4px 4px 0 #E5D0A8' }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Hakimi about the book..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm font-bold text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none"
            style={{ fontFamily: 'Nunito, sans-serif', maxHeight: '120px' }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[var(--color-gold)] border-2 border-[var(--color-gold-dark)] flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40 disabled:hover:scale-100 flex-shrink-0"
            style={{ boxShadow: '0 3px 0 var(--color-gold-dark)' }}
          >
            <IconSparkles size={18} className="text-[#2D1B0E]" />
          </button>
        </div>
      </form>
    </div>
  )
}
