import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDb from "@/db/connectDb";
import Worker from "@/models/Worker";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectDb();
    const body = await req.json();

    const newWorker = await Worker.create({
      ...body,
      email: session.user.email 
    });

    return new Response(JSON.stringify(newWorker), { status: 201 });

  } catch (err) {
    if (err.code === 11000) {
      return new Response(JSON.stringify({ error: "A worker profile with this email already exists." }), { status: 409 });
    }
    console.error("❌ Worker creation error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}