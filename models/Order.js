import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    plumberId: String,
    amount: Number,
    status: {
      type: String,
      default: "paid",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
