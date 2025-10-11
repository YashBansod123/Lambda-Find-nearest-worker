import connectDb from "@/db/connectDb";
import Worker from "@/models/Worker";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const worker = await Worker.findOne({ email });

    // THIS IS THE FIX: Return a 404 error if no worker is found
    if (!worker) {
      return NextResponse.json({ error: "Worker profile not found" }, { status: 404 });
    }

    // This returns the full worker object with the _id
    return NextResponse.json(worker);

  } catch (error) {
    console.error("❌ get-worker-by-email error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}