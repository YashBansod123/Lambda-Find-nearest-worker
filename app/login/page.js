"use client";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
  if (!session) {
    document.title = "Login - lambda - to the future";
  } else {
    document.title = `${session.user.email} - lambda - to the future`;
  }
}, [session,router]);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session,router]);

  return (
    <div className="flex flex-col items-center justify-center py-14 mx-auto text-white">
      {!session && <h1 className="text-2xl font-bold">Login to Get Started</h1>}
      {session && (
        <h1 className="text-2xl font-bold">
          Logged In as {session.user.email}
        </h1>
      )}

      <div className="flex flex-col items-center justify-center gap-3 p-10">
        <button
          onClick={() => signIn("google")}
          className="flex items-center cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            className="h-6 w-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4285F4"
              d="M44.5 20H24v8.5h11.8C34.7 32.9 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3.1l6-6C34.7 5.3 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.4 0 19.5-7.5 21-18.5 0-.8.5-3.5.5-6.5z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <button
          onClick={() => signIn("github")}
          className="flex items-center cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            className="h-6 w-6 mr-2"
            viewBox="0 0 24 24"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.6-3.9-1.6-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.2 1.2.9-.3 1.8-.4 2.7-.4s1.8.1 2.7.4c2.1-1.5 3.2-1.2 3.2-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.1 0 4.5-2.8 5.5-5.4 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default Page;
