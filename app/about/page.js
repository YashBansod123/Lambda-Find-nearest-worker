"use client"

import { motion, useScroll } from "framer-motion"
import { useRef } from "react"

// import ThreadLogo from "@/components/ThreadLogo"

export default function AboutPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  return (
    <>
      {/* 🔥 Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="h-1 bg-orange-500 origin-left fixed top-0 left-0 right-0 z-50"
      />

      {/* 🔥 Actual Page Content */}
      <main
        ref={ref}
        className="min-h-screen bg-white dark:bg-slate-950 px-6 py-16 md:px-20 text-slate-800 dark:text-white"
      >
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        >
          About <span className="text-orange-500">Lambda</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-lg max-w-3xl mx-auto mb-12 text-slate-600 dark:text-slate-400"
        >
          The platform where skill meets need — connecting trusted workers with those who need them, instantly.
        </motion.p>

        {/* Optional logo */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <ThreadLogo size={400} strokeWidth={5} />
        </motion.div> */}

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Why Lambda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why Lambda Exists</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              In today’s fast-paced world, finding trustworthy local workers can be frustrating...
            </p>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How It Works</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li>Search for the service you need...</li>
              <li>Browse nearby workers...</li>
              <li>Book instantly or schedule for later...</li>
              <li>Rate the service to help others...</li>
            </ul>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* value cards */}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center pt-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to experience smarter service?
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              Whether you&apos;re a customer or a worker — Lambda is built for you.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl shadow-md">
              Get Started
            </button>
          </motion.div>
        </div>
      </main>
    </>
  )
}
