// const express = require('express');

// const app = express();

// app.get("/", function (request, response) {
//     response.send("<h1>What's up, this is my first server</h1>")
// })

// app.listen(3000, function () {
//     console.log("Hey");
// });

const express = require('express');
const app = express();

app.get("/", function (req, res) {
    res.send("Hey");
});

app.get("/about", function (req, res) {
    res.send("My name is pinglei");
})

app.get("/hobbies", function(req, res) {
    res.send("<ul><li>Coffee</li><li>Codding</li></ul>");
})


app.listen(3000, function (req, res) {
    console.log("Running");
})
