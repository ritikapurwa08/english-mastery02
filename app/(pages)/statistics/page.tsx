"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingUp, Clock, AlertCircle, CheckCircle2, User as UserIcon } from "lucide-react";
import { useAuth } from "@/components/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { Loader2 } from "lucide-react";

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
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      try {
        const q = query(collection(db, "users", user.uid, "testResults"), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);

        const results: any[] = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data());
        });

        if (results.length === 0) {
            setLoading(false);
            return;
        }

        // Process for History Chart (Last 10 tests)
        const recentHistory = results.slice(-10).map((r, i) => ({
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
          <CardContent className="pt-6 h-[300px]">
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
                        formatter={(value: any) => [`${value}%`, "Accuracy"]}
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
                 <div className="h-full flex items-center justify-center text-slate-400">
                     No test history available. Take a quiz!
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
