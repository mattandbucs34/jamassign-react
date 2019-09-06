const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/current_user', userController.currentUser);
router.get('/users/register', userController.signInForm);
router.get('/users/logout', userController.logout);
router.get('/dashboard', userController.dashboard);

router.post('/users/register', userController.registerUser);
router.post('/users/sign_in', userController.signInUser);

module.exports = router;