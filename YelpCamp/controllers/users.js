const User = require("../models/user.js");

module.exports.redirectToCampgrounds = (req, res) => {
    res.redirect("/campgrounds");
};

module.exports.renderRegister = (req, res) => {
    res.render("users/register");
};

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.register({ email, username }, password);
        req.login(user, (err) => {
            if (err) return next(err);
            req.flash("success", "Your account has been registered");
            res.redirect("/campgrounds");
        });
    } catch (err) {
        console.dir(err);
        const msg = err.message;
        req.flash("error", msg);
        res.redirect("/register");
    }
};

module.exports.login = (req, res) => {
    req.flash("success", "Login successful");
    const originalUrl = req.session.originalUrl || "/campgrounds";
    delete req.session.originalUrl;
    res.redirect(originalUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "You have logged out");
    res.redirect("/campgrounds");
};
