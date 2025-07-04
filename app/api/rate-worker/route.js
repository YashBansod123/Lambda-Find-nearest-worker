// ✅ app/api/rate-worker/route.js
import connectDb from "@/db/connectDb";
import Worker from "@/models/Worker";

export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const { plumberId, rating } = body;

    if (!plumberId || !rating) {
      return new Response(JSON.stringify({ success: false, message: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const worker = await Worker.findOne({ phone: plumberId });
    if (!worker) {
      return new Response(JSON.stringify({ success: false, message: "Worker not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    worker.ratingsTotal += rating;
    worker.ratingsCount += 1;
    worker.rating = worker.ratingsTotal / worker.ratingsCount;
    await worker.save();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Rating error:", err);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
