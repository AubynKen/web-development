const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
