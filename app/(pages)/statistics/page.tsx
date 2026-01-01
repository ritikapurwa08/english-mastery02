"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingUp, Clock, AlertCircle, CheckCircle2, User as UserIcon } from "lucide-react";
import { useAuth } from "@/components/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SavedTestResult } from "@/types/quiz.models";

interface HistoryPoint {
  date: string;
  score: number;
  testId: string;
}

interface CategoryPoint {
  label: string;
  val: number;
  count: number;
  color: string;
}

export default function StatisticsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTests: 0,
    averageAccuracy: 0,
    bestCategory: "N/A",
    weakestCategory: "N/A",
    totalXP: 0 // We can take this from user context directly or sum it up
  });
  const [historyData, setHistoryData] = useState<HistoryPoint[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryPoint[]>([]);

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      try {
        const q = query(collection(db, "users", user.uid, "testResults"), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);

        const results: SavedTestResult[] = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data() as SavedTestResult);
        });

        if (results.length === 0) {
            setLoading(false);
            return;
        }

        // Process for History Chart (Last 10 tests)
        const recentHistory = results.slice(-10).map((r) => ({
             date: new Date(r.date || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
             score: r.percentage || 0,
             testId: r.testId
        }));
        setHistoryData(recentHistory);

        // Process for Category Weakness
        const categoryMap: Record<string, { total: number, count: number }> = {};
        results.forEach(r => {
            const cat = r.testId || "Unknown";
            if (!categoryMap[cat]) categoryMap[cat] = { total: 0, count: 0 };
            categoryMap[cat].total += (r.percentage || 0);
            categoryMap[cat].count += 1;
        });

        const categories = Object.keys(categoryMap).map(cat => ({
            label: cat,
            val: Math.round(categoryMap[cat].total / categoryMap[cat].count),
            count: categoryMap[cat].count
        })).sort((a, b) => b.val - a.val); // Sort best to worst


        const bestCat = categories.length > 0 ? categories[0].label : "N/A";
        const weakCat = categories.length > 0 ? categories[categories.length - 1].label : "N/A";

        // Color coding
        const colorMap = ["bg-green-500", "bg-blue-500", "bg-orange-500", "bg-red-500", "bg-purple-500"];
        const finalCatData = categories.slice(0, 5).map((c, i) => ({
            ...c,
            color: colorMap[i % colorMap.length]
        }));
        setCategoryData(finalCatData);

        // Overall Stats
        const totalAccuracy = results.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / results.length;

        setStats({
            totalTests: results.length,
            averageAccuracy: Math.round(totalAccuracy),
            bestCategory: bestCat,
            weakestCategory: weakCat,
            totalXP: user.xp || 0
        });

      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchStats();
  }, [user]);

  if (loading) {
      return (
          <div className="flex h-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
      );
  }

  if (!user) {
      return (
          <div className="relative min-h-screen">
              {/* Blurred Background with Mock Data */}
              <div className="absolute inset-0 filter blur-xl opacity-50 pointer-events-none p-10 space-y-8 overflow-hidden">
                  <div className="flex justify-between items-center">
                      <div>
                          <div className="h-10 w-64 bg-slate-200 rounded mb-2"></div>
                          <div className="h-4 w-48 bg-slate-100 rounded"></div>
                      </div>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                       {[1,2,3,4].map(i => (
                           <div key={i} className="h-32 bg-slate-100 rounded-lg"></div>
                       ))}
                  </div>
                  <div className="grid grid-cols-3 gap-8 h-96">
                       <div className="col-span-2 bg-slate-100 rounded-lg"></div>
                       <div className="bg-slate-100 rounded-lg"></div>
                  </div>
              </div>

              {/* Login Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/30">
                  <Card className="max-w-md w-full shadow-2xl border-slate-200">
                      <CardHeader className="text-center">
                          <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-4">
                              <TrendingUp className="w-8 h-8 text-blue-600" />
                          </div>
                          <CardTitle className="text-2xl">Unlock Analytics</CardTitle>
                          <CardDescription>
                              Sign in to view your detailed performance metrics, track your accuracy trends, and identify weak spots.
                          </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3">
                          <Button className="w-full text-lg h-12" asChild>
                              <a href="/login">Sign In to Dashboard</a>
                          </Button>
                          <p className="text-xs text-center text-slate-400">
                              Tracking 15+ performance data points
                          </p>
                      </CardContent>
                  </Card>
              </div>
          </div>
      )
  }

  if (stats.totalTests === 0) {
      return (
          <div className="flex h-screen items-center justify-center p-4">
              <Card className="max-w-lg w-full text-center border-2 border-dashed bg-slate-50/50">
                  <CardHeader>
                      <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-4">
                          <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                      <CardTitle className="text-2xl">No Statistics Yet</CardTitle>
                      <CardDescription>
                          You haven&apos;t taken any tests yet. Complete your first practice session to unlock detailed performance analytics!
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Button size="lg" className="w-full" asChild>
                          <Link href="/quiz">Start Your First Test</Link>
                      </Button>
                      <p className="text-xs text-slate-400 mt-4">
                          We&apos;ll track accuracy, speed, and topic mastery.
                      </p>
                  </CardContent>
              </Card>
          </div>
      )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-8 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Your Dashboard</h1>
          <p className="text-slate-500">Real-time analysis of your {stats.totalTests} test attempts.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-slate-500"/> XP Earned: {user?.xp || 0}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Advanced Stat Cards */}
        {[
          { label: "Precision", value: `${stats.averageAccuracy}%`, icon: <TrendingUp className="text-green-500" />, desc: "Average score" },
          { label: "Tests Taken", value: stats.totalTests.toString(), icon: <CheckCircle2 className="text-blue-500" />, desc: "Total attempts" },
          { label: "Best Topic", value: stats.bestCategory, icon: <Clock className="text-purple-500" />, desc: "Highest accuracy" },
          { label: "Needs Focus", value: stats.weakestCategory, icon: <AlertCircle className="text-red-500" />, desc: "Lowest accuracy" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-slate-50/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
                {stat.icon}
              </div>
              <CardTitle className="text-2xl font-bold truncate">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-400">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Graph */}
        <Card className="lg:col-span-2 border-slate-100 overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b">
            <CardTitle>Accuracy Trend</CardTitle>
            <CardDescription>Your performance over the last 10 tests.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 h-75">
             {historyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData}>
                    <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" dy={10} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [`${value}%`, "Accuracy"]}
                    />
                    <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    />
                </AreaChart>
                </ResponsiveContainer>
             ) : (
                 <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                     <p>No test history available.</p>
                     <Button variant="outline" size="sm" asChild>
                         <Link href="/quiz">Take a Quiz</Link>
                     </Button>
                 </div>
             )}

          </CardContent>
        </Card>

        {/* Strength vs Weakness */}
        <Card className="border-slate-100 h-full">
          <CardHeader>
            <CardTitle>Topic Mastery</CardTitle>
            <CardDescription>Average accuracy per category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {categoryData.length > 0 ? categoryData.map((topic) => (
              <div key={topic.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{topic.label.replace('_', ' ')}</span>
                  <span className="text-slate-500">{topic.val}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${topic.color}`} style={{ width: `${topic.val}%` }} />
                </div>
              </div>
            )) : (
                <div className="text-center text-slate-400 py-10">
                    No data yet.
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
