const express = require('express');

const gachaRoutes = require('./components/gacha/gacha-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  gachaRoutes(app);

  return app;
};
