// backend/src/models/Session.js

import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  time: String,
  event: String,
  meta: Object,
}, { _id: false });

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    trustScore: {
      type: Number,
      default: 100,
    },

    riskLevel: {
      type: String,
      enum: ["Trusted", "Warning", "High Risk"],
      default: "Trusted",
    },

    cheatingProbability: {
      type: Number,
      default: 0,
    },

    confidenceLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    suspiciousFlag: {
      type: Boolean,
      default: false,
    },

    tabSwitchCount: {
      type: Number,
      default: 0,
    },

    idleTime: {
      type: Number,
      default: 0,
    },

    typingSpeed: Number,
    mouseActivity: Number,

    reasons: [String],

    timeline: [timelineSchema],

    snapshots: [
      {
        type: String, // file path or URL
      },
    ],

    deviceFingerprint: {
      userAgent: String,
      screenResolution: String,
      browser: String,
      ip: String,
    },

    networkLogs: [
      {
        time: String,
        status: String,
      },
    ],

    status: {
      type: String,
      enum: ["active", "paused", "completed", "terminated"],
      default: "active",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);