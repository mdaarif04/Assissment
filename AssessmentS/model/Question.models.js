import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: { type: String, required: true }, // e.g., 'multiple-choice', 'true-false', etc.
  options: [String], // Only applicable for types that need options, like multiple-choice
  correctAnswer: { type: String, required: true },
  difficulty: { type: String }, // e.g., 'easy', 'medium', 'hard'
  tags: [String],
  createdBy: { type: String }, // User who created the question
  createdAt: { type: Date, default: Date.now },
});

export const Question = mongoose.model("Question", questionSchema);
