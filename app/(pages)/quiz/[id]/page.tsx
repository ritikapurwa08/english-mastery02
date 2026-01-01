"use client"
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { englishPracticeQuestions } from "@/data/questions/questions";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc, increment, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { Loader2, CheckCircle, ArrowRight, Settings2, Play, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SavedTestResult, Question, QuestionOption } from "@/types/quiz.models";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const categoryId = typeof params.id === 'string' ? params.id.toUpperCase() : "ALL";

  const [setupMode, setSetupMode] = useState(true);
  const [loadingSetup, setLoadingSetup] = useState(true);

  // Setup config
  const [questionCount, setQuestionCount] = useState("10");
  const [includeAnswered, setIncludeAnswered] = useState(false);
  const [availableQuestions, setAvailableQuestions] = useState(0);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch User Progress (Answered IDs)
  useEffect(() => {
    async function fetchProgress() {
      if (!user) {
          setLoadingSetup(false);
          return;
      }
      try {
        const docRef = doc(db, "users", user.uid, "progress", "general");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setAnsweredIds(docSnap.data().answeredQuestionIds || []);
        }
      } catch (err) {
        console.error("Failed to fetch progress", err);
      } finally {
        setLoadingSetup(false);
      }
    }
    fetchProgress();
  }, [user]);

  // 2. Calculate available questions based on category and history
  const getPool = useCallback(() => {
    let pool = categoryId === "ALL"
        ? englishPracticeQuestions
        : englishPracticeQuestions.filter(q => q.category === categoryId);

    if (!includeAnswered) {
        pool = pool.filter(q => !answeredIds.includes(q.id));
    }
    return pool;
  }, [categoryId, includeAnswered, answeredIds]);

  useEffect(() => {
    if (!loadingSetup) {
        setAvailableQuestions(getPool().length);
    }
  }, [loadingSetup, getPool]);

  const startQuiz = () => {
    const pool = getPool();
    if (pool.length === 0) {
        toast.error("No questions available! Try including answered questions.");
        return;
    }

    const count = parseInt(questionCount);
    // Shuffle and slice
    const selected = pool.sort(() => 0.5 - Math.random()).slice(0, count);
    setQuestions(selected);
    setCurrentIdx(0);
    setSetupMode(false);
  };

  const handleAnswerObj = (qId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [qId]: optionId }));
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Calculate score
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    let score = 0;

    const detailedAnswers: SavedTestResult['answers'] = [];
    const newAnsweredIds: string[] = [];

    questions.forEach((q: Question) => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correctOptionId;

        if (userAnswer) {
            newAnsweredIds.push(q.id);
            if (isCorrect) {
                correct++;
                score += q.marks;
            } else {
                wrong++;
                score -= (q.negativeMarks || 0);
            }
        } else {
            skipped++;
        }

        detailedAnswers.push({
            questionId: q.id,
            userAnswer: userAnswer || undefined,
            isCorrect: userAnswer ? isCorrect : false,
            correctAnswer: q.options.find((o: QuestionOption) => o.id === q.correctOptionId)?.text || "N/A",
            questionText: q.questionText,
            explanation: q.explanation
        });
    });

    const finalScore = Math.max(0, parseFloat(score.toFixed(2)));
    const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);
    const percentage = Math.round((finalScore / totalMarks) * 100);

    const resultData: SavedTestResult = {
        testId: categoryId,
        date: new Date().toISOString(),
        totalQuestions: questions.length,
        correct,
        wrong,
        skipped,
        score: finalScore,
        totalMarks,
        percentage,
        answers: detailedAnswers
    };

    try {
        if (user) {
            // 1. Save Result
            const resRef = await addDoc(collection(db, "users", user.uid, "testResults"), resultData);

            // 2. Update User XP
            const xpEarned = correct * 10;
            const updatePromises: Promise<void>[] = [];

            // Update main profile XP
            if (xpEarned > 0) {
                updatePromises.push(updateDoc(doc(db, "users", user.uid), {
                    xp: increment(xpEarned)
                }));
            }

            // 3. Update Answered Questions History (General Progress)
            if (newAnsweredIds.length > 0) {
                 const progressRef = doc(db, "users", user.uid, "progress", "general");
                 updatePromises.push(setDoc(progressRef, {
                     answeredQuestionIds: arrayUnion(...newAnsweredIds)
                 }, { merge: true }));
            }

            await Promise.all(updatePromises);
            toast.success("Test submitted successfully!");
            // Redirect to detailed result view
            router.replace(`/history/${resRef.id}`);
        } else {
             // Guest Mode: Store result in localStorage for a temporary review page?
             // Or just redirect to history page but client-side?
             // Since /history/[id] fetches from Firebase, we can't redirect there easily without a doc ID.
             // For now, let's just show a success toast and redirect to /history (which will be empty/guest).
             // BETTER: Show a local summary or just alert.
             // Since the user wants to "give a test", simply completing it might be enough, but reviewing it is hard without saving.
             // Let's implement a simple client-side "result view" re-using the logic?
             // Actually, the simplest fix for now is to just say "Results calculated but not saved" and go back.
             toast.warning("Test completed! (Login to save results & review)");
             router.push('/history'); // Or maybe just back to quiz list
        }

    } catch (error) {
        console.error("Error saving result:", error);
        toast.error("Failed to save result history.");
    } finally {
        setIsSubmitting(false);
    }
  };

// ...

  // --- SETUP VIEW ---
  if (setupMode) {
      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <Button
                variant="ghost"
                className="absolute top-4 left-4 text-slate-800 hover:bg-white/50"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>

              <Card className="max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 border-slate-200/60 max-h-[90vh] flex flex-col">
                  <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                          <Settings2 className="w-6 h-6 text-blue-600" /> Configure Test
                      </CardTitle>
                      <div className="text-sm text-slate-500 font-medium">
                          {categoryId === "ALL" ? "Full Mock Test" : `${categoryId} Practice`}
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-6 overflow-y-auto custom-scrollbar">
                      {!user && (
                          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-700 text-sm flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              <span>You are in <strong>Guest Mode</strong>. Results won&apos;t be saved.</span>
                          </div>
                      )}

                      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                             <strong>Smart Pool:</strong> We track questions you&apos;ve seen.
                             <br />
                             Available new questions: <strong>{availableQuestions}</strong>
                          </div>
                      </div>

                      <div className="space-y-3">
                          <Label>Number of Questions</Label>
                          <Select value={questionCount} onValueChange={setQuestionCount}>
                              <SelectTrigger>
                                  <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value={String(availableQuestions)}>All ({availableQuestions})</SelectItem>
                                  {availableQuestions > 5 && <SelectItem value="5">5 Questions</SelectItem>}
                                  {availableQuestions > 10 && <SelectItem value="10">10 Questions</SelectItem>}
                                  {availableQuestions > 20 && <SelectItem value="20">20 Questions</SelectItem>}
                                  {availableQuestions > 50 && <SelectItem value="50">50 Questions</SelectItem>}
                              </SelectContent>
                          </Select>
                      </div>

                      <div className="flex items-center justify-between border p-3 rounded-lg bg-white shadow-sm">
                          <Label htmlFor="include-answered" className="cursor-pointer">
                              Include answered questions?
                              <div className="text-xs text-slate-400 font-normal">Re-practice what you&apos;ve already solved</div>
                          </Label>
                          <Switch
                              id="include-answered"
                              checked={includeAnswered}
                              onCheckedChange={setIncludeAnswered}
                          />
                      </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 pt-2 border-t bg-slate-50/50 rounded-b-xl">
                      <Button className="w-full h-12 text-lg shadow-blue-900/20 shadow-lg transition-transform active:scale-95" onClick={startQuiz} disabled={availableQuestions === 0}>
                           {availableQuestions === 0 ? "No New Questions" : (<><Play className="w-5 h-5 mr-2 fill-current" /> Start Test</>)}
                      </Button>
                      {availableQuestions === 0 && !includeAnswered && (
                          <p className="text-center text-xs text-slate-500">
                              Tip: Turn on &quot;Include answered questions&quot; to practice.
                          </p>
                      )}
                  </CardFooter>
              </Card>
          </div>
      )
  }

  // --- QUIZ RUNNER VIEW (Existing logic with minor updates) ---
  const q = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <div className="flex-1 p-4 md:p-8 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={() => router.back()}>Quit</Button>
            <div className="text-sm font-medium text-slate-900">
                {categoryId.replace('_', ' ')} TEST
            </div>
            <div className="text-sm font-medium text-slate-500">
                {currentIdx + 1}/{questions.length}
            </div>
        </div>

        <Progress value={progress} className="h-2 mb-8" />

        <Card className="flex-1 flex flex-col">
            <CardHeader>
                <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded uppercase">
                        {q.category}
                    </span>
                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded uppercase">
                        {q.difficulty}
                    </span>
                </div>
                <h2 className="text-xl font-semibold leading-relaxed">
                   {q.questionText}
                </h2>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <RadioGroup
                    value={answers[q.id] || ""}
                    onValueChange={(val) => handleAnswerObj(q.id, val)}
                    className="space-y-3"
                >
                    {q.options.map((opt: QuestionOption) => (
                        <div key={opt.id} className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all ${answers[q.id] === opt.id ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:bg-slate-50 border-slate-200'}`}>
                            <RadioGroupItem value={opt.id} id={`${q.id}-${opt.id}`} />
                            <Label htmlFor={`${q.id}-${opt.id}`} className="flex-1 cursor-pointer font-medium text-slate-700">
                                {opt.text}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="border-t pt-6 bg-slate-50/50 flex justify-between">
                 <Button
                    variant="ghost"
                    onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                    disabled={currentIdx === 0}
                >
                    Previous
                </Button>

                {currentIdx === questions.length - 1 ? (
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white">
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                        Submit Test
                    </Button>
                ) : (
                    <Button onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}>
                        Next Question <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </CardFooter>
        </Card>
      </div>

       {/* Question Palette (Desktop Side) */}
       <div className="hidden lg:block w-72 bg-white border-l p-6">
         <h3 className="font-bold text-slate-900 mb-4">Questions</h3>
         <div className="grid grid-cols-4 gap-2">
            {questions.map((_q, idx) => {
                const isAnswered = !!answers[_q.id];
                const isCurrent = currentIdx === idx;
                return (
                    <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-10 w-10 text-xs font-semibold rounded-lg flex items-center justify-center transition-all
                            ${isCurrent ? 'bg-slate-900 text-white shadow-lg' :
                              isAnswered ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}
                        `}
                    >
                        {idx + 1}
                    </button>
                )
            })}
         </div>
       </div>
    </div>
  )
}
