import connectDb from "@/lib/connectDb"; // Adjust the path to your connectDb file
import Worker from "@/models/Worker";   // Adjust the path to your Worker model
import { NextResponse } from "next/server";
import { auth } from "@/auth";           // Adjust the path to your server-side auth function

// Function to GET a SINGLE worker by their ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const worker = await Worker.findById(id);

    if (!worker) {
      return NextResponse.json({ message: "Worker not found" }, { status: 404 });
    }

    return NextResponse.json(worker, { status: 200 });
  } catch (error) {
    console.error("❌ Get worker by ID error:", error);
    return NextResponse.json({ message: "Error fetching worker" }, { status: 500 });
  }
}

// Function to UPDATE a SINGLE worker by their ID
export async function PATCH(request, { params }) {
  try {
    const session = await auth();
    // 1. Check if the user is authenticated
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Get the worker's ID from the URL
    const { id } = params;

    await connectDb();

    // 3. Find the worker profile in the database
    const workerToUpdate = await Worker.findById(id);

    // 4. Authorize: Make sure the logged-in user owns this profile
    if (!workerToUpdate || workerToUpdate.email !== session.user.email) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // 5. Get the allowed fields from the request body
    const body = await request.json();
    const { name, phone, address, city, price, image, profession, tags } = body;

    // 6. Create a secure object with ONLY the fields a user is allowed to change
    const allowedUpdates = {
      name, phone, address, city, price, image, profession,
      tags: Array.isArray(tags) ? tags : String(tags).split(",").map(t => t.trim())
    };

    // 7. Find the worker by their ID and update them with the allowed data
    await Worker.findByIdAndUpdate(id, allowedUpdates);

    return NextResponse.json({ message: "Worker profile updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Worker update error:", error);
    return NextResponse.json({ message: "Error updating worker profile", error }, { status: 500 });
  }
}