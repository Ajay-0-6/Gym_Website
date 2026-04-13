const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
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

// Save Form Data
app.post("/api/join", async (req, res) => {
  try {
    const user = new Join(req.body);
    await user.save();

    console.log("Saved:", user);

    res.json({ message: "Form submitted and saved!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving data" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});