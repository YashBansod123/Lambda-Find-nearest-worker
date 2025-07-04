"use client";
import { useState } from "react";

export default function AddWorkerPage() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    price: "",
    tags: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    const payload = {
      ...formData,
      price: parseInt(formData.price),
      rating: 0, // Default
      reviews: 0, // Default
      verified: false, // Only editable by admin later
      tags: tagsArray,
    };

    const res = await fetch("/api/Workers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Worker added successfully!");
      setFormData({
        name: "",
        profession: "",
        phone: "",
        whatsapp: "",
        address: "",
        city: "",
        price: "",
        tags: "",
        image: "",
      });
    } else {
      alert("❌ Error adding worker");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Worker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", label: "Full Name" },
          { name: "profession", label: "Profession (e.g., plumber)" },
          { name: "phone", label: "Phone" },
          { name: "whatsapp", label: "WhatsApp" },
          { name: "address", label: "Address" },
          { name: "city", label: "City" },
          { name: "price", label: "Service Price" },
          { name: "tags", label: "Tags (comma separated)" },
          { name: "image", label: "Image URL" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required={name !== "image"}
            />
          </div>
        ))}

        <div className="flex items-center gap-2 opacity-50">
          <input type="checkbox" disabled checked={false} />
          <label className="font-medium">Verified (only admin can mark)</label>
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
