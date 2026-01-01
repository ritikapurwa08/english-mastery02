"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Zap, Target } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 border-b border-slate-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto text-center"
        >
          <Badge variant="secondary" className="mb-4 py-1 px-4 text-blue-600 bg-blue-50 border-blue-100">
            v2.0 Now Live with Advanced Analytics
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-slate-700 to-slate-900">
            Master English for <br /> Competitive Exams
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The most structured platform for RPSC, SSC, and Banking aspirants.
            Learn through active recall and track your precision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 rounded-full text-lg shadow-xl shadow-blue-100 bg-slate-900 hover:bg-slate-800">
              <Link href="/quiz">Start Practice Test</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 rounded-full text-lg border-2">
              <Link href="/notes">Enter Learn Mode</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Core Paths */}
      <section className="py-20 px-4 bg-slate-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Choose Your Path</h2>
              <p className="text-slate-500">Pick between focused learning or pressure testing.</p>
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Learn Mode Card */}
            <motion.div variants={item}>
              <Card className="p-8 h-full border-none shadow-sm hover:shadow-md transition-all cursor-pointer group bg-white">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Learn Mode</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Study topic-wise rules for SYNONYM, GRAMMAR, and IDIOM categories with detailed explanations and zero time pressure.
                </p>
                <Link href="/notes" className="text-blue-600 font-bold flex items-center gap-2">
                  Browse Topics <Zap className="w-4 h-4" />
                </Link>
              </Card>
            </motion.div>

            {/* Test Mode Card */}
            <motion.div variants={item}>
              <Card className="p-8 h-full border-none shadow-sm hover:shadow-md transition-all cursor-pointer group bg-white">
                <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Exam Mode</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Real-world simulation with negative marking, timers, and question palettes.
                  Designed specifically for RPSC and SSC patterns.
                </p>
                <Link href="/quiz" className="text-purple-600 font-bold flex items-center gap-2">
                  Take a Mock <Brain className="w-4 h-4" />
                </Link>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
