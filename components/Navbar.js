"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import ThreadLogo from "@/components/ThreadLogo"
import GooeyNav from "@/components/GoeyNav"
import { useSession, signOut } from "next-auth/react" // 👈 for session

export default function Navbar() {
  const [theme, setTheme] = useState("light")
  const [isMounted, setIsMounted] = useState(false)

  const { data: session } = useSession() // 👈 Get session

  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

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
      <div className=" mx-[-2%] flex justify-center items-center">
        <ThreadLogo size={50} />
        <Link href="/">
          <h1 className="hidden md:flex items-center text-2xl font-semibold text-slate-800 dark:text-white ml-2">
            <span className="text-orange-500">L</span>ambda
          </h1>
        </Link>
      </div>

      <div className="flex gap-5 justify-center items-center">
        <div className="hidden md:flex items-center" style={{ height: '60px', position: 'relative' }}>
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        <Button variant="ghost" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        {/* ✅ Session-based UI */}
        {session ? (
          <div className="flex items-center gap-3">
            <span className="text-[18px] text-slate-800 font-serif dark:text-slate-200">
              {session.user.name} {/* Show only before @ */}
            </span>
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="text-sm"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="text-sm">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
