const Review = require("../models/review");
const Campground = require("../models/campground");

module.exports.post = async (req, res) => {
    const { campgroundId } = req.params;
    const { review: reviewForm } = req.body;
    reviewForm.author = req.user._id;
    const review = new Review(reviewForm);
    const campground = await Campground.findById(campgroundId);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Your review has been saved.");
    res.redirect(`/campgrounds/${campgroundId}`);
};

module.exports.delete = async (req, res) => {
    const { campgroundId, reviewId } = req.params;
    const review = await Review.findById(reviewId).populate("author");
    if (review.author._id.toString() !== req.user._id.toString()) {
        req.flash(
            "error",
            "You don't have the permission to delete this review."
        );
        return res.redirect(`/campgrounds/${campgroundId}`);
    }
    await Campground.findByIdAndUpdate(campgroundId, {
        $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Your review has been deleted");
    res.redirect(`/campgrounds/${campgroundId}`);
};
