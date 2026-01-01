"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const RESOURCES = [
    {
        id: "01_Fundamentals_of_English",
        title: "Fundamentals of English",
        description: "Master the basics of English grammar and sentence structure.",
        pdfPath: "/pdfs/english/01_Fundamentals_of_English.pdf"
    },
    {
        id: "02_Determiners",
        title: "Determiners Mastery",
        description: "Learn how to use articles, quantifiers, and demonstratives correctly.",
        pdfPath: "/pdfs/english/02_Determiners.pdf"
    },
    {
        id: "03_Nouns",
        title: "The Components: Nouns",
        description: "Deep dive into types of nouns, rules, and usage patterns.",
        pdfPath: "/pdfs/english/03_Nouns.pdf"
    }
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl min-h-screen">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" /> Study Resources
        </h1>
        <p className="text-slate-500 text-lg">
            Comprehensive study materials to help you prepare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 border-slate-200 group">
                <CardHeader className="bg-slate-50/50 rounded-t-xl pb-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6 text-red-500" />
                    </div>
                    <CardTitle className="text-xl text-slate-800 group-hover:text-blue-700 transition-colors">
                        {resource.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                    <CardDescription className="text-sm h-12">
                        {resource.description}
                    </CardDescription>
                    <Button asChild className="w-full bg-slate-900 hover:bg-blue-600 transition-colors">
                        <Link href={`/resources/${resource.id}?path=${encodeURIComponent(resource.pdfPath)}&title=${encodeURIComponent(resource.title)}`}>
                            Read Notes <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
