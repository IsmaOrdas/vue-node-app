const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const booksRouter = require('./routers/books');
const usersRouter = require('./routers/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(booksRouter);
app.use(usersRouter);

module.exports = app;