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
  const hashedPassword = hashPassword(password); // Hash 4x

  const insertQuery = `
      INSERT INTO dbo.users (username, password)
      VALUES ('${username}', '${hashedPassword}')
    `;

  DBconnect(insertQuery)
    .then(() => {
      res.status(200).send("User data inserted into the database");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error inserting user data into the database");
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
