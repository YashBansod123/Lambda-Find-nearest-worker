import connectDb from "@/db/connectDb";
import Worker from "@/models/Worker";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ✅ corrected path

export async function GET(req) {
  await connectDb();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const email = session.user.email;
  const worker = await Worker.findOne({ email });
  return Response.json(worker || {});
}
