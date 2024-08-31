// const express = require("express");
import express from "express";
import Assessment from "../model/assessment.models.js"; // Make sure the path to the model is correct

const router = express.Router();

// GET all assessments
router.get("/api/assessments", async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new assessment
router.post("/api/assessments", async (req, res) => {
  const { title, type, date, analytics } = req.body;
  const assessment = new Assessment({ title, type, date, analytics });

  try {
    const newAssessment = await assessment.save();
    res.status(201).json(newAssessment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
