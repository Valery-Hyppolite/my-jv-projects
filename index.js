const express = require('express');
const https = require('https');
const { format } = require('path');
const bodyparser = require('body-parser');
config = require('./config');

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {

    const city = req.body.cityName;
    const country = req.body.countryName;
    const unit = 'metric';
    let key = config.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + key + "&units=" + unit;
    // const url = "https://api.openweathermap.org/data/2.5/weather?q=sunrise,us&appid=e9363e223b81bbf411592eff1d19641b"


    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = (JSON.parse(data))
            console.log(weatherData);

            const desc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write("<h1>The weather is currently" + desc + "</h1>");
            res.write("<h2> The temperature in " + city + " today is " + temp + " celccius  </h2>");
            res.write("<img src= " + imageUrl + ">");
            res.send();
        });
    });
})






app.listen(3000, function () {
    console.log('Server is Actively Running on prot 3000');
});

// JSON.parse() take javascript string and turn it into a javascript object or JSON format.
// JSON.stringify(object), take a json object and turn it into a string