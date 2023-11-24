const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const config = require("../config.json");

// Function som returnere promis
const DBconnect = (query) => {
  return new Promise((resolve, reject) => {
    // Connection variabel
    const connection = new Connection(config);

    const request = new Request(query, function (err) {
      if (err) {
        reject(err);
      }
    });

    // Når vi connecter til databasen
    connection.on("connect", function (err) {
      if (err) {
        reject(err);
      } else {
        // info til os
        console.log("Connected to the database");

        // Execute SQL
        connection.execSql(request);
      }
    });

    // Connect
    connection.connect();

    let counter = 1;
    let response = {};

    request.on("row", function (columns) {
      response[counter] = {};
      columns.forEach(function (column) {
        response[counter][column.metadata.colName] = column.value;
      });
      counter += 1;
    });

    // Resolve når vores request er færdig
    request.on("requestCompleted", () => {
      resolve(response);
    });
  });
};
// exportering
module.exports = { DBconnect };
