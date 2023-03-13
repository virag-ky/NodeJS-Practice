const { MongoClient } = require('mongodb');
let dbConnection;

module.exports = {
  // connect to the database and pass in a callback function that we want to call right after connection or after the error
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/bookstore')
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  // return the db connection object
  getDb: () => dbConnection,
};
