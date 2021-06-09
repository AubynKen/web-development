const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Review = require("./models/review");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const catchAsync = require("./utils/catchAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const joi = require("joi");
const { campgroundSchema } = require("./schemas.js");

mongoose
    .connect("mongodb://localhost:27017/yelp-camp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to mongoose.");
    })
    .catch((err) => {
        console.log("Connection to mongoose failed");
        console.log(err);
    });

// Validation of the campground schema
function campgroundValidation(req, res, next) {
    const joiValidation = campgroundSchema.validate(req.body);
    if (joiValidation.error) {
        const errorMsg = joiValidation.error.details.map((err) => err.message);
        throw new ExpressError(errorMsg);
    } else {
        next();
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);

app.get(
    "/campgrounds",
    catchAsync(async (req, res) => {
        const campgrounds = await Campground.find({});
        res.render("campgrounds/index", {
            campgrounds,
        });
    })
);

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.get(
    "/campgrounds/:id",
    catchAsync(async (req, res) => {
        const id = req.params.id;
        const campground = await Campground.findById(id).populate("reviews");
        res.render("campgrounds/show", {
            campground,
        });
    })
);

app.get("/campgrounds/:id/edit", async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit.ejs", {
        campground,
    });
});

app.put(
    "/campgrounds/:id",
    campgroundValidation,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndUpdate(id, req.body.campground);
        res.redirect(`/campgrounds/${id}`);
    })
);

// Add new campground
app.post(
    "/campgrounds",
    campgroundValidation,
    catchAsync(async (req, res) => {
        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

// Delete campground
app.delete(
    "/campgrounds/:id",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        res.redirect("/campgrounds");
    })
);

// Post reviews
app.post(
    "/campgrounds/:id/reviews",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const { review: reviewForm } = req.body;
        const review = new Review(reviewForm);
        const campground = await Campground.findById(id);
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        res.redirect(`/campgrounds/${id}`);
    })
);

// Delete reviews TODO: test
app.delete(
    "/campgrounds/:campgroundId/reviews/:reviewId",
    catchAsync(async (req, res) => {
        const { campgroundId, reviewId } = req.params;
        await Campground.findByIdAndUpdate(campgroundId, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/campgrounds/${campgroundId}`);
    })
);

/*=====When nothing above matched the route===========================================================================*/
app.all("*", (req, res, next) => {
    next(new ExpressError("404 Page Not Found", 404));
});

//When error catched
// TODO: Make it an actual error catching middleware
app.use((err, req, res, next) => {
    const { message = "Something went wrong", status = 500 } = err;
    res.status(status).render("error", {
        message,
    });
});
// endTodo

app.listen(3000, () => {
    console.log("Server up and running.");
});
