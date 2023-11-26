const express = require("express");
const usersController = require("../Controllers/usersController.js");
const router = express.Router();

router.post("/", usersController.createUserInDatabase);
router.get("/", usersController.getUsersFromDatabase);
module.exports = router;
