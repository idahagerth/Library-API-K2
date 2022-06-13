const express = require("express");
const { check, param } = require("express-validator");
const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

booksRouter.get("/books", booksController.getAllBooks);

booksRouter.get(
  "/books/:id",
  [param("id", "Id has to be a number!").isInt()],
  booksController.getOneBook
);

booksRouter.post(
  "/books",
  [
    check("title", "Title must be at least one character in length")
      .not()
      .isEmpty(),
    check("title", "Title must be a string!").isString(),
    check("author", "Author must be at least one character in length")
      .not()
      .isEmpty(),
    check("author", "Author must be a string!").isString(),
    check("genre", "Genre must be at least one character in length")
      .not()
      .isEmpty(),
    check("genre", "Genre must be a string!").isString(),
  ],
  booksController.addNewBook
);

booksRouter.put(
  "/books/:id",
  [
    check("title", "Title must be at least one character in length")
      .not()
      .isEmpty(),
    check("title", "Title must be a string!").isString(),
    check("author", "Author must be at least one character in length")
      .not()
      .isEmpty(),
    check("author", "Author must be a string!").isString(),
    check("genre", "Genre must be at least one character in length")
      .not()
      .isEmpty(),
    check("genre", "Genre must be a string!").isString(),
    param("id", "Id has to be a number!").isInt(),
  ],
  booksController.editBook
);

booksRouter.patch(
  "/books/:id",
  [
    check("title", "Title must be at least one character in length")
      .not()
      .isEmpty()
      .optional(),
    check("title", "Title must be a string!").isString().optional(),
    check("author", "Author must be at least one character in length")
      .not()
      .isEmpty()
      .optional(),
    check("author", "Author must be a string!").isString().optional(),
    check("genre", "Genre must be at least one character in length")
      .not()
      .isEmpty()
      .optional(),
    check("genre", "Genre must be a string!").isString().optional(),
    param("id", "Id has to be a number!").isInt(),
  ],
  booksController.updateGenre
);

booksRouter.delete(
  "/books/:id",
  [param("id", "Id has to be a number!").isInt()],
  booksController.deleteBook
);

module.exports = booksRouter;
