import { Question } from "@/types/quiz.models";

export const synonymsQuestions: Question[] = [
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
  {
    id: "SYN-005",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "MEDIUM",
    questionText: "Choose the word most similar in meaning to: 'ADVERSITY'",
    options: [
      { id: "A", text: "Prosperity" },
      { id: "B", text: "Misfortune" },
      { id: "C", text: "Happiness" },
      { id: "D", text: "Capacity" }
    ],
    correctOptionId: "B",
    explanation: "'Adversity' refers to a difficult or unpleasant situation; misfortune is its synonym.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "SYN-006",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "MEDIUM",
    questionText: "Which word is a synonym for: 'CANDID'?",
    options: [
      { id: "A", text: "Deceptive" },
      { id: "B", text: "Frank" },
      { id: "C", text: "Arrogant" },
      { id: "D", text: "Vague" }
    ],
    correctOptionId: "B",
    explanation: "Candid means truthful and straightforward; frank is the correct synonym.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "SYN-007",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "HARD",
    questionText: "Identify the synonym of: 'GARRULOUS'",
    options: [
      { id: "A", text: "Quiet" },
      { id: "B", text: "Talkative" },
      { id: "C", text: "Concise" },
      { id: "D", text: "Stubborn" }
    ],
    correctOptionId: "B",
    explanation: "Garrulous means excessively talkative, especially on trivial matters.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "SYN-008",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "EASY",
    questionText: "Choose the synonym for: 'ENORMOUS'",
    options: [
      { id: "A", text: "Tiny" },
      { id: "B", text: "Huge" },
      { id: "C", text: "Weak" },
      { id: "D", text: "Soft" }
    ],
    correctOptionId: "B",
    explanation: "Enormous means very large in size, quantity, or extent.",
    marks: 1,
    negativeMarks: 0.33
  },
];
