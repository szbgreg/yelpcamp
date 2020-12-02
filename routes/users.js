const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router
  .route('/register')
  .get(userController.renderRegisterForm)
  .post(userController.register);

router
  .route('/login')
  .get(userController.renderLoginForm)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    userController.login
  );

router.get('/logout', userController.logout);

module.exports = router;
