"use client"
import { useState } from "react";
import { englishPracticeQuestions } from "@/data/questions/questions";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const q = englishPracticeQuestions[currentIdx];

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left: Question Area */}
      <div className="flex-1 p-4 md:p-10 border-r border-slate-100">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">{q.category}</span>
            <span className="text-sm text-slate-400">Question {currentIdx + 1} of {englishPracticeQuestions.length}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8">
            {q.questionText}
          </h2>

          <RadioGroup className="space-y-4">
            {q.options.map((opt) => (
              <div key={opt.id} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <RadioGroupItem value={opt.id} id={opt.id} />
                <Label htmlFor={opt.id} className="flex-1 cursor-pointer text-lg text-slate-700">{opt.text}</Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-10">
            <Button
              variant="outline"
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
            >
              Previous
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setCurrentIdx(Math.min(englishPracticeQuestions.length - 1, currentIdx + 1))}
            >
              {currentIdx === englishPracticeQuestions.length - 1 ? "Finish" : "Next Question"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Question Palette (Visible on Desktop) */}
      <div className="w-full md:w-80 p-6 bg-slate-50/50 hidden md:block">
        <h3 className="font-bold mb-4 text-slate-900">Question Palette</h3>
        <div className="grid grid-cols-5 gap-2">
          {englishPracticeQuestions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-10 w-10 rounded-md border flex items-center justify-center text-sm font-medium transition-all
                ${currentIdx === i ? 'bg-slate-900 text-white ring-2 ring-offset-2 ring-slate-900' : 'bg-white text-slate-600 hover:border-slate-400'}
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-2 border-t pt-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="h-3 w-3 bg-slate-900 rounded"></div> Selected
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="h-3 w-3 bg-white border rounded"></div> Not Visited
          </div>
        </div>
      </div>
    </div>
  );
}
