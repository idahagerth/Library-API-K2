const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sql/dataBas.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  console.log("Ansluten till databas");

  const sqlStatement = `CREATE TABLE library
    ( id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, 
      author TEXT,
      genre TEXT 
      )`;

    db.run(sqlStatement, (error) => {
    if (error) {
      console.log("Table library already exists,continuing");
      return;
    }

    const insert = "INSERT INTO library (title, author,genre) VALUES (?, ?, ?)";
    db.run(insert, [
      "The Lord of the Rings",
      "J. R. R. Tolkien",
      "fantasy",
    ]);
    db.run(insert, ["Frankenstein", "Mary Shelley", "Gothic fiction"]);
    db.run(insert, ["The Light House", "Edgar Allan Poe", "Horror"]);
    db.run(insert, ["Dracul", "Dacre Stoker, J. D. Barker", "Horror"]);
  });
});

module.exports = db;