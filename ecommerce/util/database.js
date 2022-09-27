const { Sequelize } = require('sequelize');

const passwords = require('../dev');

const sequelize = new Sequelize(
  'node-complete',
  'root',
  passwords.mysqlPassword,
  { dialect: 'mysql', host: 'localhost' }
);

module.exports = sequelize;
