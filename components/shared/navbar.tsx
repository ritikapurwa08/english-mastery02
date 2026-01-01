"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/context/AuthContext"
import { GraduationCap, Menu, User, BarChart3, BookText, BrainCircuit, Clock, LogOut } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Resources", href: "/resources", icon: <BookText className="w-4 h-4" /> },
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
            <SheetContent side="left" className="w-75 sm:w-87.5 p-0 border-r-0 bg-white">
              <SheetTitle className="hidden">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                  <div className="bg-slate-900 text-white p-2 rounded-xl shadow-lg shadow-slate-900/10">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900 leading-tight">English Mastery</h2>
                    <p className="text-xs text-slate-500 font-medium tracking-wide">Learn. Practice. Excel.</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                  <div className="px-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</div>
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden
                          ${active
                            ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                      >
                        <span className={`transition-colors duration-200 ${active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                          {link.icon}
                        </span>
                        <span className="relative z-10">{link.name}</span>
                        {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />}
                      </Link>
                    )
                  })}
                </div>

                {/* Footer / User Profile */}
                <div className="p-4 mt-auto border-t border-slate-100 bg-slate-50/50">
                  {user ? (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Avatar className="h-10 w-10 border-2 border-slate-100 cursor-pointer transition-transform hover:scale-105">
                          <AvatarImage src={user.photoURL || undefined} />
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                            {user.displayName?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href="/profile" onClick={() => setIsOpen(false)} className="block truncate">
                          <p className="text-sm font-bold text-slate-900 truncate hover:text-blue-600 transition-colors">
                            {user.displayName || "User"}
                          </p>
                        </Link>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 -mr-1"
                        title="Log Out"
                        onClick={async () => {
                           await logout(); // Assuming logout is async
                           setIsOpen(false);
                        }}
                      >
                        <LogOut className="w-5 h-5" />
                      </Button>
                    </div>
                  ) : (
                     <div className="grid grid-cols-2 gap-3 p-2">
                        <Button variant="outline" asChild className="w-full bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                            <Link href="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                        </Button>
                        <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/20">
                            <Link href="/signup" onClick={() => setIsOpen(false)}>Sign up</Link>
                        </Button>
                     </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
