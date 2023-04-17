const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the category name.'],
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    required: [true, 'Please enter the category slug.'],
    lowercase: [true, 'The category slug must be lowercase.'],
    unique: [true, 'The category slug must be unique.'],
  },
  image: {
    type: String,
    required: [true, 'Please select the category image.'],
  },
  status: {
    type: String,
    required: [true, 'Please select the status for this category.'],
    enum: {
      values: ['active', 'inactive'],
      message: 'Please select the correct status for this category.',
    },
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'parentCategory',
    required: [true, 'Please select the parent category for this category.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Please select a time to create this category.'],
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('category', categorySchema);
