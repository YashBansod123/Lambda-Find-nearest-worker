console.log("--- EXECUTING /api/workers/[id]/route.js --- VERSION 5 ---");
import connectDb from "@/db/connectDb";
import Worker from "@/models/Worker";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

// THIS IS THE FINAL CORRECTED LINE
import { authOptions } from "@/lib/authOptions";

// Function to GET a SINGLE worker by their ID
export async function GET(request, { params }) {
  try {
  
    console.log("--- GET FUNCTION CALLED ---");
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
    console.log("--- PATCH FUNCTION CALLED ---");
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = params;
    await connectDb();
    const workerToUpdate = await Worker.findById(id);
    if (!workerToUpdate || workerToUpdate.email !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const body = await request.json();
    const { name, phone, address, city, price, image, profession, tags } = body;
    const allowedUpdates = {
      name, phone, address, city, price, image, profession,
      tags: Array.isArray(tags) ? tags : String(tags).split(",").map(t => t.trim())
    };
    await Worker.findByIdAndUpdate(id, allowedUpdates);
    return NextResponse.json({ message: "Worker profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Worker update error:", error);
    return NextResponse.json({ message: "Error updating worker profile", error }, { status: 500 });
  }
}