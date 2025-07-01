import crypto from "crypto";
import connectDb from "@/db/connectDb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plumberId,
      amount,
    } = await req.json();

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    await connectDb();
    await Order.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plumberId,
      amount,
      status: "paid",
    });

    return Response.json({ success: true, message: "Order saved" });
  } catch (err) {
    console.error("❌ payment-success error:", err);
    return new Response("Server error", { status: 500 });
  }
}
