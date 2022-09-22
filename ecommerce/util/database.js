const mysql = require('mysql2');

const passwords = require('../dev');

const pool = mysql.createPool({
  namedPlaceholders: true,
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: passwords.mysqlPassword,
});

module.exports = pool.promise();
