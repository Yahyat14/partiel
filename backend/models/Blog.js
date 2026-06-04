const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  authorName: {
    type: String,
    default: 'Admin'
  },
  image: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ['coffee', 'tips', 'events', 'news'],
    default: 'coffee'
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    email: String,
    content: String,
    approved: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);
