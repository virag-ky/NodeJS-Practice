const express = require('express');
const { ObjectId } = require('mongodb');
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

app.get('/books/:id', (req, res) => {
  const id = new ObjectId(req.params.id);

  db.collection('books')
    .findOne({ _id: id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not find the document' });
    });
});
