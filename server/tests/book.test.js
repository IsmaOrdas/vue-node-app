const request = require('supertest');
const app = require('../src/app');
const Book = require('../src/models/books');
const { userOneId, userOne, userTwo, userTwoId, bookOne, bookTwo, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create book for user', async () => {
  const response = await request(app)
    .post('/books')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      title: 'From the test',
      author: 'yo',
      owner: userOne._id,

    })
    .expect(201)

  const book = await Book.findById(response.body._id);
  expect(book).not.toBeNull();
})

test('Should get books of logged user', async () => {
  const response = await request(app)
    .get('/books')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toEqual(1);
})

test('Should not delete book that user does not own', async () => {
  const response = await request(app)
    .delete(`/books/${bookOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

  const book = await Book.findById(bookOne._id);
  expect(book).not.toBeNull();
})