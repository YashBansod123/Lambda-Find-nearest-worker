"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function WorkerCard({ name, role, price, location, rating, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-5 w-full max-w-sm border border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-center space-x-4 mb-4">
        <Image
          src={image}
          alt={name}
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">{name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
        </div>
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Charges:</strong> ₹{price}</p>
        <p><strong>Rating:</strong> ⭐ {rating}/5</p>
      </div>

      <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg">
        Book Now
      </button>
    </motion.div>
  )
}
