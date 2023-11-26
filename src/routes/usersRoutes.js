const express = require("express");
const usersController = require("/Users/Lukas/Documents/løsning/src/Controllers/usersController.js");
const router = express.Router();

router.post("/", usersController.createUserInDatabase);
router.get("/", usersController.getUsersFromDatabase);
module.exports = router;
