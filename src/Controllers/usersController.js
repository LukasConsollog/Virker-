const {
  DBconnect,
} = require("/Users/Lukas/Documents/løsning/src/models/DBconnect.js");

function createUserInDatabase(req, res) {
  // Henter bruger data fra mit request body
  const { username, password } = req.body;
  // Sætter ind i atabase
  const insertQuery = `
      INSERT INTO dbo.users (username, password)
      VALUES ('${username}', '${password}')
    `;

  DBconnect(insertQuery)
    .then(() => {
      // On success
      res.status(200).send("Review data inserted into the database");
    })
    .catch((error) => {
      // On error
      console.error(error);
      res.status(500).send("Error inserting review data into the database");
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
