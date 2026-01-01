"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts"

const data = [
  { category: "Synonyms", score: 85, color: "#2563eb" },
  { category: "Antonyms", score: 72, color: "#7c3aed" },
  { category: "Grammar", score: 60, color: "#db2777" },
  { category: "Idioms", score: 90, color: "#059669" },
  { category: "Phrasal", score: 45, color: "#ea580c" },
]

export default function StatsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-5xl">
      <h1 className="text-3xl font-bold">Performance Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-blue-700">74%</p></CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-green-700">24</p></CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg. Time/Question</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-purple-700">18s</p></CardContent>
        </Card>
      </div>

      <Card className="p-4">
        <CardHeader><CardTitle>Category-wise Mastery</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="category" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
