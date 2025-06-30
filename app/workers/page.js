"use client"

import WorkerCard from "@/components/WorkerCard"
const workers = [
  {
    name: "Ramesh Gupta",
    role: "Electrician",
    price: 250,
    location: "Nagpur",
    rating: 4.7,
    image: "/worker1.jpg",
  },
  {
    name: "Aarti Verma",
    role: "Plumber",
    price: 300,
    location: "Bhopal",
    rating: 4.5,
    image: "/worker2.jpg",
  },
  {
    name: "Nikhil Rao",
    role: "Laptop Repair",
    price: 500,
    location: "Indore",
    rating: 4.8,
    image: "/worker3.jpg",
  },
  {
    name: "Farhan Shaikh",
    role: "Mechanic",
    price: 350,
    location: "Raipur",
    rating: 4.6,
    image: "/worker4.jpg",
  },
]

export default function WorkerListPage() {
  return (<>
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-16 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-800 dark:text-white">
        Meet Our Trusted Workers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {workers.map((worker, idx) => (
          <WorkerCard key={idx} {...worker} />
          
        ))}
      </div>
    </main>
    </>
  )
}
