//jshint esversion:6

const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.post("/", function (req, res) {

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var sumOfNumbers = num1 + num2;
    res.send("Thank you for posting, \nYour result is " + sumOfNumbers + ".");
})

app.get("/BMICalculator", function (req, res) {
    res.sendFile(__dirname + "/BMICalculator.html");
})

app.post("/BMICalculator", function (req, res) {
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);
    var BMI = height / (weight * weight);
    res.send("Your BMI is " + BMI + ".");
})

app.listen(3000, function () {
    console.log("Server running");
})