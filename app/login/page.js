"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {useState,useEffect} from "react"
import  ThreadLogo  from "@/components/ThreadLogo"
import Link from "next/link"

export default function LoginPage() {
    const [loading, setLoading] = useState(true)

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false)
  }, 2000)
  return () => clearTimeout(timer)
}, [])

if (loading) {
  return (
       <div className=" items-center mx-[25%] justify-center bg-slate-100 dark:bg-slate-950 ">
        <ThreadLogo size={400} strokeWidth={5}/>
     </div>
  )
}

    
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl rounded-xl p-8 space-y-6 border border-slate-200 dark:border-slate-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Login to Lambda</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Find & hire workers near you</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Login</Button>
        </form>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don’t have an account?{" "}
          <Link href="/register" className="text-orange-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
