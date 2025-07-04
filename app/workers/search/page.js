"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WorkerCard from "@/components/WorkerCard";
import ThreadLogo from "@/components/ThreadLogo";
export default function WorkerSearchPage() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);
  const [sort, setSort] = useState("relevance");
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [loading, setLoading] = useState(true);
  
  //set loading to false after workers are fetched or location denied 
  useEffect(() => {
  if (workers.length > 0 || locationDenied) {
    setLoading(false);
  }
}, [workers, locationDenied]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const cityName =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            "";
          setUserCity(cityName);
        },
        () => setLocationDenied(true)
      );
    }
  }, []);

  // Fetch workers from API
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Workers?q=${query}`);
        const data = await res.json();
        setWorkers(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchData();
  }, [query]);

  // Apply city filter and sorting
  useEffect(() => {
    let filtered = [...workers];

    // Filter by city
    if (userCity) {
      filtered = filtered.filter(
        (w) => w.city?.toLowerCase() === userCity.toLowerCase()
      );
    }

    // Sort
    if (sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === "popular") {
      filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    setFilteredWorkers(filtered);
  }, [workers, userCity, sort]);

  const sortOptions = ["Relevance", "Rating", "Popular"];

  return (
    <>
    {loading ? (
  <div className="flex justify-center -ml-50 py-10 ">
    <ThreadLogo size={250} strokeWidth={6} />
  </div>
) : (
    <div className="p-6 min-h-screen text-black dark:text-white bg-white dark:bg-slate-950">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for <span className="text-orange-500">"{query}"</span>{" "}
        {userCity && `in ${userCity}`}
      </h1>

      {locationDenied && (
        <p className="text-red-500 mb-4">
          Location permission denied. Showing all workers.
        </p>
      )}

      {/* Sort Buttons */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="text-sm font-medium">Sort by:</div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-900 py-2 px-3 text-sm focus:outline-none"
        >
          {sortOptions.map((opt, i) => (
            <option key={i} value={opt.toLowerCase()}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {filteredWorkers.length === 0 ? (
        <p>No workers found.</p>
      ) : (
        <div className="grid gap-6  md:grid-row">
          {filteredWorkers.map((worker, index) => (
            <WorkerCard key={index} worker={worker} />
          ))}
        </div>
      )}
    </div>)}
    </>
  );
}
