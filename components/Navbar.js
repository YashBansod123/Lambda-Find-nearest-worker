"use client"
import Link from "next/link";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import ThreadLogo from "@/components/ThreadLogo"

export default function Navbar() {
  const [theme, setTheme] = useState("light")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle("dark", storedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  if (!isMounted) return null

  return (
    <nav className="w-full px-2 py-2 bg-gray-300 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-700 flex justify-between items-center">
      <div className="flex justify-center items-center ">
        
        <ThreadLogo size={40}/>
       
        <Link href="/">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Lambda
        </h1>
        </Link>
      </div>
     <div className="flex gap-5 items-center">
      <Button variant="ghost" onClick={toggleTheme}>
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
      <Link href="/login">
       <Button  variant="outline" className="text-sm">
          Login
        </Button>
        </Link>
     </div>
    </nav>
  )
}
