"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import handlePayment from "@/components/HandlePayment";
import { useSearchParams, useRouter } from "next/navigation";
import ThreadLogo from "@/components/ThreadLogo";
import Image from "next/image";

export default function PlumberPageClient() {
  // State variables are good
  const [workers, setWorkers] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("relevance");
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCity = searchParams.get("city");

  // --- CORRECTION #1: One main useEffect for fetching and sorting ---
  // This is much more efficient. It waits for the city, then makes one smart API call.
  useEffect(() => {
    const fetchAndProcessWorkers = async () => {
      setLoading(true);
      try {
        // Build the URL with server-side filters
        let apiUrl = "/api/workers?profession=Plumber";
        const cityToFetch = queryCity || userCity;

        if (cityToFetch) {
          apiUrl += `&city=${cityToFetch}`;
        }

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch plumbers");

        let data = await res.json();
        
        // Sorting on the client is fine since the list is now much smaller
        if (sort === "rating") {
          data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
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
    
    // Only run the fetch after we know the location or if it was denied
    if (userCity || queryCity || locationDenied) {
      fetchAndProcessWorkers();
    }
  }, [userCity, queryCity, locationDenied, sort]); // Re-runs if sort or city changes

  // --- CORRECTION #2: A separate, clean useEffect just for getting location ---
  useEffect(() => {
    // Set a timeout to prevent the page from loading forever if geolocation is slow
    const locationTimeout = setTimeout(() => {
        if (loading) {
            setLocationDenied(true); 
        }
    }, 7000); // 7 seconds

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(locationTimeout); // Success, so cancel the timeout
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
        }
      );
    } else {
      clearTimeout(locationTimeout);
      setLocationDenied(true); // Geolocation not supported by browser
    }
    
    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(locationTimeout);
  }, []); // Empty array means this runs only once on page load

  const handleClick = (plumber) => handlePayment(plumber, router);

  const sortOptions = ["Relevance", "Rating", "Popular"];
  
  // Your JSX is great, I just made a few small improvements for robustness.
  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <ThreadLogo size={250} strokeWidth={6} />
    </div>
  ) : (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">
        Plumbers {userCity && `in ${userCity}`}
      </h1>

      {locationDenied && !queryCity && (
        <p className="text-yellow-500 mb-4">
          Could not determine your location. Showing plumbers from all areas.
        </p>
      )}

      {/* Sort Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-900 py-2 pl-3 pr-10 text-sm"
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt.toLowerCase()}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {workers.length > 0 ? (
          workers.map((worker) => (
            <div
              key={worker._id} // CORRECTION #3: Use a unique ID for the key, not the index
              className="border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 dark:bg-slate-900 bg-slate-100"
            >
              <Image
                src={worker.image?.trim() || "/plumber.jpg"}
                alt={worker.name}
                width={112}
                height={112}
                className="w-full sm:w-28 h-48 sm:h-28 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{worker.name}</h2>
                  {worker.verified && <span className="text-blue-500 text-xs font-bold">✔ Verified</span>}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{worker.address}</p>
                <p className="text-green-600 font-semibold mt-1">
                  {/* CORRECTION #4: Added a check to prevent crash if rating is missing */}
                  ⭐ {(worker.rating || 0).toFixed(1)} ({(worker.ratingsCount || 0)} Ratings)
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(worker.tags || []).map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-3">
                  <a href={`tel:${worker.phone}`}>
                    <Button>📞 Call</Button>
                  </a>
                  <Button onClick={() => handleClick(worker)} className="bg-orange-600 hover:bg-orange-700">
                    Pay ₹{worker.price}
                  </Button>
                  {worker.whatsapp && (
                    <a href={`https://wa.me/${worker.whatsapp.replace("+", "")}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">💬 WhatsApp</Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
           <p>No plumbers found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
