"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const plumbers = [
  {
    name: "Star Plumbing Work",
    rating: 4.2,
    reviews: 25,
    verified: true,
    address: "Umred Road Taj Bagh, Nagpur",
    tags: ["Plumbers", "Plumbing Contractors"],
    image: "/plumber1.jpg",
    city: "Nagpur",
  },
  {
    name: "Maharshtra Plumbing Services",
    rating: 4.4,
    reviews: 900,
    verified: true,
    address: "Jaitala Road Trimurti Nagar, Nagpur",
    tags: ["Wall Painting", "Maintenance", "Service Guarantee"],
    image: "/plumber.jpg",
    city: "Nagpur",
  },
  {
    name: "Home Plumbing Services",
    rating: 4.6,
    reviews: 290,
    verified: true,
    address: "Station Road, Raipur",
    tags: ["Wall Painting", "Maintenance", "plumbing"],
    image: "/plumber.jpg",
    city: "Raipur",
  },
  {
    name: "Home Service Agency",
    rating: 4.9,
    reviews: 140,
    verified: true,
    address: "Pandri Road, Raipur",
    tags: ["Wall Painting", "Maintenance", "Service Guarantee"],
    image: "/plumber.jpg",
    city: "Raipur",
  },
];

export default function PlumberPage() {
  const [sort, setSort] = useState("relevance");
  const [userCity, setUserCity] = useState("");
  const [filteredPlumbers, setFilteredPlumbers] = useState([]);
  const [locationDenied, setLocationDenied] = useState(false);

  const sortOptions = ["Relevance", "Rating", "Popular", "Distance"];

  // Get user's city using geolocation + reverse geocoding
  useEffect(() => {
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

            const cityPlumbers = plumbers.filter(
              (plumber) =>
                plumber.city.toLowerCase() === cityName.toLowerCase()
            );
            setFilteredPlumbers(cityPlumbers);
          } catch (error) {
            console.error("Error in reverse geocoding:", error);
            setFilteredPlumbers(plumbers); // fallback
          }
        },
        () => {
          setLocationDenied(true);
          setFilteredPlumbers(plumbers); // fallback
        }
      );
    } else {
      setFilteredPlumbers(plumbers); // fallback
    }
  }, []);

  // Apply sorting
  useEffect(() => {
    let sorted = [...(userCity ? filteredPlumbers : plumbers)];

    if (sort === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === "popular") {
      sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (sort === "distance") {
      sorted = [...sorted]; // No distance data yet
    }

    setFilteredPlumbers(sorted);
  }, [sort]);

  const finalPlumbers = userCity ? filteredPlumbers : plumbers;

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
        {finalPlumbers.map((plumber, index) => (
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
                <Button className="bg-orange-600 cursor-pointer hover:bg-orange-700">
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

