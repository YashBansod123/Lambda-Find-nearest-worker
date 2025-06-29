"use client"

import React from 'react'
import RotatingText from "@/components/RotatingText"
  
const page = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
 <h3 className="text-4xl font-bold text-slate-800 dark:text-white mx-2">One Stop Solution For</h3>   
<RotatingText
  texts={['Mechanic','Electrician','Plumber','Carpenter','Painter','Cleaner','gardener']}
  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black text-[30px] font-bold overflow-hidden w-[200px] py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/>
    </div>
  )
}

export default page
