"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Logic inside signUp should handle creating the user
      await signUp(email, password);
      router.push("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-slate-50 p-4">
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-none md:shadow-2xl bg-white p-2">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black tracking-tight">Create Account</CardTitle>
            <CardDescription>Start your journey to English mastery today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input type="email" placeholder="john@example.com" className="pl-10 h-12 border-slate-200" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input type="password" placeholder="••••••••" className="pl-10 h-12 border-slate-200" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg shadow-lg shadow-blue-100 rounded-xl flex gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-slate-500">Already have an account? <Link href="/login" className="text-blue-600 font-bold">Log in</Link></p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
