const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/users')
const Book = require('../../src/models/books');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: 'Luis',
  password: 'aslkdfjaslfk',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  username: 'Rafael',
  password: 'aslkdfjaslfk',
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
  }]
};

const bookOne = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Book One',
  author: 'Author one',
  owner: userOneId
}

const bookTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Book Two',
  author: 'Author two',
  owner: userTwoId
}

const setupDatabase = async () => {
  await User.deleteMany();
  await Book.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Book(bookOne).save();
  await new Book(bookTwo).save();
}

module.exports = {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  bookOne,
  bookTwo,
  setupDatabase
}