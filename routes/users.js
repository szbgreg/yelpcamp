const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/register', userController.renderRegisterForm);

router.post('/register', userController.register);

router.get('/login', userController.renderLoginForm);

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  userController.login
);

router.get('/logout', userController.logout);

module.exports = router;
