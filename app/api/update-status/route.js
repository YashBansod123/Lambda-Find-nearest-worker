import connectDb from "@/db/connectDb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDb();
    const { orderId, status } = await req.json();

    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return Response.json({ success: true, updated });
  } catch (err) {
    return new Response("Failed to update status", { status: 500 });
  }
}
