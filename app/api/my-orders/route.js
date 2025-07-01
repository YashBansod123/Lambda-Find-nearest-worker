import connectDb from "@/db/connectDb";
import Order from "@/models/Order";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDb();
  const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

  return Response.json(orders);
}
