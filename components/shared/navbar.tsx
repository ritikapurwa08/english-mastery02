"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { GraduationCap, Menu, User, BarChart3, BookText, BrainCircuit, Clock } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Notes", href: "/notes", icon: <BookText className="w-4 h-4" /> },
    { name: "Quiz", href: "/quiz", icon: <BrainCircuit className="w-4 h-4" /> },
    { name: "Stats", href: "/statistics", icon: <BarChart3 className="w-4 h-4" /> },
    { name: "History", href: "/history", icon: <Clock className="w-4 h-4" /> },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
          <div className="bg-slate-900 text-white p-1 rounded-lg">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span>English Mastery</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                isActive(link.href) ? "text-slate-900" : "text-slate-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link href="/profile"><User className="w-5 h-5" /></Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <SheetTitle className="hidden">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium ${
                      isActive(link.href) ? "bg-slate-100 text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {link.icon} {link.name}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-4">
                   <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-slate-500 font-medium">
                    <User className="w-4 h-4" /> Profile
                   </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
