import { Question } from "@/types/quiz.models";


export const englishPracticeQuestions: Question[] = [
  // ============ SYNONYMS (4 Questions) ============
  {
    id: "SYN-001",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "MEDIUM",
    questionText: "Choose the word most similar in meaning to: 'RELIQUISH'",
    options: [
      { id: "A", text: "Retain" },
      { id: "B", text: "Abandon" },
      { id: "C", text: "Possess" },
      { id: "D", text: "Continue" }
    ],
    correctOptionId: "B",
    explanation: "To 'Relinquish' means to voluntarily cease to keep or claim; to give up. 'Abandon' is the closest synonym.",
    marks: 1,
    negativeMarks: 0.33,
    tags: ["Vocabulary", "SSC"]
  },
  {
    id: "SYN-002",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "EASY",
    questionText: "Choose the synonym for: 'BENEVOLENT'",
    options: [
      { id: "A", text: "Miserly" },
      { id: "B", text: "Cruel" },
      { id: "C", text: "Kind" },
      { id: "D", text: "Selfish" }
    ],
    correctOptionId: "C",
    explanation: "Benevolent means well-meaning and kindly.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "SYN-003",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "HARD",
    questionText: "Identify the synonym of: 'EPHEMERAL'",
    options: [
      { id: "A", text: "Eternal" },
      { id: "B", text: "Transitory" },
      { id: "C", text: "Stable" },
      { id: "D", text: "Permanent" }
    ],
    correctOptionId: "B",
    explanation: "Ephemeral means lasting for a very short time. 'Transitory' shares this meaning.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "SYN-004",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "MEDIUM",
    questionText: "Which word means the same as: 'PRUDENT'?",
    options: [
      { id: "A", text: "Reckless" },
      { id: "B", text: "Careless" },
      { id: "C", text: "Wise" },
      { id: "D", text: "Hasty" }
    ],
    correctOptionId: "C",
    explanation: "Prudent means acting with or showing care and thought for the future; wise.",
    marks: 1,
    negativeMarks: 0.33
  },

  // ============ ANTONYMS (4 Questions) ============
  {
    id: "ANT-001",
    category: "ANTONYM",
    subTopic: "Vocabulary",
    difficulty: "EASY",
    questionText: "What is the opposite of: 'ARROGANT'?",
    options: [
      { id: "A", text: "Haughty" },
      { id: "B", text: "Humble" },
      { id: "C", text: "Proud" },
      { id: "D", text: "Vain" }
    ],
    correctOptionId: "B",
    explanation: "Arrogant implies having an exaggerated sense of one's own importance. 'Humble' is the direct opposite.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "ANT-002",
    category: "ANTONYM",
    subTopic: "Vocabulary",
    difficulty: "MEDIUM",
    questionText: "Choose the antonym for: 'TRANSPARENT'",
    options: [
      { id: "A", text: "Clear" },
      { id: "B", text: "Lucid" },
      { id: "C", text: "Opaque" },
      { id: "D", text: "Translucent" }
    ],
    correctOptionId: "C",
    explanation: "Transparent allows light to pass through. Opaque does not allow light to pass through.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "ANT-003",
    category: "ANTONYM",
    subTopic: "Vocabulary",
    difficulty: "HARD",
    questionText: "What is the antonym of: 'ABUNDANCE'?",
    options: [
      { id: "A", text: "Scarcity" },
      { id: "B", text: "Plenitude" },
      { id: "C", text: "Wealth" },
      { id: "D", text: "Surplus" }
    ],
    correctOptionId: "A",
    explanation: "Abundance means a very large quantity. Scarcity means the state of being in short supply.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "ANT-004",
    category: "ANTONYM",
    subTopic: "Vocabulary",
    difficulty: "MEDIUM",
    questionText: "Find the opposite of: 'HOSTILE'",
    options: [
      { id: "A", text: "Antagonistic" },
      { id: "B", text: "Friendly" },
      { id: "C", text: "Aggressive" },
      { id: "D", text: "Unkind" }
    ],
    correctOptionId: "B",
    explanation: "Hostile means showing opposition or dislike. Friendly is the antonym.",
    marks: 1,
    negativeMarks: 0.33
  },

  // ============ IDIOMS (4 Questions) ============
  {
    id: "IDM-001",
    category: "IDIOM",
    subTopic: "Common Idioms",
    difficulty: "EASY",
    questionText: "What does the idiom 'A piece of cake' mean?",
    options: [
      { id: "A", text: "Something very delicious" },
      { id: "B", text: "A very easy task" },
      { id: "C", text: "To share a secret" },
      { id: "D", text: "A difficult problem" }
    ],
    correctOptionId: "B",
    explanation: "'A piece of cake' refers to a task or job that is very easy to complete.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "IDM-002",
    category: "IDIOM",
    subTopic: "Common Idioms",
    difficulty: "MEDIUM",
    questionText: "What is the meaning of: 'To burn the midnight oil'?",
    options: [
      { id: "A", text: "To waste resources" },
      { id: "B", text: "To work or study late into the night" },
      { id: "C", text: "To cook a late dinner" },
      { id: "D", text: "To be very angry" }
    ],
    correctOptionId: "B",
    explanation: "This idiom means to stay up late working or studying.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "IDM-003",
    category: "IDIOM",
    subTopic: "Common Idioms",
    difficulty: "MEDIUM",
    questionText: "What does 'Under the weather' mean?",
    options: [
      { id: "A", text: "To be in the rain" },
      { id: "B", text: "To feel slightly unwell" },
      { id: "C", text: "To be very happy" },
      { id: "D", text: "To be stuck in a storm" }
    ],
    correctOptionId: "B",
    explanation: "If someone is 'under the weather', they feel sick or exhausted.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "IDM-004",
    category: "IDIOM",
    subTopic: "Common Idioms",
    difficulty: "HARD",
    questionText: "What is the meaning of: 'To beat around the bush'?",
    options: [
      { id: "A", text: "To cut the grass" },
      { id: "B", text: "To avoid the main topic" },
      { id: "C", text: "To work hard" },
      { id: "D", text: "To search for something" }
    ],
    correctOptionId: "B",
    explanation: "To 'beat around the bush' means to discuss a matter without coming to the point.",
    marks: 1,
    negativeMarks: 0.33
  },

  // ============ PHRASAL VERBS (4 Questions) ============
  {
    id: "PHV-001",
    category: "PHRASAL_VERB",
    subTopic: "Usage",
    difficulty: "MEDIUM",
    questionText: "The meeting was _______ due to heavy rain.",
    options: [
      { id: "A", text: "Called off" },
      { id: "B", text: "Called on" },
      { id: "C", text: "Called for" },
      { id: "D", text: "Called up" }
    ],
    correctOptionId: "A",
    explanation: "'Call off' means to cancel something.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "PHV-002",
    category: "PHRASAL_VERB",
    subTopic: "Usage",
    difficulty: "MEDIUM",
    questionText: "I am really _______ to our summer vacation.",
    options: [
      { id: "A", text: "Looking for" },
      { id: "B", text: "Looking into" },
      { id: "C", text: "Looking forward to" },
      { id: "D", text: "Looking after" }
    ],
    correctOptionId: "C",
    explanation: "'Look forward to' means to await something with pleasure.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "PHV-003",
    category: "PHRASAL_VERB",
    subTopic: "Usage",
    difficulty: "EASY",
    questionText: "Could you _______ the television? It's too loud.",
    options: [
      { id: "A", text: "Turn up" },
      { id: "B", text: "Turn down" },
      { id: "C", text: "Turn on" },
      { id: "D", text: "Turn off" }
    ],
    correctOptionId: "B",
    explanation: "'Turn down' means to reduce the volume or intensity.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "PHV-004",
    category: "PHRASAL_VERB",
    subTopic: "Usage",
    difficulty: "HARD",
    questionText: "He had to _______ the old car because it kept breaking down.",
    options: [
      { id: "A", text: "Do away with" },
      { id: "B", text: "Do up" },
      { id: "C", text: "Do for" },
      { id: "D", text: "Do with" }
    ],
    correctOptionId: "A",
    explanation: "'Do away with' means to get rid of or abolish something.",
    marks: 1,
    negativeMarks: 0.33
  },

  // ============ GRAMMAR (4 Questions) ============
  {
    id: "GRM-001",
    category: "GRAMMAR",
    subTopic: "Subject-Verb Agreement",
    difficulty: "MEDIUM",
    questionText: "Each of the students _______ submitted the assignment.",
    options: [
      { id: "A", text: "have" },
      { id: "B", text: "has" },
      { id: "C", text: "were" },
      { id: "D", text: "are" }
    ],
    correctOptionId: "B",
    explanation: "The subject 'Each' is singular, so it requires the singular verb 'has'.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "GRM-002",
    category: "GRAMMAR",
    subTopic: "Conditionals",
    difficulty: "HARD",
    questionText: "If I _______ you, I would accept the offer immediately.",
    options: [
      { id: "A", text: "am" },
      { id: "B", text: "was" },
      { id: "C", text: "were" },
      { id: "D", text: "had been" }
    ],
    correctOptionId: "C",
    explanation: "In the second conditional (hypothetical), we use 'were' for all subjects, including 'I'.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "GRM-003",
    category: "GRAMMAR",
    subTopic: "Prepositions",
    difficulty: "EASY",
    questionText: "She is very fond _______ classical music.",
    options: [
      { id: "A", text: "with" },
      { id: "B", text: "of" },
      { id: "C", text: "about" },
      { id: "D", text: "at" }
    ],
    correctOptionId: "B",
    explanation: "The adjective 'fond' is always followed by the preposition 'of'.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "GRM-004",
    category: "GRAMMAR",
    subTopic: "Articles",
    difficulty: "MEDIUM",
    questionText: "Mr. Sharma is _______ honest man.",
    options: [
      { id: "A", text: "a" },
      { id: "B", text: "an" },
      { id: "C", text: "the" },
      { id: "D", text: "no article" }
    ],
    correctOptionId: "B",
    explanation: "Since 'honest' starts with a vowel sound (silent 'h'), we use the article 'an'.",
    marks: 1,
    negativeMarks: 0.33
  }
];

