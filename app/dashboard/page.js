"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/userActions";
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const router = useRouter();
 
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.email) {
      fetch(`/api/user?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.username);
        });
    }
  }, [session, status]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const res = await updateProfile(newUsername, session.user.email);
    alert(res.message);
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <form action={handleSubmit}>
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome, {username} 👋</h1>
      <p className="mb-2 text-gray-500">{session.user.email}</p>

      <div className="flex flex-col gap-2 my-6">
        <input
          type="text"
          placeholder="Enter new username"
          className="border px-4 py-2 rounded"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
        >
          Update Username
        </button>
      </div>

      <button
        onClick={() => signOut()}
        className="text-red-500 underline mt-4"
      >
        Logout
      </button>
    </div>
    </form>
  );
}
