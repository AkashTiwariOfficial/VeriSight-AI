import mongoose from "mongoose";

const snapshotSchema = new mongoose.Schema({
  examId: String,
  studentId: String,
  filePath: String,
  probability: Number,
  level: String,
  reasons: [String],
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Snapshot", snapshotSchema);