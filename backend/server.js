const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const morgan = require("morgan"); // ✅ Logs requests
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const questionRoutes = require("./routes/questionRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables before connecting to DB
dotenv.config();
connectDB();

const app = express();

// Ensure "uploads" directory exists
const uploadsDir = path.resolve(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev")); // ✅ Logs incoming requests

// CORS Configuration to Allow Cookies
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true, // ✅ Required for cookies
  })
);

// Allow Credentials in Responses & Handle Preflight Requests
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Static file serving for uploads
app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/questions", questionRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the API!");
});

// 404 Not Found Middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", process.env.NODE_ENV === "development" ? err.stack : err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
