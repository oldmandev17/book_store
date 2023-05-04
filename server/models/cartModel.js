const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'Please select the product for this cart.'],
      },
      name: {
        type: String,
        required: [true, 'Please enter the product name.'],
      },
      image: {
        type: String,
        required: [true, 'Please enter the product image.'],
      },
      quantity: {
        type: Number,
        default: 1,
        required: [true, 'Please enter the product quantity.'],
      },
      price: {
        type: Number,
        required: [true, 'Please enter the product price.'],
      },
      discount: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        required: [
          true,
          'Please select a time to add this product to the cart.',
        ],
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Please select the user who created the cart.'],
  },
});

module.exports = mongoose.model('cart', cartSchema);
