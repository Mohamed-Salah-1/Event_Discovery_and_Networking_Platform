const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// File to store feedback
const feedbackFile = path.join(__dirname, "feedback.json");

// Initialize feedback file if it doesn't exist
if (!fs.existsSync(feedbackFile)) {
  fs.writeFileSync(feedbackFile, JSON.stringify([]));
}

// Endpoint to save feedback
app.post("/api/feedback", (req, res) => {
  const feedback = req.body;
  const existingFeedback = JSON.parse(fs.readFileSync(feedbackFile));
  existingFeedback.push(feedback);
  fs.writeFileSync(feedbackFile, JSON.stringify(existingFeedback));
  res.status(201).send("Feedback saved successfully");
});

// Endpoint to get feedback
app.get("/api/feedback", (req, res) => {
  const feedback = JSON.parse(fs.readFileSync(feedbackFile));
  res.json(feedback);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
