// Dependencies
var express = require('express');
var app = express();
var request = require('request');
var port = 3000;

// View renderer
app.set("view engine", "ejs");

// Routes
app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => { 
    var query = req.query.position
    var location = req.query.location
    request("https://duunitori.fi/api/v1/jobentries?search="+query+ "&area=" + location+"&sho=1&format=json", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            //res.send(data["results"][0]);
            res.render('results', {data: data});
        }
    });
});

// Server 
app.listen(process.env.PORT || port, () => {
    console.log("Server running on port: " + port);
});