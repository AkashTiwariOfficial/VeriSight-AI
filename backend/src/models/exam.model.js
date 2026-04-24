import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  startTime: Date,
  endTime: Date,
  createdBy: String,
});

export default mongoose.model("Exam", examSchema);