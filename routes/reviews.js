const express = require('express');
const router = express.Router({ mergeParams: true });

const reviewController = require('../controllers/reviewsController');

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

router.post(
  '/',
  isLoggedIn,
  validateReview,
  catchAsync(reviewController.createReview)
);

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviewController.deleteReview)
);

module.exports = router;
