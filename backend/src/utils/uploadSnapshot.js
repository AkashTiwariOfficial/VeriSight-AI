// backend/src/utils/uploadSnapshot.js

import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { examId, studentId } = req.body;

    const dir = path.join(
      "uploads",
      "exams",
      examId,
      studentId
    );

    ensureDir(dir);
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const uniqueName = `snapshot_${Date.now()}.jpg`;
    cb(null, uniqueName);
  },
});

export const uploadSnapshot = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});