import connectDb from "@/db/connectDb";
import Worker from "@/models/Worker";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Creates a new worker in the database.
 *
 * @param {Request} req - The request object
 * @returns {Response} - The response object
 */
/*******  3caa6dcb-fdfc-4544-85bd-3488bbfc696c  *******/export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const newWorker = await Worker.create(body);
    return Response.json(newWorker);
  } catch (err) {
    console.error("❌ Worker creation error:", err);
    return new Response("Server error", { status: 500 });
  }
}

export async function GET(req) {
  await connectDb();
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q")?.toLowerCase();
  const profession = searchParams.get("profession");
  const city = searchParams.get("city");

  const andFilters = [];

  if (profession) {
    andFilters.push({ profession: { $regex: profession, $options: "i" } });
  }

  if (city) {
    andFilters.push({ city: { $regex: city, $options: "i" } });
  }

  if (query) {
    andFilters.push({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { profession: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
      ],
    });
  }

  const finalFilter = andFilters.length > 0 ? { $and: andFilters } : {};

  const workers = await Worker.find(finalFilter);
  return Response.json(workers);
}
