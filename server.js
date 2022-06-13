const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const booksRouter = require("./routers/books.router");


app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if(err) {
        res.status(400).json({error: "Invalid request data!"})
    } else {
        next()
    }
})
app.use(cors());
app.use(booksRouter);
app.listen(4000, () => {
  console.log("Servern körs på port 4000");
});
