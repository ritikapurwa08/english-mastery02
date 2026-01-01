"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth(); // Defined in your context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-white">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="bg-slate-900 text-white p-3 rounded-2xl mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" onClick={loginWithGoogle} className="w-full py-6 flex gap-3 border-2 hover:bg-slate-50 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Or continue with</span></div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="email" type="email" placeholder="name@example.com" className="pl-10 h-12" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="password" type="password" className="pl-10 h-12" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-lg rounded-xl">Sign In</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t pt-4">
            <p className="text-sm text-slate-500">Don&apos;t have an account? <Link href="/register" className="text-slate-900 font-bold hover:underline">Register now</Link></p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
