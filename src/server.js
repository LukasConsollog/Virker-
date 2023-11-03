const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const path = require("path");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

// Handle requests for the root URL
app.get("/", (req, res) => {
  res.sendFile("pages/home.html", { root: path.join(__dirname, "../client") });
});

// Endpoint to handle review submission
const juices = [
  // ... (your juice objects)
];
app.post("/submitreview", (req, res) => {
  const { username, juiceName, stars, review } = req.body;
  console.log("Received review submission:", {
    username,
    juiceName,
    stars,
    review,
  });
  // Find the corresponding juice by name
  const juice = juices.find((juice) => juice.name === juiceName);

  if (!juice) {
    return res.status(404).json({ error: "Juice not found" });
  }

  // Add the review to the juice object
  juice.reviews.push({
    username,
    stars,
    review,
  });

  res.json({ message: "Review submitted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
