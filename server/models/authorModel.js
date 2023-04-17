const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the author's name."],
  },
  introduction: {
    type: String,
    required: [true, "Please enter the author's introduction."],
  },
  slug: {
    type: String,
    required: [true, "Please enter the author's slug."],
    lowercase: [true, "The author's slug must be lowercase."],
    unique: [true, "The author's slug must be unique."],
  },
  image: {
    type: String,
    required: [true, "Please select the author's image."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Please select the administrator who created this author.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "Please select a time to create this author."]
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('author', authorSchema);
