const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const {
    campgroundValidation,
    checkLogin,
    checkIsAuthor,
} = require("../middlewares");

/*==== cloud storage ====*/
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
/*==== ====*/

router
    .route("/")
    .get(campgrounds.renderIndex)
    .post(
        checkLogin,
        upload.array("images"),
        campgroundValidation,
        catchAsync(campgrounds.postCampground)
    );

router.get("/new", checkLogin, campgrounds.renderNewForm);

router
    .route("/:id")
    .get(catchAsync(campgrounds.getCampground))
    .put(
        checkLogin,
        checkIsAuthor,
        upload.array("images"),
        campgroundValidation,
        catchAsync(campgrounds.updateCampground)
    )
    .delete(
        checkLogin,
        checkIsAuthor,
        catchAsync(campgrounds.deleteCampground)
    );

router.get("/:id/edit", checkLogin, checkIsAuthor, campgrounds.renderEditForm);

module.exports = router;
