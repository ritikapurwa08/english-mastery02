import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer, FileQuestion, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TestListingPage() {
  const tests = [
    { id: "SYNONYM", title: "Synonyms Mastery", questions: 4, time: "5 mins", difficulty: "Medium", icon: "BookOpen" },
    { id: "ANTONYM", title: "Antonyms Challenge", questions: 4, time: "5 mins", difficulty: "Medium", icon: "Zap" },
    { id: "IDIOM", title: "Idioms & Phrases", questions: 4, time: "5 mins", difficulty: "Hard", icon: "Coffee" },
    { id: "PHRASAL_VERB", title: "Phrasal Verbs", questions: 4, time: "5 mins", difficulty: "Hard", icon: "Activity" },
    { id: "GRAMMAR", title: "Grammar Rules", questions: 4, time: "5 mins", difficulty: "Medium", icon: "PenTool" },
    { id: "ALL", title: "Full Mock Test", questions: 20, time: "25 mins", difficulty: "Mixed", icon: "Brain" },
  ]

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Practice Tests</h1>
        <p className="text-slate-500">Choose a specific topic or take a full mock test.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="hover:border-slate-900 transition-all group cursor-pointer hover:shadow-lg">
            <CardHeader>
              <CardTitle className="group-hover:text-blue-600 transition-colors flex justify-between items-center">
                {test.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FileQuestion className="w-4 h-4" /> {test.questions} Questions
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Timer className="w-4 h-4" /> {test.time}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 pt-6">
              <Button asChild className="w-full bg-white text-slate-900 border-slate-200 hover:bg-slate-900 hover:text-white" variant="outline">
                <Link href={`/quiz/${test.id}`}>
                  Start Practice <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
