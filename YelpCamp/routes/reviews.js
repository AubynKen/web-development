const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const flash = require("connect-flash");
const { checkLogin } = require("../middlewares");
const reviews = require("../controllers/reviews");

router.use(flash());

// Post reviews
router.post("/", checkLogin, catchAsync(reviews.post));

// Deleting reviews
router.delete("/:reviewId", checkLogin, catchAsync(reviews.delete));

module.exports = router;
