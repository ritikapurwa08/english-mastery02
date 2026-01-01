import { Question } from "@/types/quiz.models";
import { synonymsQuestions } from "./english/synonyms";
import { antonymsQuestions } from "./english/antonyms";
import { idiomsQuestions } from "./english/idioms";
import { phrasalVerbsQuestions } from "./english/phrasal-verbs";
import { grammarQuestions } from "./english/grammar";

// Consolidated list of all English practice questions
export const englishPracticeQuestions: Question[] = [
  ...synonymsQuestions,
  ...antonymsQuestions,
  ...idiomsQuestions,
  ...phrasalVerbsQuestions,
  ...grammarQuestions
];

// Export subject-specific lists if needed separately
export {
  synonymsQuestions,
  antonymsQuestions,
  idiomsQuestions,
  phrasalVerbsQuestions,
  grammarQuestions
};
