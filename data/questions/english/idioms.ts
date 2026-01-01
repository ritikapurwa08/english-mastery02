import { Question } from "@/types/quiz.models";

export const idiomsQuestions: Question[] = [
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
  {
    id: "IDM-005",
    category: "IDIOM",
    subTopic: "Common Idioms",
    difficulty: "MEDIUM",
    questionText: "What does 'Spill the beans' mean?",
    options: [
      { id: "A", text: "To cook a meal" },
      { id: "B", text: "To reveal a secret" },
      { id: "C", text: "To drop something" },
      { id: "D", text: "To be clumsy" }
    ],
    correctOptionId: "B",
    explanation: "'Spill the beans' means to give away a secret or private information.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "IDM-006",
    category: "IDIOM",
    subTopic: "Common Idioms",
    difficulty: "EASY",
    questionText: "The idiom 'Once in a blue moon' refers to:",
    options: [
      { id: "A", text: "Something that happens frequently" },
      { id: "B", text: "Something that happens very rarely" },
      { id: "C", text: "A beautiful night sky" },
      { id: "D", text: "Full moon day" }
    ],
    correctOptionId: "B",
    explanation: "This idiom is used to describe an event that happens very infrequently.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "IDM-007",
    category: "IDIOM",
    subTopic: "Common Idioms",
    difficulty: "HARD",
    questionText: "What is the meaning of: 'To bite the bullet'?",
    options: [
      { id: "A", text: "To be shot in battle" },
      { id: "B", text: "To accept something difficult or unpleasant" },
      { id: "C", text: "To be very aggressive" },
      { id: "D", text: "To start a fight" }
    ],
    correctOptionId: "B",
    explanation: "To bite the bullet means to endure a painful or otherwise unpleasant situation that is unavoidable.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "IDM-008",
    category: "IDIOM",
    subTopic: "Common Idioms",
    difficulty: "MEDIUM",
    questionText: "What does 'The lion's share' mean?",
    options: [
      { id: "A", text: "The smallest part" },
      { id: "B", text: "The major share or majority" },
      { id: "C", text: "A dangerous portion" },
      { id: "D", text: "Hunting together" }
    ],
    correctOptionId: "B",
    explanation: "'The lion's share' refers to the largest part of something.",
    marks: 1,
    negativeMarks: 0.33
  }
];
