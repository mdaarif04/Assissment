import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import {Assessment} from "./model/assessment.models.js";
// import bodyParser from "body-parser";
import { Question } from "./model/Question.models.js";

// import questionRoutes from "./routes/questions.js";
// import tagRoutes from "./routes/tags.js";


dotenv.config();

const app = express();
app.use(cors(
));
app.use(express.json());
// app.use(bodyParser.json());

connectDB()
// For questions 1 Router 
// app.use("/api", questionRoutes);
// app.use("/api", tagRoutes);
// GET /api/questions - Retrieve all questions with optional filters
// GET /api/questions - Fetch filtered questions

app.get("/api/easyquestion", async (req, res) => {
  try {
    const { type, difficulty, subject } = req.query;
    // console.log("Received filters:", { type, difficulty, subject }); // Add this line
    const filters = {};

    if (type) filters.questionType = type;
    if (difficulty) filters.difficulty = difficulty;
    if (subject) filters.subject = subject;

    console.log("Filters applied:", filters); // Add this line

    const questions = await Question.find(filters);
    res.json(questions);
  } catch (error) {
    console.error("Error occurred while fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/easyquestion - Create a new question
app.post("/api/easyquestion", async (req, res) => {
  // console.log("Received data:", req.body);

  const {
    questionText,
    questionType,
    difficulty,
    subject,
    options,
    correctAnswer,
    tags,
  } = req.body;

  // Check for required fields
  if (!questionText || !questionType || !correctAnswer) {
    return res.status(400).json({ error: "Missing required fields: questionText, questionType, and correctAnswer are required." });
  }

  try {
    const newQuestion = new Question({
      questionText, 
      questionType, 
      difficulty,
      subject,
      options: questionType === "multiple-choice" ? options : [],
      correctAnswer,
      tags: Array.isArray(tags) ? tags : tags.split(",").map((tag) => tag.trim()),
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error occurred while saving question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/tags - Create a new tag
app.post("/tags", async (req, res) => {
  try {
    const tag = new tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});










// Route to save the selected question
app.post('/api/saveSelectedQuestion', async (req, res) => {
  try {
    const { questionId } = req.body;

    // Find the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Perform any additional logic here, like saving the question to another collection
    // For example, adding it to an assessment:
    // await Assessment.updateOne({ _id: someAssessmentId }, { $push: { questions: question._id } });

    res.status(200).json({ message: 'Question selected successfully', question });
  } catch (error) {
    console.error("Error saving selected question:", error);
    res.status(500).json({ error: 'An error occurred while saving the question' });
  }
});


// Routes for questions get add or delete patch  *************

app.get("/api/questions", async (req, res) => {
  try {
    const { search, type, difficulty } = req.query;
    let query = {};

    if (search) query.questionText = { $regex: search, $options: "i" };
    if (type) query.questionType = type;
    if (difficulty) query.difficulty = difficulty;

    const questions = await Question.find(query);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/questions - Create a new question
app.post("/api/questions", async (req, res) => {
  const question = new Question({
    questionText: req.body.questionText,
    questionType: req.body.questionType,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
    difficulty: req.body.difficulty,
    tags: req.body.tags,
    createdBy: req.body.createdBy,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/questions/:id - Update an existing question
app.put("/api/questions/:id", async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }   
});

// DELETE /api/questions/:id - Delete a question
app.delete("/api/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the question" });
  }
});



// ***********************************************************


// Routes

app.get("/api/assessments", async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/assessments", async (req, res) => {
  const { title, type, date, analytics } = req.body;
  const assessment = new Assessment({ title, type, date, analytics });

  try {
    const newAssessment = await assessment.save();
    res.status(201).json(newAssessment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
