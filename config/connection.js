// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "root",
  database: "saved_receipesDB"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;