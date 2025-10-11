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

    // Get all possible search parameters from the URL
    const profession = searchParams.get("profession");
    const city = searchParams.get("city");
    const query = searchParams.get("q"); // 'q' will be our general search for name, etc.

    // This array will hold all our search conditions
    const filterConditions = [];

    // If a profession is provided, add it as a condition
    if (profession) {
      filterConditions.push({ profession: { $regex: profession, $options: "i" } });
    }

    // If a city is provided, add it as a condition
    if (city) {
      filterConditions.push({ city: { $regex: city, $options: "i" } });
    }

    // If a general query (for name) is provided, add it as a condition
    if (query) {
      filterConditions.push({ name: { $regex: query, $options: "i" } });
    }

    // Build the final filter object. If there are conditions, use the $and operator
    // This ensures that ALL conditions must be met (e.g., profession AND city)
    const filter = filterConditions.length > 0 ? { $and: filterConditions } : {};

    // Find all workers that match the final filter
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