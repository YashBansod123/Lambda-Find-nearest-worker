"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import handlePayment from "@/components/HandlePayment"; // ✅ Import here
import Link from "next/link"
import Image from "next/image";
export default function WorkerCard({ worker }) {
  const router = useRouter(); // ✅ Get router instance

  return (
    <div className="border rounded-xl p-4 shadow-sm flex gap-4 dark:bg-slate-900 bg-slate-100">
      <Image
        width={100}
        height={100}
        src={worker.image}
        alt={worker.name}
        className="w-28 h-28 object-cover rounded-md"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{worker.name}</h2>
          {worker.verified ? (
            <span className="text-blue-500">✔ Verified</span>
          ) : (
            <span className="text-red-500">❌ Not Verified</span>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {worker.address}
        </p>
        //round off the rating to 1 decimal place
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Rating: {worker.rating ? worker.rating.toFixed(1) : "N/A"} ⭐
        </p>
        {/* <p className="text-green-600 font-semibold mt-1">
          ⭐ {worker.rating} ({worker.ratingsCount || 0} Ratings)
        </p> */}

        <div className="flex gap-2 mt-2 flex-wrap">
          {worker.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-3 flex-wrap">
          <Link href={`tel:${worker.phone}`}>
            <Button className="cursor-pointer">📞 Call</Button>
         </Link>

          <Button
            onClick={() => handlePayment(worker, router)}
            className="bg-orange-600 hover:bg-orange-700 cursor-pointer"
          >
            ₹ {worker.price || "N/A"}
          </Button>

          {worker.whatsapp ? (
            <Link
              href={`https://wa.me/${worker.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">💬 WhatsApp</Button>
           </Link>
          ) : (
            <Button variant="outline" disabled>
              💬 Not Available
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
