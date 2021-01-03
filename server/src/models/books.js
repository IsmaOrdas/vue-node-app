const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  read: {
    type: Boolean,
    required: false,
    default: false
  }
},
{
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;