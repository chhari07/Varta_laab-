const express = require("express");
const { createBlog, getAllBlogs, likeBlog, commentBlog } = require("../controllers/blogController");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Existing routes
router.get("/", getAllBlogs);
router.post("/", upload.single("image"), createBlog);

// New routes
router.post("/:id/like", likeBlog);
router.post("/:id/comment", commentBlog);

module.exports = router;
