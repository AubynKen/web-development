const express = require('express');

const app = express();
app.use(express.urlencoded({extended: true}));

const https = require("https");

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const cityName = req.body.cityName;
    const unitSystem = "metric";
    const appid = "9963341826cb551bd6d753b81dc65bed";

    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName + "&appid=" + appid + "&units=" + unitSystem;
    https.get(weatherUrl, function (result) {

    })
})

// app.get("/", function (req, res) {
//     // res.send("Connection successful.");
//     res.write("<head><meta charset='UTF-8'></head>");

//     const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=9963341826cb551bd6d753b81dc65bed";
//     https.get(weatherUrl, function (result) {
//         result.on("data", function (data) {
//             var dataParsed = JSON.parse(data);
//             console.log(dataParsed);;

//             const weatherIcon = dataParsed.weather[0].icon;

//             res.write(
//                 `Weather descriptioin: ${dataParsed.weather[0].description}<br>
//                 Temperature in Kelvin: ${dataParsed.main.temp}`);
//             res.write(`<img src=http://openweathermap.org/img/wn/${weatherIcon}@2x.png>`);
//             res.send();
//         })
//     })
// })


app.listen(3000, function () {
    console.log("Server now running on port 3000.");
})