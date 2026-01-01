import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, BookText, BrainCircuit, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const sections = [
    { title: "Notes", desc: "Topic-wise grammar & vocab", icon: <BookText />, link: "/notes", color: "bg-blue-50 text-blue-600" },
    { title: "Quiz", desc: "Practice MCQs & PYQs", icon: <BrainCircuit />, link: "/quiz", color: "bg-green-50 text-green-600" },
    { title: "Vocabulary", desc: "Synonyms & Antonyms", icon: <BookOpen />, link: "/vocabulary", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Welcome, Aspirant!</h1>
        <p className="text-slate-500">Track your preparation for RPSC, SSC, and Bank exams.</p>
      </div>

      {/* Quick Stats/Actions */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((s) => (
          <Card key={s.title} className="hover:shadow-md transition-shadow border-slate-100">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className={`p-3 rounded-xl ${s.color}`}>{s.icon}</div>
              <div>
                <CardTitle className="text-xl">{s.title}</CardTitle>
                <CardDescription>{s.desc}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href={s.link}>Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Study Plan Reminder (Based on user context) */}
      <Card className="max-w-6xl mx-auto mt-8 border-dashed border-2 border-slate-200 bg-slate-50/50">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <GraduationCap className="h-8 w-8 text-slate-700" />
            <div>
              <p className="font-semibold text-slate-900">Next Step in your 4-Month Plan</p>
              <p className="text-sm text-slate-600">Focus on "Subject-Verb Agreement" today.</p>
            </div>
          </div>
          <Button variant="outline">View Full Plan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
