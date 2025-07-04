"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import {motion,AnimatePresence} from "framer-motion"
import ThreadLogo from "@/components/ThreadLogo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserProfilePanel from "@/components/UserProfilePanel";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  const [showSearch, setShowSearch] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
 

  const placeholders = [
    "plumber...",
    "electrician...",
    "painter...",
    "mechanic...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000); // Change every 1 second

    return () => clearInterval(interval);
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    const query = encodeURIComponent(search.trim().toLowerCase());
    router.push(`/workers/search?q=${query}`);
    setSearch("");
  };

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  if (!isMounted) return null;
  


  return (
    
  

    <nav className="w-full px-4 py-2 bg-gray-300 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-700">
      <div className="flex  md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
          <div className="flex -ml-6 gap-2">
            <ThreadLogo size={50} />
            </div>
            <h1 className="hidden md:block text-2xl font-semibold text-slate-800 dark:text-white ml-2">
              <span className="text-orange-500">L</span>ambda
            </h1>
          </Link>
        </div>

        {/* Search */}
        <div className="relative ">
      <button
        onClick={() => setShowSearch((prev) => !prev)}
        className="px-4 py-2 -ml-[420px] bg-orange-500 rounded-md text-white hover:bg-orange-600"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      {/* 🔎 Animated Search Form */}
      <AnimatePresence>
        {showSearch && (
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: -200 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 bg-white dark:bg-slate-700 p-2 rounded-l-4xl rounded-r-xl shadow-md flex items-center gap-2 z-50"
          >
            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1 w-64 rounded-md bg-white text-black dark:bg-slate-700 dark:text-white outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md"
            >
              Search
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard/booking">
            <Button className="hidden md:inline-block border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
              My bookings
            </Button>
          </Link>

          <Button variant="ghost" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {session ? (
            <UserProfilePanel />
          ) : (
            <Link href="/login">
              <Button variant="outline" className="text-sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
