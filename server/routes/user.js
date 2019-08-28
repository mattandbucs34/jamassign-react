const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


module.exports = app => {
  app.get('/users/current_user', userController.currentUser);
  app.get('/users/logout', userController.logout);

  app.post("/users/register", userController.registerUser);
};