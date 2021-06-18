const ExpressError = require("./utils/ExpressError.js");
const { campgroundSchema } = require("./schemas.js");
const Campground = require("./models/campground");
const express = require("express");

// Validation of the campground schema
const campgroundValidation = (req, res, next) => {
  const joiValidation = campgroundSchema.validate(req.body);
  if (joiValidation.error) {
    const errorMsg = joiValidation.error.details.map((err) => err.message);
    throw new ExpressError(errorMsg);
  } else {
    next();
  }
};

const checkLogin = (req, res, next) => {
  if (req.isUnauthenticated()) {
    req.session.originalUrl = req.originalUrl;
    req.flash("error", "Login is required for this page.");
    return res.redirect("/login");
  }
  next();
};

const checkIsAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground || !campground.author.equals(req.user._id)) {
    req.flash("error", "You don't have permission to edit this campground.");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports = { campgroundValidation, checkLogin, checkIsAuthor };
