const express = require("express");
const reviewController = require("/Users/Lukas/Documents/løsning/src/Controllers/reviewController.js");
const router = express.Router();

router.post("/submitreview", reviewController.createReviewInDatabase);
router.get("/getreview", reviewController.getReviewFromDatabase);
module.exports = router;
