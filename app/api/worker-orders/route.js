import connectDb from "@/db/connectDb";
import Order from "@/models/Order";
import Worker from "@/models/Worker"; // Import the Worker model
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    // 1. Check if user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    // 2. Find the Worker profile associated with the logged-in user's email
    const workerProfile = await Worker.findOne({ email: session.user.email });

    // 3. Check if the logged-in user actually has a worker profile
    if (!workerProfile) {
      // It's okay if they don't, just means they have no worker orders
      return NextResponse.json([]); // Return an empty array
    }

    // 4. Fetch orders where the 'plumberId' matches the worker's _id
    //    Sort by newest first
    const orders = await Order.find({ plumberId: workerProfile._id }).sort({ createdAt: -1 });

    // 5. Return the found orders
    return NextResponse.json(orders);

  } catch (error) {
    console.error("❌ Fetch worker orders error:", error);
    return NextResponse.json({ error: "Server error fetching worker orders" }, { status: 500 });
  }
}
