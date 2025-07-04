"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import handlePayment from "@/components/HandlePayment";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PlumberPage() {
  const [plumbers, setPlumbers] = useState([]);
  const router = useRouter();
  useEffect(() => {
  const fetchPlumbers = async () => {
    try {
      const res = await fetch("/api/Workers?profession=Plumber");
      const data = await res.json();
      setPlumbers(data);
    } catch (error) {
      console.error("Failed to fetch plumbers:", error);
    }
  };

  fetchPlumbers();
}, []);

  const sortOptions = ["Relevance", "Rating", "Popular"];

  const [sort, setSort] = useState("relevance");
  const [plumbersToShow, setPlumbersToShow] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const queryCity = searchParams.get("city");
  const handleClick = (plumber) => {
    handlePayment(plumber, router); // ✅ passing router
  };

  // Get user city on load
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

  // Apply city filtering
  useEffect(() => {
    let base = [...plumbers];

    if (queryCity) {
      base = base.filter(
        (p) => p.city.toLowerCase() === queryCity.toLowerCase()
      );
    } else if (userCity) {
      base = base.filter(
        (p) => p.city.toLowerCase() === userCity.toLowerCase()
      );
    }

    // Apply sorting
    if (sort === "rating") {
      base.sort((a, b) => b.rating - a.rating);
    } else if (sort === "popular") {
      base.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    setPlumbersToShow(base);
  }, [queryCity, userCity, sort]);

  
  return (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">
        Plumbers {userCity && `in ${userCity}`}
      </h1>

      {locationDenied && (
        <p className="text-red-500 mb-4">
          Location permission denied. Showing all plumbers.
        </p>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative inline-block text-left mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-900 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              {sortOptions.map((option, index) => (
                <option key={index} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button variant="secondary" onClick={() => setSort("rating")}>
          Top Rated
        </Button>
        <Button variant="secondary" onClick={() => setSort("popular")}>
          Quick Response
        </Button>
        <Button variant="secondary">lambda Verified</Button>
      </div>

      {/* Plumber Cards */}
      <div className="flex flex-col gap-6">
        {plumbersToShow.map((plumber, index) => (

          <div
            key={index}
            className="border rounded-xl p-4 shadow-sm flex gap-4 dark:bg-slate-900 bg-slate-100"
          >
            <img
              src={plumber.image}
              alt={plumber.name}
              className="w-28 h-28 object-cover rounded-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{plumber.name}</h2>
                {plumber.verified && (
                  <span className="text-blue-500">✔ Verified</span>
                )}
                {!plumber.verified && (
                  <span className="text-blue-500">❌ Verified</span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {plumber.address}
              </p>
              <p className="text-green-600 font-semibold mt-1">
                ⭐ {plumber.rating} ({plumber.reviews} Ratings)
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {plumber.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-3">
                <div>
                <a href={`tel:${plumber.phone}`}>
                  <Button className=" cursor-pointer ">
                   📞
                  </Button>
                </a>
                <Button 
                onClick={() => handleClick(plumber)}
                className=" cursor-pointer  bg-orange-600 hover:bg-orange-700">
                  ₹ {plumber.price}
                </Button>
                </div>
                {plumber.whatsapp ? (
                  <a
                    href={`https://wa.me/${plumber.whatsapp.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">💬 WhatsApp</Button>
                  </a>
                ) : (
                  <Button variant="outline" disabled>
                    💬 WhatsApp Not Available
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
