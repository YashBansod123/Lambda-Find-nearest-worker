import connectDb from "@/db/connectDb";
import Worker from "@/models/Worker";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(request, { params }) {
  try {
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