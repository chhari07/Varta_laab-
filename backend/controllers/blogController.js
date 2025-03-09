const Blog = require("../models/Blog");

// Fetch all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const blog = new Blog({ title, content, author, image: imagePath });
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Like a blog
const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.likes += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Comment on a blog
const commentBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.comments.push(comment);
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllBlogs, createBlog, likeBlog, commentBlog };
