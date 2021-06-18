const { cloudinary } = require("../cloudinary/index");

const Campground = require("../models/campground");

const geocoder = require("@mapbox/mapbox-sdk/services/geocoding")({
    accessToken: process.env.MAPBOX_TOKEN,
});

module.exports.renderIndex = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
};

module.exports.postCampground = async (req, res) => {
    const campground = new Campground(req.body.campground);
    const geometryData = await geocoder
        .forwardGeocode({ query: req.body.campground.location, limit: 1 })
        .send();
    campground.geometry = geometryData.body.features[0].geometry;
    campground.author = req.user._id;
    campground.images = req.files.map((imgObj) => ({
        url: imgObj.path,
        filename: imgObj.filename,
    }));
    await campground.save();
    req.flash("success", "Campground created successfully");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.getCampground = async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("author");
    if (!campground) {
        req.flash("error", "Didn't find the campground you were looking for.");
        res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {
        campground,
    });
};

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
    const campground = await Campground.findByIdAndUpdate(
        id,
        req.body.campground
    );
    campground.images.push(...images);

    const geometryData = await geocoder
        .forwardGeocode({ query: req.body.campground.location, limit: 1 })
        .send();

    campground.geometry = geometryData.body.features[0].geometry;

    await campground.save();
    if (req.body.deletedImages) {
        for (imagePath of req.body.deletedImages) {
            await cloudinary.uploader.destroy(imagePath);
        }
        await campground.updateOne({
            $pull: { images: { filename: { $in: req.body.deletedImages } } },
        });
    }
    req.flash("success", "Successfully updated campground.");
    res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted campground.");
    res.redirect("/campgrounds");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit.ejs", {
        campground,
    });
};
