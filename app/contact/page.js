"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    // Here you can later integrate backend or email service
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 px-6 py-16 md:px-20 text-slate-800 dark:text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center mb-10"
      >
        Contact <span className="text-orange-500">Us</span>
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto bg-slate-100 dark:bg-slate-800 p-8 rounded-xl shadow-md space-y-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Message</label>
          <textarea
            name="message"
            rows="5"
            className="w-full p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
            placeholder="How can we help you?"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium"
        >
          Send Message
        </button>
      </motion.form>
    </main>
  );
}
