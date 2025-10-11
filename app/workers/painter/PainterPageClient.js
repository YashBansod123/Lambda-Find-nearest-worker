"use client";

import { useEffect, useState } from "react";
import WorkerCard from "@/components/WorkerCard";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PainterPage() {
  const [painters, setPainters] = useState([]);
  const [filteredPainters, setFilteredPainters] = useState([]);
  const [sort, setSort] = useState("relevance");
  const [userCity, setUserCity] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);

  const searchParams = useSearchParams();
  const queryCity = searchParams.get("city");

  // Get user's city
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            "";
          setUserCity(city);
        },
        () => setLocationDenied(true)
      );
    }
  }, []);

  // Fetch painters
  useEffect(() => {
    const fetchPainters = async () => {
      try {
        const res = await fetch("/api/workers?profession=Painter");
        const data = await res.json();
        setPainters(data);
      } catch (err) {
        console.error("Failed to fetch painters:", err);
      }
    };

    fetchPainters();
  }, []);

  // Filter and sort
  useEffect(() => {
    let base = [...painters];

    if (queryCity) {
      base = base.filter(
        (p) => p.city?.toLowerCase() === queryCity.toLowerCase()
      );
    } else if (userCity) {
      base = base.filter(
        (p) => p.city?.toLowerCase() === userCity.toLowerCase()
      );
    }

    if (sort === "rating") {
      base.sort((a, b) => b.rating - a.rating);
    } else if (sort === "popular") {
      base.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    setFilteredPainters(base);
  }, [painters, queryCity, userCity, sort]);

  const sortOptions = ["Relevance", "Rating", "Popular"];

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">
        Painters {userCity && `in ${userCity}`}
      </h1>

      {locationDenied && (
        <p className="text-red-500 mb-4">
          Location permission denied. Showing all painters.
        </p>
      )}

      {/* Sort UI */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <span className="text-sm font-medium">Sort by:</span>
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

        <Button variant="secondary" onClick={() => setSort("rating")}>
          Top Rated
        </Button>
        <Button variant="secondary" onClick={() => setSort("popular")}>
          Quick Response
        </Button>
        <Button variant="secondary" disabled>
          Lambda Verified
        </Button>
      </div>

      {/* Worker cards */}
      {filteredPainters.length === 0 ? (
        <p>No painters found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredPainters.map((painter, i) => (
            <WorkerCard key={i} worker={painter} />
          ))}
        </div>
      )}
    </div>
  );
} 