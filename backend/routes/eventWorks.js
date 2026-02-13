const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const EventWork = require('../models/EventWorkModel');

// Get all works for logged-in event manager
router.get('/', authMiddleware, async (req, res) => {
  try {
    const works = await EventWork.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new work
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { category, title, description, images } = req.body;

    if (!category || !title) {
      return res.status(400).json({ message: "Category and Title are required" });
    }

    const newWork = new EventWork({
      userId: req.user.id,
      category,
      title,
      description,
      images: images || [],
    });

    await newWork.save();
    res.status(201).json({ message: "Work added successfully", data: newWork });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update existing work
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const workId = req.params.id;
    const { category, title, description, images } = req.body;

    const work = await EventWork.findOne({ _id: workId, userId: req.user.id });
    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    work.category = category || work.category;
    work.title = title || work.title;
    work.description = description || work.description;
    work.images = images || work.images;

    await work.save();
    res.json({ message: "Work updated", data: work });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete work
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const workId = req.params.id;

    const work = await EventWork.findOneAndDelete({ _id: workId, userId: req.user.id });
    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.json({ message: "Work deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
