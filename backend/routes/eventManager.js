const express = require('express');
const router = express.Router();
const EventManager = require('../models/EventManager');
const authMiddleware = require('../middleware/auth'); 

// -------------------------
// Register as Event Manager
// -------------------------
router.post('/register', authMiddleware, async (req, res) => {
  try {
    const { type, bio, experience, services, location, companyName, officeAddress } = req.body;

    if (!['individual', 'company'].includes(type)) {
      return res.status(400).json({ message: "Type must be 'individual' or 'company'" });
    }

    if (type === 'company' && (!companyName || !officeAddress)) {
      return res.status(400).json({ message: "Company name and office address are required for company type" });
    }

    const existing = await EventManager.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Already registered as Event Manager" });
    }

    const newManager = new EventManager({
      userId: req.user.id,
      type,
      bio,
      experience,
      services,
      location,
      companyName: type === 'company' ? companyName : undefined,
      officeAddress: type === 'company' ? officeAddress : undefined
    });

    await newManager.save();
    res.status(201).json({ message: "Event Manager registration submitted", data: newManager });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// -------------------------
// Check Event Manager status
// -------------------------
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const existing = await EventManager.findOne({ userId: req.user.id });
    res.json({ registered: !!existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ----------------------------------------
// GET /api/event-manager
// Fetch all Event Managers with optional filters: purpose (service) & location
// ----------------------------------------
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { purpose, location } = req.query;

    let query = {};

    if (purpose) {
      query.services = { $in: [new RegExp(purpose, 'i')] }; // case-insensitive
    }

    if (location) {
      query.location = { $regex: new RegExp(location, 'i') }; // case-insensitive
    }

    const managers = await EventManager.find(query).select('-password'); // remove sensitive info
    res.status(200).json(managers);
  } catch (err) {
    console.error("Error fetching event managers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
