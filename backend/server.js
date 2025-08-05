const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Require db to check connection
const db = require("./db");

// ✅ Route files
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Check DB connection
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ MySQL database connected successfully");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();
