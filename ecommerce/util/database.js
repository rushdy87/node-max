const mongodb = require('mongodb');

const { mongodbPassword } = require('../dev');

const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://maxNode:${mongodbPassword}@max-node.vwto5y6.mongodb.net/shop?retryWrites=true&w=majority`;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
