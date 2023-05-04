const mongoose = require('mongoose');

const parentCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the parent category name.'],
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    required: [true, 'Please enter the parent category slug.'],
    lowercase: [true, 'The parent category slug must be lowercase.'],
    unique: [true, 'The parent category slug must be unique.'],
  },
  image: {
    type: String,
    required: [true, 'Please select the parent category image.'],
  },
  status: {
    type: String,
    required: [true, 'Please select the status for this parent category.'],
    default: 'active',
    enum: {
      values: ['active', 'inactive'],
      message: 'Please select the correct status for this parent category.',
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [
      true,
      'Please select the administrator who created this parent category.',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Please select a time to create this parent category.'],
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('parentCategory', parentCategorySchema);
