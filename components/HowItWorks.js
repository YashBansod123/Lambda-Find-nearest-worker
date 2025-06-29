"use client"
import { motion } from "framer-motion"
import { Wrench, Search, CreditCard } from "lucide-react"

const steps = [
  {
    icon: <Search className="w-8 h-8 text-orange-500" />,
    title: "Find a Worker",
    description: "Search for electricians, plumbers, mechanics, and more based on your location.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-orange-500" />,
    title: "Check Profile",
    description: "View worker ratings, pricing, availability, and distance before hiring.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-orange-500" />,
    title: "Book & Relax",
    description: "Confirm the service, pay securely, and let the worker come to you.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 mt-20 bg-slate-50 dark:bg-slate-900 px-4 md:px-16 rounded-2xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800 dark:text-white"
      >
        How Lambda Works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 text-center border border-slate-200 dark:border-slate-700"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-white mb-2">{step.title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
