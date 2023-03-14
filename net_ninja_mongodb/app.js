const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

// initialize the app by invoking the express function
const app = express();
// with this we can use any requests in our code
app.use(express.json());

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
  // current page
  const page = req.query.p || 0;
  const booksPerPage = 3;
  const books = [];
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
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

app.post('/books', (req, res) => {
  const book = req.body;

  db.collection('books')
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not create a new document' });
    });
});

app.delete('/books/:id', (req, res) => {
  const id = new ObjectId(req.params.id);

  db.collection('books')
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not delete the document' });
    });
});

app.patch('/books/:id', (req, res) => {
  const updates = req.body;

  const id = new ObjectId(req.params.id);

  db.collection('books')
    .updateOne({ _id: id }, { $set: updates })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not update the document' });
    });
});
