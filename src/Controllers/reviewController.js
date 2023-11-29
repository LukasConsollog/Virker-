const { DBconnect } = require("../models/DBconnect.js");

function createReviewInDatabase(req, res) {
  const { username, juiceName, stars, review } = req.body;

  // Execute SQL query indsætter review data i database
  const insertQuery = `
      INSERT INTO dbo.reviews (username, juice_name, stars, review_text)
      VALUES ('${username}', '${juiceName}', ${stars}, '${review}')
    `;

  DBconnect(insertQuery)
    .then(() => {
      // ved success
      res.status(200).send("Review data inserted into the database");
    })
    .catch((error) => {
      // ved error
      console.error(error);
      res.status(500).send("Error inserting review data into the database");
    });
}
function getReviewFromDatabase(req, res) {
  // Execute SQL query for at select reviews fra database
  const selectQuery = `SELECT * FROM dbo.reviews`;

  DBconnect(selectQuery)
    .then((result) => {
      // påp success
      const resultArray = Object.values(result);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(resultArray);
    })
    .catch((error) => {
      // på error
      console.error(error);
      res.status(500).send("Error retrieving reviews from the database");
    });
}

module.exports = {
  createReviewInDatabase,
  getReviewFromDatabase,
};
