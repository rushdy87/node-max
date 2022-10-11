const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
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
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCard = {
    items: updatedCardItems,
  };
  this.cart = updatedCard;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCardItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart = updatedCardItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = model('User', userSchema);
