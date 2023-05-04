const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  wishlistItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'Please select the product for this wishlist.'],
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
});

module.exports = mongoose.model('wishlist', wishlistSchema);
