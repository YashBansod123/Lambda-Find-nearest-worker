import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: String,
  profession: String,
  phone: String,
  whatsapp: String,
  address: String,
  tags: [String],
  image: String,
  city: String,
  price: Number,
  rating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  ratingsTotal: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
});

export default mongoose.models.Worker || mongoose.model("Worker", workerSchema);
