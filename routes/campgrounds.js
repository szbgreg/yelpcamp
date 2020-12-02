const express = require('express');
const router = express.Router();
const campgroundsController = require('../controllers/campgroundsController');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.get('/', catchAsync(campgroundsController.index));

router.get('/new', isLoggedIn, campgroundsController.renderNewForm);

router.post(
  '/',
  isLoggedIn,
  validateCampground,
  catchAsync(campgroundsController.createCampground)
);

router.get('/:id', catchAsync(campgroundsController.showCampground));

router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundsController.renderEditForm)
);

router.put(
  '/:id',
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgroundsController.updateCampground)
);

router.delete(
  '/:id',
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundsController.deleteCampground)
);

module.exports = router;
