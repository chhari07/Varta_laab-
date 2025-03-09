const User = require("../models/User");

// Get user profile by email
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile by email
const updateUserProfile = async (req, res) => {
  try {
    const { displayName, photoURL } = req.body;

    const user = await User.findOneAndUpdate(
      { email: req.params.email }, // Find by email
      { displayName, photoURL }, // Update fields
      { new: true, runValidators: true } // Return updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile };
