// backend/src/validators/exam.validator.js

import { z } from "zod";

// ------------------ COMMON ------------------

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const futureDate = z.string().refine(
  (date) => new Date(date) > new Date(),
  "Date must be in the future"
);

// ------------------ CREATE EXAM ------------------

export const createExamSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100),

  description: z
    .string()
    .max(500)
    .optional(),

  duration: z
    .number()
    .int()
    .min(5, "Minimum duration is 5 minutes")
    .max(300, "Maximum duration is 5 hours"),

  startTime: futureDate,

  endTime: z.string(),

  totalMarks: z
    .number()
    .min(1)
    .max(1000),

  passingMarks: z
    .number()
    .min(0),

  isProctored: z.boolean().default(true),

  allowedDevices: z
    .array(z.enum(["desktop", "laptop"]))
    .nonempty("At least one device must be allowed"),

  createdBy: objectId,
}).refine((data) => new Date(data.endTime) > new Date(data.startTime), {
  message: "End time must be after start time",
  path: ["endTime"],
});

// ------------------ JOIN EXAM ------------------

export const joinExamSchema = z.object({
  examId: objectId,
  studentId: objectId,
});

// ------------------ TELEMETRY ------------------

export const telemetrySchema = z.object({
  studentId: objectId,
  examId: objectId,

  features: z.object({
    tabSwitchRate: z.number().min(0).max(10),
    typingVariance: z.number().min(0).max(2),
    mouseStability: z.number().min(0).max(100),
  }),

  device: z.object({
    risk: z.number().min(0).max(100),
  }),

  network: z.object({
    risk: z.number().min(0).max(100),
  }),

  audio: z.object({
    risk: z.number().min(0).max(100),
  }),
});

// ------------------ VALIDATION MIDDLEWARE ------------------

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.validatedData = parsed;
    next();
  } catch (error) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }
};