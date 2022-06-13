const { validationResult } = require("express-validator");
const db = require("../models/books.model");
const dataBas = require("../models/books.model");

function getAllBooks(req, res) {
  const sql = "SELECT * FROM library";
  let params;
  dataBas.all(sql, params, (error, data) => {
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.json(data);
  });
}

function getOneBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0] });
  }

  const sql = `SELECT * FROM library WHERE id = ${req.params.id}`;
  let params;
  dataBas.all(sql, params, (error, data) => {
    if (data[0]) {
      if (error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.json(data[0]);
    } else {
      res.status(404).json({
      status: "error",
    message:`The book with id ${req.params.id} could not be found` });
      return;
    }
  });
}

function addNewBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0] });
  }
  
  let {title, author, genre} = req.body
  let params
  const insert = "INSERT INTO library (title, author, genre) VALUES (?, ?, ?)";
  db.run(insert, [`${title}`, `${author}`, `${genre}`]);
  let sql = `SELECT * FROM library WHERE title LIKE "${title}" AND author LIKE "${author}" AND genre LIKE "${genre}"`
  dataBas.all(sql, params,(err,data) => {
      if(err) {
          res.status(400).json({error:err.message})
          return; 
      }
      res.statusCode = 201;
      res.json(data[0]);
  })
}

function editBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0] });
  }
  let pTitle = req.body.title;
  let pAuthor = req.body.author;
  let pGenre = req.body.genre;

  const update = `UPDATE library SET title=?, author=?, genre=? WHERE id = ${req.params.id}`;
  db.run(update, [`${pTitle}`, `${pAuthor}`, `${pGenre}`]);
  res.statusCode = 201;
  res.end();
}

function updateGenre(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0] });
  }
  let sql = `SELECT * FROM library WHERE id = ${req.params.id} `;
  let params;
  let dbObject;
  let { title, author, genre } = req.body;

  db.all(sql, params, (error, data) => {
    if (data[0]) {
      if (error) {
        res.status(400).json({ error: error.message });
        return;
      }
      dbObject = data[0];

      if (title) {
        dbObject.title = title;
      }
      if (author) {
        dbObject.author = author;
      }
      if (genre) {
        dbObject.genre = genre;
      }

      const patch = `UPDATE library SET title=?, author=?, genre=? WHERE id = ${req.params.id}`;
      db.run(patch, [
        `${dbObject.title}`,
        `${dbObject.author}`,
        `${dbObject.genre}`,
      ]);
      res.statusCode = 200;
      res.end();
    } else {
      res.status(404).json({ error: `id ${req.params.id} Does not exist` });
      return;
    }
  });
}

function deleteBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0] });
  }
  const sql = `SELECT * FROM library WHERE id = ${req.params.id}`;
  let params;
  dataBas.all(sql, params, (error, data) => {
    if (data[0]) {
      const remove = `DELETE FROM library WHERE id = ${req.params.id}`;
      db.run(remove);
      res.status(200).json({info: `book id ${req.params.id} Has been deleted`})
    } else {
      res.status(404).json({ error: `id ${req.params.id} Does not exist` });
      return;
    }
  });
}

module.exports = {
  getAllBooks,
  getOneBook,
  addNewBook,
  editBook,
  updateGenre,
  deleteBook,
};
