const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/todo.db');

db.serialize(function () {
  db.each("SELECT * FROM todo", function (err, row) {
    console.log(row);
  });
});

db.close();