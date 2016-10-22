'use strict';

var express = require('express');
var PORT = process.env.PORT || 8000;

var app = express();

app.get('/', function (req, res) {
    res.send('Hello, Heroku!');
});

app.listen(PORT, function () {
    console.log('App started on port ' + port + '...');
});
