// Joi schemas for request body validation
const joi = require("joi");

module.exports.campgroundSchema = joi.object({
    campground: joi
        .object({
            title: joi.string().required(),
            location: joi.string().required(),
            price: joi.number().min(0).required(),
            // images: joi.string().required(),
            description: joi.string().required(),
        })
        .required(),
    deletedImages: joi.array(),
});
