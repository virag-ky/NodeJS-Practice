const express = require('express');
const { connectToDb, getDb } = require('./db');

// initialize the app by invoking the express function
const app = express();

// db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000');
    });
    // returns the db connection object
    db = getDb();
  }
});

// routes
app.get('/books', (req, res) => {
  const books = [];
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});
