import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  tip: { type: String, required: true },
  category: { type: String, required: true },
  anonymous: { type: Boolean, required: true },
  contact: { type: String, default: "" },
  attachment: { type: String, default: null },
  location: {
    lat: { type: String, default: null },
    lng: { type: String, default: null },
  },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
