"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";

export default function EditWorkerProfile() {
  const { data: session } = useSession();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // For button loading state

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await fetch("/api/get-worker-by-email");
        const data = await res.json();
        setForm(data); // The 'data' object here includes the worker's _id
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

    if (!form?._id) {
      alert("❌ Could not find worker ID. Unable to update.");
      return;
    }

    setIsUpdating(true);
    const workerId = form._id;

    // THIS IS THE CORRECTED FETCH CALL
    const res = await fetch(`/api/workers/${workerId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setIsUpdating(false);

    if (res.ok) {
      alert("✅ Profile updated!");
    } else {
      const errorData = await res.json();
      console.error("Update failed:", errorData);
      alert("❌ Failed to update profile. Check console for details.");
    }
  };

  if (loading || !form) return <LoadingPage message="Loading your profile..." />;

  // ... (the rest of your JSX form code is the same)
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
          disabled={isUpdating}
          className="bg-orange-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}