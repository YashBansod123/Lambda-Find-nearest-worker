"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import handlePayment from "@/components/HandlePayment";
import { useSearchParams, useRouter } from "next/navigation";
import ThreadLogo from "@/components/ThreadLogo";
import Image from "next/image";

export default function PlumberPageClient() {
  const [workers, setWorkers] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("relevance");
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCity = searchParams.get("city");

  // IMPROVEMENT #1: One main useEffect for fetching and sorting
  useEffect(() => {
    const fetchAndProcessWorkers = async () => {
      setLoading(true);
      try {
        // Build a specific URL to let the server do the heavy lifting
        let apiUrl = "/api/workers?profession=Plumber";
        const cityToFetch = queryCity || userCity;

        if (cityToFetch) {
          apiUrl += `&city=${cityToFetch}`;
        }

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch data");

        let data = await res.json();
        
        // Sorting is fast on small lists, so doing it here is fine
        if (sort === "rating") {
          data.sort((a, b) => b.rating - a.rating);
        } else if (sort === "popular") {
          data.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        }

        setWorkers(data);
      } catch (error) {
        console.error("Failed to fetch plumbers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Don't fetch until we know the location (or location is denied)
    if (userCity || queryCity || locationDenied) {
      fetchAndProcessWorkers();
    }
  }, [userCity, queryCity, locationDenied, sort]);

  // This useEffect now ONLY handles getting the user's location
  useEffect(() => {
    // Set a timeout to prevent infinite loading if location is slow
    const locationTimeout = setTimeout(() => {
        if (loading) {
            setLocationDenied(true); // Assume denied if it takes too long
            setLoading(false);
        }
    }, 5000); // 5 seconds

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(locationTimeout); // Got location, cancel timeout
          const { latitude, longitude } = pos.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(res => res.json())
            .then(data => {
              const cityName = data?.address?.city || data?.address?.town || data?.address?.village || "";
              setUserCity(cityName);
            });
        },
        () => {
          clearTimeout(locationTimeout);
          setLocationDenied(true);
          setLoading(false);
        }
      );
    } else {
      clearTimeout(locationTimeout);
      setLocationDenied(true);
      setLoading(false);
    }
    
    return () => clearTimeout(locationTimeout); // Cleanup on component unmount
  }, []);

  const handleClick = (plumber) => handlePayment(plumber, router);

  const sortOptions = ["Relevance", "Rating", "Popular"];
  
  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <ThreadLogo size={250} strokeWidth={6} />
    </div>
  ) : (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">
        Plumbers {userCity && `in ${userCity}`}
      </h1>
      
      {/* ... the rest of your JSX can stay the same ... */}

      <div className="flex flex-col gap-6">
        {workers.map((worker) => (
          <div
            key={worker._id} // Use a unique ID for the key
            className="border rounded-xl p-4 shadow-sm flex gap-4 dark:bg-slate-900 bg-slate-100"
          >
            <Image
                src={worker.image?.trim() || "/plumber.jpg"}
                alt={worker.name}
                width={112}
                height={112}
                className="w-28 h-28 object-cover rounded-md"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{worker.name}</h2>
              {/* ... other details ... */}
              <p className="text-green-600 font-semibold mt-1">
                ⭐ {(worker.rating || 0).toFixed(1)} ({(worker.ratingsCount || 0)} Ratings)
              </p>
              {/* ... the rest of your JSX for buttons etc. ... */}
            </div>
          </div>
        ))}
        {workers.length === 0 && <p>No plumbers found for this location.</p>}
      </div>
    </div>
  );
}