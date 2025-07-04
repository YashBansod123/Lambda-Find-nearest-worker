// components/LoadingPage.js
"use client";

import ThreadLogo from "./ThreadLogo";

export default function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white">
      <ThreadLogo size={100} strokeWidth={16} />
      <p className="mt-6 text-lg font-medium animate-pulse">{message}</p>
    </div>
  );
}
