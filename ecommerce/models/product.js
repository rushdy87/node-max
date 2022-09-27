const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: null,
  },
});

module.exports = Product;

// const db = require('../util/database');

// const Cart = require('./cart');

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)',
//       [this.title, this.imageUrl, this.description, this.price]
//     );
//   }

//   static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?', id);
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products');
//   }

//   static deleteById(id) {}
// };
