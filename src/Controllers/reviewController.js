const { DBconnect } = require("../models/DBconnect.js");

function createReviewInDatabase(req, res) {
  const { username, juiceName, stars, review } = req.body;

  // Execute SQL query to insert review data into the database
  const insertQuery = `
      INSERT INTO dbo.reviews (username, juice_name, stars, review_text)
      VALUES ('${username}', '${juiceName}', ${stars}, '${review}')
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
function getReviewFromDatabase(req, res) {
  // Execute SQL query to select reviews from the database
  const selectQuery = `SELECT * FROM dbo.reviews`;

  DBconnect(selectQuery)
    .then((result) => {
      // On success
      const resultArray = Object.values(result);
      res.setHeader("Content-Type", "application/json"); // Set Content-Type header
      res.status(200).json(resultArray);
    })
    .catch((error) => {
      // On error
      console.error(error);
      res.status(500).send("Error retrieving reviews from the database");
    });
}

module.exports = {
  createReviewInDatabase,
  getReviewFromDatabase,
};
