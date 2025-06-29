"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function RatingBar() {
  const containerRef = useRef(null)

  const { scrollXProgress } = useScroll({
    container: containerRef, // this tracks horizontal scroll
  })

  const backgroundColor = useTransform(
    scrollXProgress,
    [0, 0.5, 1],
    ["#f97316", "#9333ea", "#2563eb"] // orange → purple → blue
  )

  return (
    <motion.section
      style={{ backgroundColor }}
      className="py-20 px-6 md:px-20 transition-colors duration-300 overflow-x-hidden"
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white text-center">
        What People Are Saying
      </h2>

      {/* Horizontal Scroll Progress */}
      <motion.div
        className="h-1 bg-white rounded-full mb-6"
        style={{
          width: useTransform(scrollXProgress, [0, 1], ["0%", "100%"]),
        }}
      />

      {/* Horizontally Scrollable Testimonials */}
      <motion.div
        ref={containerRef}
        className="flex overflow-x-auto space-x-6 pb-4"
      >
        {[
          {
            quote: "Lambda helped me find an electrician in 10 minutes. Super smooth!",
            name: "— Riya, Bangalore",
          },
          {
            quote: "As a mechanic, I get 5-6 new jobs daily thanks to Lambda.",
            name: "— Irfan, Pune",
          },
          {
            quote: "It’s like Swiggy for workers. Booked a plumber in seconds.",
            name: "— Rahul, Indore",
          },
          {
            quote: "Quick, fair, and easy. I booked a TV repair in 5 minutes.",
            name: "— Priya, Hyderabad",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] md:min-w-[400px] bg-white dark:bg-slate-800 p-6 rounded-xl shadow flex-shrink-0 text-black"
          >
            <p className="text-slate-800">{item.quote}</p>
            <p className="mt-2 text-sm text-slate-500">{item.name}</p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}
