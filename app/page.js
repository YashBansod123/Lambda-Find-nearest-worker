"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HeroImage from "@/public/landingpage5.png";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";
import { useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import ClickSpark from "@/components/ClickSpark";
import CircularGallery from "@/components/CircularGallery";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const containerRef = useRef(null);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    const query = encodeURIComponent(search.trim().toLowerCase());
    router.push(`/workers/search?q=${query}`);
    setSearch("");
  };

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        ></motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center md:text-left md:w-1/2 space-y-5"
          >
            <div ref={containerRef} style={{ position: "relative" }}>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                Need Help at Home? <br />
                <span className="text-orange-500">Find Workers Near You</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Mechanics, electricians, plumbers and more — available at your
                location, on your schedule.
              </p>
            </div>
            <form
          onSubmit={handleSearch}
          className="flex md:hidden sm:flex-row items-center gap-2 w-full sm:w-auto"
        >

          <input
            type="text"
            placeholder="Search City..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 w-full sm:w-64 rounded-md bg-white text-black dark:bg-slate-700 dark:text-white outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md md:w-full"
          >
            Search
          </button>
        </form>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <Link href="/workers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600"
                >
                  Get Started
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: [80, -10, 0], opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
          >
            <Image
              src={HeroImage}
              alt="Workers illustration"
              width={500}
              height={400}
              className="rounded-xl shadow-xl"
              priority
            />
          </motion.div>
        </div>

        <div
           className="  mt-28 md:w-[700px]   flex flex-col items-center justify-center rounded-2xl "
          style={{ height: "300px", position: "relative" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white">
            Explore <span className="text-orange-600">Workers</span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-x-auto no-scrollbar w-[400px] mt-6 md:w-[550px]  p-0 shadow-md"
          >
            <div className="overflow-x-auto  no-scrollbar  bg-gradient-to-r mask-b-from-slate-50 via-orange-400 mask-b-to-slate-50  p-4">
              <div className="flex gap-4 md:gap-6 w-max">
                {[
                  { name: "Plumber", image: "/plumber2.jpeg" },
                  { name: "Mechanic", image: "/plumber.jpg" },
                  { name: "Electrician", image: "/plumber1.jpg" },
                  { name: "Painter", image: "/plumber.jpg" },
                  { name: "Carpenter", image: "/plumber1.jpg" },
                  { name: "Laptop Repair", image: "/plumber1.jpg" },
                  { name: "Cable Repair", image: "/plumber1.jpg" },
                ].map((worker, i) => (
                  <div key={i} className="flex flex-col items-center p-2">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="min-w-[120px] md:min-w-[100px] md:min-h-[100px] p-1 rounded-full bg-white dark:bg-orange-600 shadow-md text-center cursor-pointer"
                    >
                      <Link href={`/workers/${worker.name.toLowerCase()}`}>

                      <div className="rounded-full bg-white dark:bg-orange-600 p-[1px]">
                        <Image
                          src={worker.image}
                          alt={worker.name}
                          className="w-[100px] h-[100px] object-cover rounded-full"
                        />
                      </div>
                      </Link>
                    </motion.div>
                    <p className="text-sm md:text-base font-semibold mt-2 text-black dark:font-bold dark:text-black">
                      {worker.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <HowItWorks />

        <div className="flex flex-col items-center justify-center mt-16">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold mb-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            What People Are Saying
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl shadow">
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                &quot;Lambda helped me find an electrician in 10 minutes. Super
                smooth!&quot;
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-2 text-sm text-slate-500 dark:text-slate-400"
              >
                — Riya, Bangalore
              </motion.p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl shadow">
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                &quot;As a mechanic, I get 5-6 new jobs daily thanks to Lambda.&quot;
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-2 text-sm text-slate-500 dark:text-slate-400"
              >
                — Irfan, Pune
              </motion.p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-xl shadow">
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                &quot;It&apos;s like Swiggy for workers. Booked a plumber in seconds.&quot;
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-2 text-sm text-slate-500 dark:text-slate-400"
              >
                — Rahul, Indore
              </motion.p>
            </div>
          </div>
        </div>
        {/* one br line using div to seaprate bottom portion with upper */}
        <div className="w-full h-1 bg-gradient-to-r from-white to-orange-600 mt-28 "></div>
        
        {/* //button for login to create worker account */}
        <div className="flex flex-col items-center justify-center mt-16">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold mb-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Create Your Account As a Worker
          </motion.h2>
          <Link href="/admin/add-worker">
          <div className="flex items-center justify-center">
            <motion.button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Sign Up
            </motion.button>
          </div>
          </Link>
        </div>

        
      </main>
    </ClickSpark>
  );
}
