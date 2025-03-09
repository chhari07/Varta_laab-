const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");

const router = express.Router();

// Routes for user profile
router.get("/:email", getUserProfile); // Get user profile by email
router.put("/:email", updateUserProfile); // Update user profile by email

module.exports = router;
