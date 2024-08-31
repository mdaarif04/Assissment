import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    required: true,
    enum: ["multiple-choice", "short-answer", "essay", "true-false"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  subject: {
    type: String,
    enum: ["math", "science", "history"],
  },
  options: {
    type: [String],
    required: function () {
      return this.questionType === "multiple-choice";
    },
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Easyquestion = mongoose.model("Easyquestion", questionSchema);
// export const Question = mongoose.model("Question", QuestionSchema);

