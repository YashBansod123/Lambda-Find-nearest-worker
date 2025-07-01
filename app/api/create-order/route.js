import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const body = await req.json();
  const { amount } = body;

  try {
    const order = await razorpay.orders.create({
      amount, // amount in paisa
      currency: "INR",
      receipt: "lambda_order_rcpt_" + Date.now(),
    });

    return Response.json(order);
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return new Response("Order failed", { status: 500 });
  }
}
