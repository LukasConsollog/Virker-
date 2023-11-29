const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const usersRoutes = require("./routes/usersRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

const path = require("path");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/", reviewRoutes);
app.use("/users", usersRoutes);
app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  console.log(
    "Serving HTML file at:",
    path.join(__dirname, "../client/pages/home.html")
  );
  res.sendFile("pages/home.html", { root: path.join(__dirname, "../client") });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
