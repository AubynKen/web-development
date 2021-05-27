// const express = require("express");
// const app = express();
// const path = require("Path");

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.get("*", (_, res) => {
//     res.render("home");
// });

// app.listen(3000, $ => {
//     console.log("Server up and running");
// });
const express = require('express');
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const data = require("./data.json");

app.use(express.static(path.join(__dirname, 'public')));

app.get("/cats", (req, res) => {
    const cats = [
        "Jack",
        "Janny",
        "Jonhson",
        "Jimmy",
        "Jennedahl"
    ];
    res.render("home", {
        cats
    });
});

app.get("/matcher/:boyname/:girlname", (req, res) => {
    const matchRate = Math.floor(Math.random() * 100) + 1;
    const {
        boyName,
        girlName
    } = req.params;
    res.render("matcher", {
        boyName,
        girlName,
        matchRate
    });
});

app.get("/r/:subreddit", (req, res) => {
    const {
        subreddit
    } = req.params;
    const subRedditData = data[subreddit];
    if (!subRedditData) {
        res.render("subRedditNotFound", {
            subreddit
        });
    } else {
        res.render("subReddit", subRedditData);
    }
});

app.listen(3000);