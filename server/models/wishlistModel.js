const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  wishItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'Please select the product for this wishlist.'],
      },
      name: {
        type: String,
        required: [true, 'Please enter the product name.'],
      },
      image: {
        type: String,
        required: [true, 'Please enter the product image.'],
      },
      price: {
        type: Number,
        required: [true, 'Please enter the product price.'],
      },
      discount: {
        type: Number,
        default: 0,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Please select the user who created the wishlist.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Please select a time to create this wishlist.'],
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('wishlist', wishlistSchema);
