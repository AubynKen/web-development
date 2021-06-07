const cities = require('./cities');
const {
    descriptors,
    places
} = require('./seedHelpers');
const Campground = require('../models/campground');
const random = require('random');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Connection to MongoDB failed');
        console.log(err);
    });

function randomSample(arr) {
    const index = random.int(0, arr.length - 1);
    return arr[index];
}

const seedCampgrounds = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const city = randomSample(cities);
        const descriptor = randomSample(descriptors);
        const place = randomSample(places);
        const price = random.int(19, 500);
        const image = `http://source.unsplash.com/collection/627564`;
        const description = lorem.generateSentences(random.int(1, 10));
        const campground = new Campground({
            location: `${city.city}, ${city.state}`,
            title: `${descriptor} ${place}`,
            price,
            image,
            description,
        });
        await campground.save();
    }
}

seedCampgrounds()
    .then(async () => {
        console.log('Seeding finished');
        console.log(await Campground.find({}));
    })
    .then(() => {
        mongoose.connection.close();
    })
    .catch(err => {
        console.log('Campground seeding failed');
        console.log(err);
    });