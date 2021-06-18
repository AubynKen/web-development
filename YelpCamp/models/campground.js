const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String,
});

imageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload/", "/upload/w_350/");
});

const campgroundSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    images: [imageSchema],
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
        },
    },
    price: Number,
    description: String,
    location: String,

    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Review",
        },
    ],
});
const Campground = mongoose.model("Campground", campgroundSchema);

campgroundSchema.post("findOneAndDelete", async (doc) => {
    if (doc) {
        const reviews = doc.reviews;
        await Review.deleteMany({
            _id: { $in: reviews },
        });
    }
});

module.exports = Campground;
