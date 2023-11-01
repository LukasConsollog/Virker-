const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5500;
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

const juices = [
  // ... (your juice objects)
];

// Endpoint to handle review submission
app.post("/submit-review", (req, res) => {
  const { username, juiceName, stars, review } = req.body;

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
