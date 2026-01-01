"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, CheckCircle2, XCircle, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { SavedTestResult } from "@/types/quiz.models";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HistoryPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<SavedTestResult[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  useEffect(() => {
    async function fetchHistory() {
      if (!user) return;
      try {
        const q = query(collection(db, "users", user.uid, "testResults"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedTestResult));
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchHistory();
  }, [user]);

  const filteredHistory = filterCategory === "ALL"
    ? history
    : history.filter(h => h.testId === filterCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full border-dashed border-2 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
             <div className="bg-slate-100 p-4 rounded-full">
                <Calendar className="w-8 h-8 text-slate-400" />
             </div>
             <div className="space-y-1">
                <h3 className="text-xl font-semibold text-slate-900">Sign in to view History</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                   Track your test results, review your answers, and monitor your progress over time.
                </p>
             </div>
             <div className="flex gap-3 h-10 mt-4">
                 <Button asChild>
                     <Link href="/login">Sign In</Link>
                 </Button>
                 <Button variant="outline" asChild>
                     <Link href="/signup">Create Account</Link>
                 </Button>
             </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Test History</h1>
          <p className="text-slate-500">Review your past performance and analyze mistakes.</p>
        </div>

        <div className="flex items-center gap-2">
           <Filter className="w-4 h-4 text-slate-500" />
           <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-45">
                <SelectValue placeholder="Filter by Topic" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ALL">All Topics</SelectItem>
                <SelectItem value="SYNONYM">Synonyms</SelectItem>
                <SelectItem value="ANTONYM">Antonyms</SelectItem>
                <SelectItem value="IDIOM">Idioms</SelectItem>
                <SelectItem value="GRAMMAR">Grammar</SelectItem>
                <SelectItem value="PHRASAL_VERB">Phrasal Verbs</SelectItem>
            </SelectContent>
           </Select>
        </div>
      </div>

      <div className="space-y-4">
        {history.length === 0 ? (
          <Card className="border-dashed border-2 bg-slate-50/50">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="bg-slate-100 p-4 rounded-full">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-slate-900">No Tests Taken Yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Start your journey by taking a practice test. Your results and detailed analysis will appear here.
                </p>
              </div>
              <Button asChild className="mt-4">
                <Link href="/quiz">Start Practice</Link>
              </Button>
            </CardContent>
          </Card>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed text-slate-400 flex flex-col items-center gap-2">
            <Filter className="w-8 h-8 opacity-50" />
            <p>No test history found for <strong>{filterCategory}</strong>.</p>
            <Button variant="link" onClick={() => setFilterCategory("ALL")} className="text-blue-600">
              Clear Filter
            </Button>
          </div>
        ) : (
          filteredHistory.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant={result.percentage >= 60 ? "default" : "destructive"} className={result.percentage >= 60 ? "bg-green-600 hover:bg-green-700" : ""}>
                            {result.percentage}% Score
                        </Badge>
                        <Badge variant="outline" className="text-slate-500 border-slate-200">
                            {result.testId}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                         <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(result.date).toLocaleDateString()} at {new Date(result.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                     <div className="text-center">
                        <div className="flex items-center justify-center gap-1 font-bold text-green-600">
                            <CheckCircle2 className="w-4 h-4" /> {result.correct}
                        </div>
                        <span className="text-xs text-slate-400 uppercase">Correct</span>
                     </div>
                     <div className="text-center">
                        <div className="flex items-center justify-center gap-1 font-bold text-red-500">
                            <XCircle className="w-4 h-4" /> {result.wrong}
                        </div>
                        <span className="text-xs text-slate-400 uppercase">Wrong</span>
                     </div>

                     <div className="w-full md:w-auto">
                        <Button asChild size="sm" variant="outline" className="w-full">
                            <Link href={`/history/${result.id}`}>
                                Review Answers <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
