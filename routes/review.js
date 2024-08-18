const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Reviews = require("../models/review.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController = require("../Controllers/reviews.js");

//Reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete Review
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;