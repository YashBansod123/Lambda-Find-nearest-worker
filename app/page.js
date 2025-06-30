"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import ThreadLogo from "@/components/ThreadLogo"
import HeroImage from "@/public/landingpage5.png"; // Add any worker-related image here
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";
import { useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import ClickSpark from "@/components/ClickSpark";
import RollingGallery from "@/components/RollingGallery"
import CircularGallery from "@/components/CircularGallery"

 


// import VariableProximity from './VariableProximity';
export default function HomePage() {
  const containerRef = useRef(null);
  return (
   
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      
      <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-6 md:px-12">
        {/* Logo fade-in */}

        <motion.div
        
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        ></motion.div>

        {/* Hero Text Block */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
          {/* TEXT ANIMATION */}
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
          

          {/* IMAGE JUMP ANIMATION */}
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
        <div className="w-full md:w-[600px]" style={{ height: '300px', position: 'relative' }}>
        <h1 className="text-3xl md:text-4xl font-bold text-center  text-slate-800 dark:text-white">Explore <p className="text-3xl md:text-4xl font-bold text-center  text-slate-800 dark:text-orange-600">Workers</p></h1>
  <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.15} />
</div>
        <HowItWorks />
        {/* <motion.div style={{ backgroundColor }} /> */}
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
                "Lambda helped me find an electrician in 10 minutes. Super
                smooth!"
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
                "As a mechanic, I get 5-6 new jobs daily thanks to Lambda."
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
                "It’s like Swiggy for workers. Booked a plumber in seconds."
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
        
         
        <RollingGallery className="mt-16 text-amber-50" autoplay={true} pauseOnHover={true} />
       
      </main>
    </ClickSpark>
    
  );
}
