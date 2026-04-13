const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Schema
const JoinSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  plan: String,
  goal: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Join = mongoose.model("Join", JoinSchema);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Form Route
app.post("/api/join", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const user = new Join(req.body);
    const savedUser = await user.save();

    console.log("Saved:", savedUser);

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully",
    });

  } catch (error) {
    console.error("SAVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});