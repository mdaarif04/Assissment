import express from 'express'
const router = express.Router();
const Tag = require("../models/Tag.js");

// GET /api/tags - Retrieve all tags
router.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tags - Create a new tag
router.post("/tags", async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/tags/:id - Retrieve a specific tag by ID
router.get("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tags/:id - Update a specific tag by ID
router.put("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/tags/:id - Delete a specific tag by ID
router.delete("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
