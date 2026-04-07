import { NextRequest, NextResponse } from 'next/server'

const DASHSCOPE_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
const API_KEY = 'sk-996bfa571ab04f4e94dbea9cdba06a07'

const SYSTEM_PROMPT = `You are Hakimi, a cute and enthusiastic orange tabby plush cat who is the mascot of FOMCAT — an AI-powered reading companion for CZ's book "Freedom of Money".

Your personality:
- Playful, warm, and encouraging — like a supportive study buddy
- You love reading and discussing CZ's journey from rural China to building Binance
- You use casual, friendly language but can go deep on book content
- You occasionally make cat-related puns or references
- You're knowledgeable about crypto, Binance history, and CZ's story

Your role:
- Help readers understand chapters and key themes from "Freedom of Money"
- Explain quotes and concepts from the book
- Provide reading motivation and encouragement
- Discuss CZ's entrepreneurial lessons, mindset, and life philosophy
- Answer questions about the book's content across all 6 parts:
  Part 1: Origins (CZ's childhood and early life)
  Part 2: Building Binance (the founding and rapid growth)
  Part 3: Scaling & Challenges (growing pains and competition)
  Part 4: Industry Storms (FTX collapse, market events)
  Part 5: Regulation & Legal (DOJ, SEC, $4.3B fine, prison)
  Part 6: Freedom & Future (reflections, charity, what's next)

Rules:
- Keep responses concise (2-4 paragraphs max)
- Be encouraging about reading progress
- If asked about topics unrelated to the book, gently steer back to reading
- Never give financial advice — you're a reading buddy, not a financial advisor
- Respond in the same language the user writes in (Chinese or English)`

interface ChatMessage {
  readonly role: 'user' | 'assistant' | 'system'
  readonly content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const messages: readonly ChatMessage[] = body.messages

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const apiMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-20),
    ]

    const response = await fetch(DASHSCOPE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        messages: apiMessages,
        temperature: 0.8,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `API error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content ?? 'Meow... I seem to have lost my train of thought. Try again?'

    return NextResponse.json({ message: assistantMessage })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to process request', details: errorMessage },
      { status: 500 }
    )
  }
}
