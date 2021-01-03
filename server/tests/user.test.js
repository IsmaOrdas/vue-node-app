const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/users');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should signup a new user', async () => {
  const response = await request(app).post('/users').send({
    username: 'Nuevo',
    password: 'probando'
  }).expect(201)

  // Assert the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull();

  // Assert the password was encrypted
  expect(user.password).not.toBe('probando')
})

test('Should not signup user with wrong password', async () => {
  const response = await request(app).post('/users').send({
    username: 'Nuevo',
    password: 'pro'
  }).expect(400)
})

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    username: userOne.username,
    password: userOne.password
  }).expect(200)

  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
  await request(app).post('/users/login').send({
    username: userOne.username,
    password: '123123fdasfasdf'
  }).expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete user account', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  // Assert user does not exist
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
})

test('Should not delete user account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should not update user if not authenticated', async () => {
  await request(app)
    .patch('/users/me')
    .send({
      username: 'Miguel'
    })
    .expect(401)
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      username: 'Miguel'
    })
    .expect(200)

  const user = await User.findById(userOneId);
  expect(user.username).toEqual('Miguel')
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      age: 30
    })
    .expect(400)
})