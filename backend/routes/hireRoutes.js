const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const EventManager = require("../models/EventManager");

// GET /api/event-manager
// Fetch all event managers with optional filters: purpose, location
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { purpose, location } = req.query;

    let query = {};

    if (purpose) {
      query.eventTypes = { $regex: new RegExp(purpose, "i") }; // case-insensitive match
    }

    if (location) {
      query.location = { $regex: new RegExp(location, "i") }; // case-insensitive match
    }

    const managers = await EventManager.find(query).select("-password"); // remove sensitive info
    res.status(200).json(managers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
