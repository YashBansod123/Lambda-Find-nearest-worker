"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function ElectricianPage() {
  const [sort, setSort] = useState("relevance");
  const [userCity, setUserCity] = useState("");
  const [filteredElectricians, setFilteredElectricians] = useState([]);
  const [locationDenied, setLocationDenied] = useState(false);
   const [electricians, setElectricians] = useState([]);

  useEffect(() => {
  const fetchElectricians = async () => {
    try {
      const res = await fetch("/api/Workers?profession=electricians");
      const data = await res.json();
      setElectricians(data);
    } catch (error) {
      console.error("Failed to fetch plumbers:", error);
    }
  };

  fetchElectricians();
}, []);

  const sortOptions = ["Relevance", "Rating", "Popular", "Distance"];

  // Location & City Detection
  useEffect(() => {
  if (!electricians.length) return;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
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

          const cityElectricians = electricians.filter(
            (e) => e.city.toLowerCase() === cityName.toLowerCase()
          );
          setFilteredElectricians(cityElectricians);
        } catch (err) {
          console.error("Geocoding error:", err);
          setFilteredElectricians(electricians);
        }
      },
      () => {
        setLocationDenied(true);
        setFilteredElectricians(electricians);
      }
    );
  } else {
    setFilteredElectricians(electricians);
  }
}, [electricians]);


  // Sorting
  useEffect(() => {
    let sorted = [...(userCity ? filteredElectricians : electricians)];

    if (sort === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === "popular") {
      sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (sort === "distance") {
      sorted = [...sorted]; // No real distance for now
    }

    setFilteredElectricians(sorted);
  }, [sort,electricians,filteredElectricians,userCity]);

  const finalElectricians = userCity ? filteredElectricians : electricians;

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">
        Electricians {userCity && `in ${userCity}`}
      </h1>

      {locationDenied && (
        <p className="text-red-500 mb-4">
          Location permission denied. Showing all electricians.
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
          Most Popular
        </Button>
        <Button variant="secondary">lambda Verified</Button>
      </div>

      {/* Electrician Cards */}
      <div className="flex flex-col gap-6">
        {finalElectricians.map((elec, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-sm flex gap-4 dark:bg-slate-900 bg-slate-100"
          >
            <Image
              src={elec.image}
              alt={elec.name}
              className="w-28 h-28 object-cover rounded-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{elec.name}</h2>
                {elec.verified && (
                  <span className="text-blue-500">✔ Verified</span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {elec.address}
              </p>
              <p className="text-green-600 font-semibold mt-1">
                ⭐ {elec.rating} ({elec.reviews} Ratings)
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {elec.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-3">
                <Button className="bg-orange-600 hover:bg-orange-700">
                   Book Now
                </Button>
                <Button variant="outline">💬 WhatsApp</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

