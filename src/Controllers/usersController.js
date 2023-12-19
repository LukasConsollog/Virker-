const { DBconnect } = require("../models/DBconnect.js");
const crypto = require("crypto");

const hashPassword = (password, iterations = 4) => {
  let hashedPassword = password;

  for (let i = 0; i < iterations; i++) {
    const hash = crypto.createHash("sha256");
    hash.update(hashedPassword, "utf-8");
    hashedPassword = hash.digest("hex");
  }

  return hashedPassword;
};

function createUserInDatabase(req, res) {
  const { username, password } = req.body;
  const hashedPassword = hashPassword(password); // Hash the password

  const insertQuery = `
      INSERT INTO dbo.users (username, password)
      VALUES ('${username}', '${hashedPassword}')
    `;

  DBconnect(insertQuery)
    .then(() => {
      res.status(200).send("User created successfully");
    })
    .catch((error) => {
      console.error(error);

      // Check if the error is due to a unique constraint violation
      if (
        error.code === "23505" ||
        error.message.includes("unique constraint")
      ) {
        res.status(400).send("A user with the given username already exists.");
      } else {
        res.status(500).send("Error creating user");
      }
    });
}

function getUsersFromDatabase(req, res) {
  // Execute SQL query henter brugere fra min database
  const selectQuery = `SELECT * FROM dbo.users`;

  DBconnect(selectQuery)
    .then((userData) => {
      // objekt til array
      // console.log(userData);
      const usersArray = Object.values(userData);

      // hvis brugerdata så godt, hvis ikke - fejl
      if (usersArray.length > 0) {
        res.status(200).json(usersArray);
      } else {
        res.status(404).send("No users found in database");
      }
    })
    .catch((error) => {
      // problem -->
      console.error(error);
      res.status(500).send("Error fetching user data from database");
    });
}

module.exports = {
  createUserInDatabase,
  getUsersFromDatabase,
};
