import mongoose from "mongoose";

const ShowSchema = new mongoose.Schema(
  {
    title: String,
    date: Date,
    client: String,
    cost: Number,
    extraFees: [
      {
        name: String,
        amount: Number,
      },
    ],
    location: String,
    note: String,
    manager: String,
  },
  { timestamps: true },
);

export default mongoose.models.Show || mongoose.model("Show", ShowSchema);
