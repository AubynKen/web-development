const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");
// const ExpressError = require("../utils/ExpressError.js");
// const joi = require("joi");
// const flash = require("connect-flash");
// router.use(flash());

router.get("/", users.redirectToCampgrounds);

router
    .route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router
    .route("/login")
    .get((req, res) => {
        res.render("users/login");
    })
    .post(
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        users.login
    );

router.get("/logout", users.logout);

module.exports = router;
