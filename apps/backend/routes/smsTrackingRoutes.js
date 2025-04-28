const express = require("express");
const router = express.Router();
const {
  getAllSmsRecords,
  getSmsStatistics,
} = require("../controllers/smsTrackingController");

// Get all SMS records with pagination
router.get("/records", getAllSmsRecords);

// Get SMS statistics
router.get("/statistics", getSmsStatistics);

module.exports = router;
