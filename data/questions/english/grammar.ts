import { Question } from "@/types/quiz.models";

export const grammarQuestions: Question[] = [
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
  },
  {
    id: "GRM-005",
    category: "GRAMMAR",
    subTopic: "Question Tags",
    difficulty: "EASY",
    questionText: "You are coming to the party, _______?",
    options: [
      { id: "A", text: "aren't you" },
      { id: "B", text: "won't you" },
      { id: "C", text: "isn't it" },
      { id: "D", text: "are you" }
    ],
    correctOptionId: "A",
    explanation: "For a positive statement with 'are', the question tag is negative: 'aren't you?'.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "GRM-006",
    category: "GRAMMAR",
    subTopic: "Conjunctions",
    difficulty: "HARD",
    questionText: "Hardly had I reached the station _______ the train started.",
    options: [
      { id: "A", text: "than" },
      { id: "B", text: "when" },
      { id: "C", text: "then" },
      { id: "D", text: "while" }
    ],
    correctOptionId: "B",
    explanation: "'Hardly... when' is a correlative conjunction pair. 'No sooner' takes 'than'.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "GRM-007",
    category: "GRAMMAR",
    subTopic: "Tenses",
    difficulty: "MEDIUM",
    questionText: "By next June, he _______ in this office for ten years.",
    options: [
      { id: "A", text: "will work" },
      { id: "B", text: "will be working" },
      { id: "C", text: "will have been working" },
      { id: "D", text: "has been working" }
    ],
    correctOptionId: "C",
    explanation: "This requires Future Perfect Continuous tense to show an action continuing up to a point in the future.",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    id: "GRM-008",
    category: "GRAMMAR",
    subTopic: "Pronouns",
    difficulty: "MEDIUM",
    questionText: "Neither of the two brothers _______ ready to help me.",
    options: [
      { id: "A", text: "were" },
      { id: "B", text: "was" },
      { id: "C", text: "are" },
      { id: "D", text: "have been" }
    ],
    correctOptionId: "B",
    explanation: "'Neither' is a singular distributive pronoun and takes a singular verb ('was').",
    marks: 1,
    negativeMarks: 0.33
  }
];
