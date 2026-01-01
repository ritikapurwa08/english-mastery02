// quizModels.ts

// ============ BASIC TYPES ============

export type UserId = string;
export type QuestionId = string;
export type OptionId = string;
export type QuizId = string;
export type AttemptId = string;

// ============ QUESTION MODELS ============

// All English sections you mentioned.
export type QuestionCategory =
  | "SYNONYM"
  | "ANTONYM"
  | "GRAMMAR"
  | "IDIOM"
  | "PHRASAL_VERB";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

// Single MCQ question
export interface Question {
  id: QuestionId;
  category: QuestionCategory;
  subTopic?: string;            // e.g. "Tense", "Subject-Verb Agreement"
  difficulty?: Difficulty;
  questionText: string;
  options: QuestionOption[];
  correctOptionId: OptionId;
  explanation: string;          // full explanation shown in review
  marks: number;                // e.g. 1
  negativeMarks?: number;       // e.g. 0.33
  tags?: string[];              // e.g. ["RPSC-2023", "PYQ"]
}

export interface QuestionOption {
  id: OptionId;
  text: string;
}

// ============ QUIZ / TEST CONFIG ============

// Configuration of one quiz / paper
export interface QuizConfig {
  id: QuizId;
  title: string;                // e.g. "English Practice Set 01"
  description?: string;
  totalQuestions: number;
  durationSeconds: number;      // e.g. 3600 for 1 hour

  // Exam behaviour (RPSC-style)
  allowQuestionNavigation: boolean; // true = can jump to any question
  showQuestionPalette: boolean;     // show boxes 1..N with colors
  showTimer: boolean;               // show countdown

  showResultImmediately: boolean;   // or hide until you decide

  // Limit categories if needed (e.g. only synonyms + antonyms)
  allowedCategories?: QuestionCategory[];
}

// Quiz + ordered questions for that quiz
export interface QuizPaper {
  config: QuizConfig;
  questionIds: QuestionId[];   // order matters
}

// ============ ATTEMPT / RESPONSE MODELS ============

// Status like RPSC palette: Not visited, Answered, etc.
export type AttemptStatus =
  | "NOT_VISITED"
  | "NOT_ANSWERED"
  | "ANSWERED"
  | "REVIEW";

export interface QuestionResponse {
  questionId: QuestionId;
  selectedOptionId?: OptionId;  // undefined => not answered
  status: AttemptStatus;
  timeSpentSeconds: number;     // time spent on this question
}

// One user's attempt of a quiz
export interface QuizAttempt {
  id: AttemptId;
  quizId: QuizId;
  userId: UserId;
  startedAt: string;            // ISO string
  submittedAt?: string;         // ISO string
  durationSeconds: number;      // time actually used

  responses: QuestionResponse[];

  // Calculated after submission
  score?: number;
  totalMarks?: number;
  correctCount?: number;
  wrongCount?: number;
  unattemptedCount?: number;
}

// ============ ANALYTICS / RESULT VIEW ============

export interface CategoryStats {
  category: QuestionCategory;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unattempted: number;
  accuracyPercent: number;
}

// Shape you can send to frontend result page
export interface QuizResultView {
  attemptId: AttemptId;
  quizId: QuizId;
  quizTitle: string;
  userId: UserId;

  score: number;
  totalMarks: number;
  percentage: number;
  durationUsedSeconds: number;
  startedAt: string;
  submittedAt: string;

  overallRankPercentile?: number; // future if you add ranks
  categoryStats: CategoryStats[];
}

// ============ RUNTIME STATE (FRONTEND) ============

// State while user is giving the test (for React / Next.js)
export interface RunningQuizState {
  quiz: QuizPaper;
  attemptId: AttemptId;
  userId: UserId;
  currentQuestionIndex: number;  // 0..N-1
  remainingSeconds: number;      // countdown
  responses: QuestionResponse[];
  isSubmitted: boolean;
}

// ============ EXAMPLE QUESTION DATA (OPTIONAL) ============

// Example: one synonym question for testing
export const sampleQuestions: Question[] = [
  {
    id: "Q1",
    category: "SYNONYM",
    subTopic: "Vocabulary",
    difficulty: "EASY",
    questionText: "Choose the word that is most similar in meaning to 'ABANDON'.",
    options: [
      { id: "Q1A", text: "Give up" },
      { id: "Q1B", text: "Begin" },
      { id: "Q1C", text: "Protect" },
      { id: "Q1D", text: "Adopt" }
    ],
    correctOptionId: "Q1A",
    explanation: "To 'abandon' means to 'leave completely' or 'give up' something or someone.",
    marks: 1,
    negativeMarks: 0.0,
    tags: ["SYNONYM", "BASIC"]
  }
];

// Example quiz config using that question
export const sampleQuizPaper: QuizPaper = {
  config: {
    id: "QUIZ1",
    title: "Sample English Practice Set",
    description: "Mixed English questions for practice.",
    totalQuestions: 1,
    durationSeconds: 300, // 5 minutes
    allowQuestionNavigation: true,
    showQuestionPalette: true,
    showTimer: true,
    showResultImmediately: true,
    allowedCategories: ["SYNONYM", "ANTONYM", "GRAMMAR", "IDIOM", "PHRASAL_VERB"]
  },
  questionIds: ["Q1"]
};
