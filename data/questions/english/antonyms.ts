import { Question } from "@/types/quiz.models";

export const antonymsQuestions: Question[] = [
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
  {
    id: "ANT-005",
    category: "ANTONYM",
    subTopic: "Vocabulary",
    difficulty: "MEDIUM",
    questionText: "What is the opposite of: 'BARREN'?",
    options: [
      { id: "A", text: "Desert" },
      { id: "B", text: "Empty" },
      { id: "C", text: "Fertile" },
      { id: "D", text: "Dry" }
    ],
    correctOptionId: "C",
    explanation: "Barren means too poor to produce vegetation; Fertile is the opposite.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "ANT-006",
    category: "ANTONYM",
    subTopic: "Vocabulary",
    difficulty: "HARD",
    questionText: "Choose the antonym for: 'EXODUS'",
    options: [
      { id: "A", text: "Departure" },
      { id: "B", text: "Migration" },
      { id: "C", text: "Arrival" },
      { id: "D", text: "Exit" }
    ],
    correctOptionId: "C",
    explanation: "Exodus means a mass departure of people. Arrival (or Influx) is the antonym.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "ANT-007",
    category: "ANTONYM",
    subTopic: "Vocabulary",
    difficulty: "MEDIUM",
    questionText: "What is the antonym of: 'VAGUE'?",
    options: [
      { id: "A", text: "Unclear" },
      { id: "B", text: "Definite" },
      { id: "C", text: "Dull" },
      { id: "D", text: "Indistinct" }
    ],
    correctOptionId: "B",
    explanation: "Vague means uncertain or indefinite. Definite or Clear is the opposite.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "ANT-008",
    category: "ANTONYM",
    subTopic: "Vocabulary",
    difficulty: "EASY",
    questionText: "Find the opposite of: 'GUILTY'",
    options: [
      { id: "A", text: "Innocent" },
      { id: "B", text: "Criminal" },
      { id: "C", text: "Sorry" },
      { id: "D", text: "Blameworthy" }
    ],
    correctOptionId: "A",
    explanation: "The opposite of being guilty of a crime or fault is being innocent.",
    marks: 1,
    negativeMarks: 0.33
  },
];
