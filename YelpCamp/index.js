/* ==== Settings ==== */
const developmentMode = true;
const port = 3000;

/* ==== Express ==== */
const express = require("express");
const app = express();

/*==== Middleware and stuff ====*/
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

/*==== Useful functions ====*/
const path = require("path");
// const catchAsync = require("./utils/catchAsync.js");
const ExpressError = require("./utils/ExpressError.js");

/*==== Routers ====*/
const campgroundRoute = require("./routes/campgrounds.js");
const reviewRoute = require("./routes/reviews.js");
const userRoute = require("./routes/users.js");

/* ==== Mongoose ====*/
const mongoose = require("mongoose");
// Some default mongoose settings result in deprecation warning, the next few lines reset them.
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

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

/*==== Setting up middleware and some other settings ====*/
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(
    session({
        secret: "justsomerandomwords",
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     maxAge: expirationMs,
        //     httpOnly: true,
        // },
    })
);

// Authentication
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*==== flash alert ====*/
app.use(flash());

/*==== Request-response loop local variables ====*/
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// Routers
app.use("/", userRoute);
app.use("/campgrounds/:campgroundId/reviews", reviewRoute);
app.use("/campgrounds", campgroundRoute);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);

/*=====When nothing above matched the route===========================================================================*/
app.all("*", (req, res, next) => {
    next(new ExpressError("404 Page Not Found", 404));
});

/* ==== Renders an error page when error caught ====*/
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statusCode).render("error", { message: err });
});

app.listen(port, () => {
    console.log("Server up and running.");
});
