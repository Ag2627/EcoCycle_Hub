import mongoose from "mongoose";
import User from "./User.js";

const ReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  verificationStatus: {
    type: String,
    enum: ["idle", "verifying", "success", "failure"],
    default: "idle",
  },
  verificationResult: {
    wasteType: { type: String },
    quantity: { type: String },
    confidence: { type: Number },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", ReportSchema);

export default Report;
