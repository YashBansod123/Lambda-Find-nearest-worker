"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import handlePayment from "@/components/HandlePayment";
import { useSearchParams, useRouter } from "next/navigation";
import ThreadLogo from "@/components/ThreadLogo";
import Image from "next/image";

export default function WorkerPageClient({ profession }) {
  const [workers, setWorkers] = useState([]);
  const [workersToShow, setWorkersToShow] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCity = searchParams.get("city");
  const [sort, setSort] = useState("relevance");

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await fetch(`/api/workers?profession=${profession}`);
        const data = await res.json();
        setWorkers(data);
      } catch (error) {
        console.error(`Failed to fetch ${profession}s:`, error);
      }
    };
    fetchWorkers();
  }, [profession]);

  useEffect(() => {
    setLoading(false);
  }, [workers, locationDenied]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const cityName = data?.address?.city || data?.address?.town || data?.address?.village || "";
          setUserCity(cityName);
        },
        () => setLocationDenied(true)
      );
    }
  }, []);

  useEffect(() => {
    let base = [...workers];
    if (queryCity) base = base.filter((p) => p.city.toLowerCase() === queryCity.toLowerCase());
    else if (userCity) base = base.filter((p) => p.city.toLowerCase() === userCity.toLowerCase());
    if (sort === "rating") base.sort((a, b) => b.rating - a.rating);
    else if (sort === "popular") base.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    setWorkersToShow(base);
  }, [queryCity, userCity, sort, workers]);

  const handleClick = (worker) => handlePayment(worker, router);

  return loading ? (
    <div className="flex items-center -ml-40 justify-center py-10">
      <ThreadLogo size={250} strokeWidth={6} />
    </div>
  ) : (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">
        {profession}s {userCity && `in ${userCity}`}
      </h1>

      {locationDenied && (
        <p className="text-red-500 mb-4">Location permission denied. Showing all {profession.toLowerCase()}s.</p>
      )}
     {workers.length === 0 ? (
       <p className="text-red-500 mb-4">No {profession.toLowerCase()}s found.</p>
     ) : (
       <p className="text-gray-500 mb-4">
         Showing {workersToShow.length} out of {workers.length} {profession.toLowerCase()}
       </p>
     )}
     
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-900 py-2 pl-3 pr-10 text-sm"
          >
            {["Relevance", "Rating", "Popular"].map((opt, i) => (
              <option key={i} value={opt.toLowerCase()}>{opt}</option>
            ))}
          </select>
        </div>
        <Button variant="secondary" onClick={() => setSort("rating")}>Top Rated</Button>
        <Button variant="secondary" onClick={() => setSort("popular")}>Quick Response</Button>
        <Button variant="secondary">lambda Verified</Button>
      </div>

      <div className="flex flex-col gap-6">
        {workersToShow.map((worker, index) => (
          <div
            key={index}
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
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{worker.name}</h2>
                <span className="text-blue-500">{worker.verified ? "✔ Verified" : "❌ Verified"}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{worker.address}</p>
              <p className="text-green-600 font-semibold mt-1">⭐ {worker.rating} ({worker.ratingsCount} Ratings)</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {worker.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-3 -ml-20 md:ml-0">
                <a href={`tel:${worker.phone}`}>
                  <Button>📞</Button>
                </a>
                <Button onClick={() => handleClick(worker)} className="bg-orange-600 hover:bg-orange-700">
                  ₹ {worker.price}
                </Button>
                {worker.whatsapp ? (
                  <a
                    href={`https://wa.me/${worker.whatsapp.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">💬 WhatsApp</Button>
                  </a>
                ) : (
                  <Button variant="outline" disabled>💬 Not Available</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}