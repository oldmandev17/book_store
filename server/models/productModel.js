const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the product name.'],
  },
  slug: {
    type: String,
    required: [true, 'Please enter the product slug.'],
    lowercase: [true, 'The product slug must be lowercase.'],
    unique: [true, 'The product slug must be unique.'],
  },
  description: {
    type: String,
    required: [true, 'Please enter the product description.'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter the product price.'],
  },
  discount: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: [true, 'Please enter the remaining product quantity'],
  },
  sold: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: [true, 'Please enter the product status.'],
    enum: {
      values: ['active', 'inactive'],
      message: 'Please select the correct status for this product.',
    },
  },
  featured: {
    type: String,
    required: [true, 'Please enter the product featured.'],
    enum: {
      values: ['featured', 'featureless'],
      message: 'Please select the correct featured for this product.',
    },
  },
  imageItems: [
    {
      url: {
        type: String,
        required: [true, 'Please enter the product image url.'],
      },
    },
  ],
  reviewItems: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: ['Please select the user who created this review.'],
      },
      content: {
        type: String,
        required: [true, 'Please enter the content for this review.'],
      },
      imageReviewItems: [
        {
          url: {
            type: String,
            required: [true, 'Please enter the image for this review.'],
          },
        },
      ],
      rating: {
        type: Number,
        default: 5,
        required: [true, 'Please enter the rating for this review.'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
        required: [true, 'Please select a time to create this review.'],
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: [true, 'Please select the category for this product.'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    required: [true, 'Please select the author for this product.'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [
      true,
      'Please select the administrator who created this product.',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Please select a time to create this product.'],
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('product', productSchema);
