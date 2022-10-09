const { Schema, model } = require('mongoose');

productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', //refrence to User model
    required: true,
  },
});

module.exports = model('Product', productSchema);
