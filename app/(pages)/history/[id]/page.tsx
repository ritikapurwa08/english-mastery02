"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SavedTestResult } from "@/types/quiz.models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<SavedTestResult | null>(null);

  useEffect(() => {
    async function fetchResult() {
      if (!user || !params.id) return;
      try {
        const docRef = doc(db, "users", user.uid, "testResults", params.id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setResult({ id: docSnap.id, ...docSnap.data() } as SavedTestResult);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchResult();
  }, [user, params.id]);

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
    );
  }

  if (!result) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
              <p className="text-slate-500">Result not found.</p>
              <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
          </div>
      );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen bg-slate-50">
        <div className="mb-6">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
            </Button>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        {result.testId} Review
                        <Badge variant={result.percentage >= 60 ? "default" : "destructive"}>
                            {result.percentage}% Score
                        </Badge>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Completed on {new Date(result.date).toLocaleDateString()} at {new Date(result.date).toLocaleTimeString()}
                    </p>
                </div>
                <div className="flex gap-4 text-sm font-medium bg-white px-4 py-2 rounded-lg border shadow-sm">
                    <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {result.correct} Correct</span>
                    <span className="text-red-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> {result.wrong} Wrong</span>
                    <span className="text-slate-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {result.skipped} Skipped</span>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            {result.answers.map((ans, idx) => (
                <Card key={idx} className={`border-l-4 ${ans.isCorrect ? 'border-l-green-500' : ans.userAnswer ? 'border-l-red-500' : 'border-l-slate-300'}`}>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-medium text-slate-400">Question {idx + 1}</span>
                            {ans.isCorrect ? (
                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Correct</Badge>
                            ) : ans.userAnswer ? (
                                <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200">Incorrect</Badge>
                            ) : (
                                <Badge variant="outline" className="text-slate-500 bg-slate-50">Skipped</Badge>
                            )}
                        </div>
                        <h3 className="text-lg font-semibold mt-1">{ans.questionText}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className={`p-3 rounded-lg border ${ans.isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                <span className="block text-xs font-bold uppercase opacity-70 mb-1">Your Answer</span>
                                {ans.userAnswer || "Not Attempted"}
                            </div>
                            <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 text-blue-800">
                                <span className="block text-xs font-bold uppercase opacity-70 mb-1">Correct Answer</span>
                                {ans.correctAnswer}
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700">
                             <h4 className="font-bold mb-1 flex items-center gap-2 text-slate-900">
                                <AlertCircle className="w-4 h-4 text-blue-500" /> Explanation
                             </h4>
                             {ans.explanation}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
