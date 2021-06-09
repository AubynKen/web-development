const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Review",
        },
    ],
});

const Campground = mongoose.model("Campground", campgroundSchema);

campgroundSchema.post("findOneAndDelete", async (doc) => {
    //TODO remove log
    console.log("deleting");
    //endTodo
    if (doc) {
        const reviews = doc.reviews;
        await Review.deleteMany({
            _id: { $in: reviews },
        });
    }
});

module.exports = Campground;
