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
    const query = searchParams.get("q"); // 'q' is for a general search (like name)

    const filterConditions = [];

    // This part is for specific filters like profession and city
    if (profession) {
      filterConditions.push({ profession: { $regex: profession, $options: "i" } });
    }
    if (city) {
      filterConditions.push({ city: { $regex: city, $options: "i" } });
    }

    // This part handles the general search query 'q' across multiple fields
    // This is the smart logic from your old code!
    if (query) {
      filterConditions.push({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { profession: { $regex: query, $options: "i" } },
          { city: { $regex: query, $options: "i" } },
        ],
      });
    }

    const filter = filterConditions.length > 0 ? { $and: filterConditions } : {};

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