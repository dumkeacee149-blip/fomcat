export interface QuizQuestion {
  readonly sectionId: string
  readonly question: string
  readonly options: readonly string[]
  readonly correctIndex: number
}

/**
 * Each section has multiple quiz questions.
 * One is randomly selected during check-in to verify reading.
 */
export const quizQuestions: readonly QuizQuestion[] = [
  // Section 1: Growing Up
  {
    sectionId: 'section-1',
    question: 'Where did CZ grow up as a child?',
    options: ['Urban Shanghai', 'Rural China', 'Hong Kong', 'Singapore'],
    correctIndex: 1,
  },
  {
    sectionId: 'section-1',
    question: 'Which country did CZ immigrate to as a teenager?',
    options: ['United States', 'Australia', 'Canada', 'United Kingdom'],
    correctIndex: 2,
  },
  {
    sectionId: 'section-1',
    question: "What was CZ's childhood home like?",
    options: ['Modern apartment', 'Dirt floor, no running water', 'Suburban house', 'City penthouse'],
    correctIndex: 1,
  },

  // Section 2: Building Binance
  {
    sectionId: 'section-2',
    question: 'How many days did it take to launch Binance?',
    options: ['30 days', '60 days', '14 days', '90 days'],
    correctIndex: 2,
  },
  {
    sectionId: 'section-2',
    question: 'What happened on Binance launch day?',
    options: [
      'Massive buy orders flooded in',
      'Screen full of sell orders, no buy orders',
      'The website crashed immediately',
      'CZ canceled the launch',
    ],
    correctIndex: 1,
  },
  {
    sectionId: 'section-2',
    question: 'How long did it take Binance to become the #1 exchange by volume?',
    options: ['1 year', '6 months', '3 months', '2 weeks'],
    correctIndex: 2,
  },

  // Section 3: Industry Storms
  {
    sectionId: 'section-3',
    question: 'What does CZ say is the scarcest resource during rapid growth?',
    options: ['Capital', 'Technology', 'Talent', 'Office space'],
    correctIndex: 2,
  },
  {
    sectionId: 'section-3',
    question: 'According to CZ, what attracts top talent?',
    options: ['High salary only', 'Mission and vision', 'Stock options', 'Free food'],
    correctIndex: 1,
  },
  {
    sectionId: 'section-3',
    question: "What is CZ's first priority during a crisis?",
    options: ['Protect company reputation', 'Protect user assets', 'Protect stock price', 'Protect employees'],
    correctIndex: 1,
  },

  // Section 4: Crypto's Mission
  {
    sectionId: 'section-4',
    question: 'Which country leads in USDT/USDC holdings according to the book?',
    options: ['United States', 'Japan', 'Nigeria', 'South Korea'],
    correctIndex: 2,
  },
  {
    sectionId: 'section-4',
    question: 'What does "Freedom of Money" mean according to CZ?',
    options: [
      'Getting rich quickly',
      'Equal access to financial services for everyone',
      'No government regulation',
      'Free cryptocurrency airdrops',
    ],
    correctIndex: 1,
  },
  {
    sectionId: 'section-4',
    question: 'What education project did CZ start?',
    options: ['Binance Academy', 'Giggle Academy', 'Crypto School', 'BNB University'],
    correctIndex: 1,
  },

  // Section 5: Regulatory Storm
  {
    sectionId: 'section-5',
    question: 'What was CZ charged with?',
    options: [
      'Money laundering',
      'Securities fraud',
      'Incomplete paperwork under the Bank Secrecy Act',
      'Tax evasion',
    ],
    correctIndex: 2,
  },
  {
    sectionId: 'section-5',
    question: 'How long was CZ sentenced to prison?',
    options: ['1 year', '4 months', '2 years', '6 months'],
    correctIndex: 1,
  },
  {
    sectionId: 'section-5',
    question: 'Why was CZ detained again after prison?',
    options: [
      'New charges filed',
      'Overstaying his visa (while he was in prison)',
      'Failed parole check',
      'Witness protection',
    ],
    correctIndex: 1,
  },

  // Section 6: Future Vision
  {
    sectionId: 'section-6',
    question: 'According to CZ, the crypto industry is in what stage?',
    options: ['Mature phase', 'Decline phase', 'Early stages', 'Peak adoption'],
    correctIndex: 2,
  },
  {
    sectionId: 'section-6',
    question: 'Where did CZ write most of this book?',
    options: ['His office', 'A coffee shop', 'In prison', 'On a plane'],
    correctIndex: 2,
  },
  {
    sectionId: 'section-6',
    question: 'What happens to all proceeds from the book?',
    options: ['Go to Binance', 'Go to CZ personally', 'Go to charity', 'Go to investors'],
    correctIndex: 2,
  },
] as const

/** Get a random question for a given section */
export function getRandomQuestion(sectionId: string): QuizQuestion {
  const sectionQuestions = quizQuestions.filter((q) => q.sectionId === sectionId)
  if (sectionQuestions.length === 0) {
    // Fallback to any question
    return quizQuestions[Math.floor(Math.random() * quizQuestions.length)]
  }
  return sectionQuestions[Math.floor(Math.random() * sectionQuestions.length)]
}
