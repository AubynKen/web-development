const cities = require("./cities");
const { descriptors, places, images } = require("./seedHelpers");
const Campground = require("../models/campground");
const random = require("random");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
require("dotenv").config();
const geocoder = require("@mapbox/mapbox-sdk/services/geocoding")({
    accessToken: process.env.MAPBOX_TOKEN,
});

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/yelp-camp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Connection to MongoDB failed");
        console.log(err);
    });

function randomSample(arr) {
    const index = random.int(0, arr.length - 1);
    return arr[index];
}

const randomImages = () => {
    const res = [];
    for (let i = 0; i < random.int(1, 3); i++) {
        res.push({
            filename: "test-img",
            url: images[random.int(0, images.length - 1)],
        });
    }
    return res;
};

const seedCampgrounds = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const city = randomSample(cities);
        const descriptor = randomSample(descriptors);
        const place = randomSample(places);
        const price = random.int(19, 500);
        const images = [
            {
                url: "https://res.cloudinary.com/aubyken/image/upload/v1623939796/YelpCamp/iew8ebydytxl3tcilosx.jpg",
                filename: "YelpCamp/iew8ebydytxl3tcilosx",
            },
            {
                url: "https://res.cloudinary.com/aubyken/image/upload/v1623939796/YelpCamp/nbjxy6pr4flvr45optro.jpg",
                filename: "YelpCamp/nbjxy6pr4flvr45optro",
            },
        ];
        const description = lorem.generateSentences(random.int(1, 10));
        const author = "60c9c743b798cdee6c2183a5";
        const campground = new Campground({
            location: `${city.city}, ${city.state}`,
            title: `${descriptor} ${place}`,
            price,
            images,
            description,
            author,
        });
        const geometryData = await geocoder
            .forwardGeocode({ query: campground.location, limit: 1 })
            .send();
        campground.geometry = geometryData.body.features[0].geometry;
        await campground.save();
    }
};

seedCampgrounds()
    .then(async () => {
        console.log("Seeding finished");
        console.log(await Campground.find({}));
    })
    .then(() => {
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log("Campground seeding failed");
        console.log(err);
    });
