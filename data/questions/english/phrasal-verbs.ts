import { Question } from "@/types/quiz.models";

export const phrasalVerbsQuestions: Question[] = [
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
  {
    id: "PHV-005",
    category: "PHRASAL_VERB",
    subTopic: "Usage",
    difficulty: "HARD",
    questionText: "I cannot _______ his rude behavior anymore.",
    options: [
      { id: "A", text: "Put up with" },
      { id: "B", text: "Put out" },
      { id: "C", text: "Put off" },
      { id: "D", text: "Put by" }
    ],
    correctOptionId: "A",
    explanation: "'Put up with' means to tolerate someone or something.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "PHV-006",
    category: "PHRASAL_VERB",
    subTopic: "Usage",
    difficulty: "MEDIUM",
    questionText: "The police are _______ the cause of the accident.",
    options: [
      { id: "A", text: "Looking after" },
      { id: "B", text: "Looking into" },
      { id: "C", text: "Looking for" },
      { id: "D", text: "Looking over" }
    ],
    correctOptionId: "B",
    explanation: "'Look into' means to investigate.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "PHV-007",
    category: "PHRASAL_VERB",
    subTopic: "Usage",
    difficulty: "MEDIUM",
    questionText: "We have _______ milk; please buy some on your way home.",
    options: [
      { id: "A", text: "Run out of" },
      { id: "B", text: "Run into" },
      { id: "C", text: "Run over" },
      { id: "D", text: "Run through" }
    ],
    correctOptionId: "A",
    explanation: "'Run out of' means to finish the supply of something.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "PHV-008",
    category: "PHRASAL_VERB",
    subTopic: "Usage",
    difficulty: "EASY",
    questionText: "Don't _______ your hopes too high.",
    options: [
      { id: "A", text: "Get" },
      { id: "B", text: "Keep" },
      { id: "C", text: "Hold" },
      { id: "D", text: "Build" }
    ],
    correctOptionId: "B",
    explanation: "'Keep your hopes up' is a common phrasal usage meaning to remain optimistic.",
    marks: 1,
    negativeMarks: 0.33
  }
];
