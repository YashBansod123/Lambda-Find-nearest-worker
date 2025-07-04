"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";



export default function EditWorkerProfile() {
  const { data: session } = useSession();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await fetch("/api/get-worker-by-email");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error("Failed to fetch worker profile", err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchWorker();
    }
  }, [session]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/get-worker-by-email", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Profile updated!");
    } else {
      alert("❌ Failed to update profile.");
    }
  };

  if (loading || !form) return <LoadingPage message="Loading your profile..." />;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Your Worker Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "profession", "phone", "whatsapp", "address", "city", "price", "image"].map((key) => (
          <div key={key}>
            <label className="block font-medium capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={form[key] || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={(form.tags || []).join(", ")}
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()) })
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
