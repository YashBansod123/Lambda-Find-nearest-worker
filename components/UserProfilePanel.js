"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
export default function UserProfilePanel() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const togglePanel = () => setOpen(!open);
  const googleDefault = "https://lh3.googleusercontent.com/";
  const defaultImage = "/default1.jpeg"; // your own default image

  const userImage = session?.user?.image;
  const useDefault =
    userImage &&
    userImage.startsWith(googleDefault) &&
    userImage.includes("=s96-c");

  const imageSrc = useDefault ? defaultImage : userImage;

  if (!session) return null;

  return (
    <div className="relative">
      <Image
        width={10}
        height={10}
        src={imageSrc}
        alt="profile"
        onClick={togglePanel}
        className="w-10 h-10 rounded-full cursor-pointer"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 shadow-lg rounded-xl p-4 z-50">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={imageSrc}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{session.user.name}</p>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>

          <ul className="space-y-2">
            <li>
              <Link href="/dashboard/booking">
                <span className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                  📖 My Bookings
                </span>
              </Link>
            </li>
            <li>
              <Link href="/admin/add-worker">
                <span className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                  🛠️ Add Worker
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                  📞 Contact Support
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/edit-profile">
                <Button variant="outline">✏️ Edit Worker Profile</Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/my-jobs">
                <Button variant="outline">🧰 My Jobs</Button>
              </Link>
            </li>
            <li>
              <Button
                onClick={() => signOut()}
                className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
              >
                🔓 Logout
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
