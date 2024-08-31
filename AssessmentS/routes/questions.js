import express from "express";
import { Easyquestion } from "./model/Questionss.models.js"; // Adjust the path according to your file structure

const router = express.Router();

// GET /api/easyquestion - Fetch questions with optional filters
router.get("/api/easyquestion", async (req, res) => {
  try {
    const { type, difficulty, subject } = req.query;
    const filters = {};

    if (type) filters.questionType = type;
    if (difficulty) filters.difficulty = difficulty;
    if (subject) filters.subject = subject;

    const questions = await Easyquestion.find(filters);
    res.json(questions);
  } catch (error) {
    console.error("Error occurred while fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/easyquestion - Create a new question
router.post("/api/easyquestion", async (req, res) => {
  const {
    questionText,
    questionType,
    difficulty,
    subject,
    options,
    correctAnswer,
    tags,
  } = req.body;

  if (!questionText || !questionType || !correctAnswer) {
    return res.status(400).json({
      error:
        "Missing required fields: questionText, questionType, and correctAnswer are required.",
    });
  }

  try {
    const newQuestion = new Easyquestion({
      questionText,
      questionType,
      difficulty,
      subject,
      options: questionType === "multiple-choice" ? options : [],
      correctAnswer,
      tags: Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim()),
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error occurred while saving question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
