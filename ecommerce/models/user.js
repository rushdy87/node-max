const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

class User {
  constructor(userName, email, cart, id) {
    this.name = userName;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }
  addToCart(product) {
    const cartProductindex = this.cart.items.findIndex(
      (prod) => prod.productId.toString() === product._id.toString()
    );

    let newQuantity = 1;
    const updatedCardItems = [...this.cart.items];

    if (cartProductindex >= 0) {
      newQuantity = updatedCardItems[cartProductindex].quantity + 1;
      updatedCardItems[cartProductindex].quantity = newQuantity;
    } else {
      updatedCardItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCard = {
      items: updatedCardItems,
    };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCard } }
      );
  }

  getCard() {
    const db = getDb();
    const productIds = this.cart.items.map((item) => item.productId);
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((prod) => {
          return {
            ...prod,
            quantity: this.cart.items.find(
              (item) => item.productId.toString() === prod._id.toString()
            ).quantity,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  deleteItemFromCart(productId) {
    const updatedCardItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCardItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCard()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
            email: this.email,
          },
        };
        return db.collection('orders').insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch((err) => console.log(err));
  }

  getOrders() {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
