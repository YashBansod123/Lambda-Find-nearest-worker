import Link from "next/link"
export default function Footer() {
  return (
    <footer className="w-full mt-[300px] border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Copyright */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Lambda</h2>
          <p className="text-sm">© {new Date().getFullYear()} Lambda Inc. All rights reserved.</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="#" className="hover:text-orange-500 transition">Home</Link>
          <Link href="#" className="hover:text-orange-500 transition">Services</Link>
          <Link href="#" className="hover:text-orange-500 transition">Pricing</Link>
          <Link href="#" className="hover:text-orange-500 transition">About</Link>
          <Link href="#" className="hover:text-orange-500 transition">Contact</Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <Link href="#" className="hover:text-blue-500 transition" title="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.29 9.29 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.62 0-4.74 2.2-4.74 4.92 0 .39.04.77.13 1.13C7.69 5.83 4.1 3.88 1.67 1.14a5.03 5.03 0 0 0-.64 2.47c0 1.7.84 3.2 2.14 4.09a4.4 4.4 0 0 1-2.15-.6v.06c0 2.37 1.62 4.36 3.77 4.81a4.5 4.5 0 0 1-2.13.09c.6 2.02 2.35 3.49 4.42 3.53A9.05 9.05 0 0 1 0 19.54 12.89 12.89 0 0 0 7.29 21c8.8 0 13.61-7.55 13.61-14.1 0-.21 0-.42-.02-.63A9.94 9.94 0 0 0 23 3z" />
            </svg>
          </Link>
          <Link href="#" className="hover:text-blue-700 transition" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 24h5V8H0v16zm7.5-16h4.6v2.2h.06c.64-1.2 2.2-2.46 4.52-2.46C20.14 7.74 21 10 21 13.14V24h-5v-9.6c0-2.3-.82-3.86-2.74-3.86-1.5 0-2.4 1-2.8 2-.14.34-.18.82-.18 1.3V24h-5V8z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  )
}
