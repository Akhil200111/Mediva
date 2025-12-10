import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderText: String,
    imageUrl: String,
    status: {
      type: String,
      enum: ["Pending", "Out for Delivery", "Delivered"], // Allowed status values
      default: "Pending", // Default status when an order is created
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
