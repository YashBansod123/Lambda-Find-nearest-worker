import connectDb from "@/db/connectDb";
import Worker from "@/models/Worker";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// ✅ FUNCTION 1: To GET (search for) workers
export async function GET(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);

    const profession = searchParams.get("profession");
    const city = searchParams.get("city");
    
    let filter = {};

    if (profession) {
      filter.profession = { $regex: profession, $options: "i" };
    }
    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    const workers = await Worker.find(filter);
    return NextResponse.json(workers);
  } catch (error) {
    console.error("❌ Worker search error:", error);
    return NextResponse.json({ error: "Server error during search" }, { status: 500 });
  }
}

// ✅ FUNCTION 2: To POST (create) a new worker
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();
    const body = await req.json();

    const newWorker = await Worker.create({
      ...body,
      email: session.user.email 
    });

    return NextResponse.json(newWorker, { status: 201 });

  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: "A worker profile with this email already exists." }, { status: 409 });
    }
    console.error("❌ Worker creation error:", err);
    return NextResponse.json({ error: "Server error during creation" }, { status: 500 });
  }
}