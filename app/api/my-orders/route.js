import connectDb from "@/db/connectDb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDb();
  const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 });
  return Response.json(orders);
}
