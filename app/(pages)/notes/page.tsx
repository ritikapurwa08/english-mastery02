import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function NotesPage() {
  const grammarTopics = [
    { title: "Subject-Verb Agreement", content: "Rules regarding singular and plural subjects...", tag: "High Priority" },
    { title: "Conditionals", content: "If I were you, I would... (Type 2 Conditional rules)", tag: "Complex" },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Study Materials</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-slate-700">English Grammar</h3>
        <Accordion type="single" collapsible className="w-full border rounded-lg overflow-hidden">
          {grammarTopics.map((topic, i) => (
            <AccordionItem value={`item-${i}`} key={i} className="px-4 border-b last:border-0">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-slate-900 font-medium">{topic.title}</span>
                  <Badge variant="secondary" className="text-[10px]">{topic.tag}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                {topic.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-700">Vocabulary Lists</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Synonyms", "Antonyms", "Idioms", "Phrasal Verbs"].map((v) => (
            <div key={v} className="p-4 border rounded-lg text-center hover:bg-slate-50 cursor-pointer transition-colors">
              <p className="font-medium text-slate-800">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
