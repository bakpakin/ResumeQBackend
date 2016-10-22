'use strict';

var express = require('express');
var multer = require('multer');
var PORT = process.env.PORT || 8000;

var app = express();

app.get('/', function (req, res) {
    res.sendFile('./index.html');
});

app.listen(PORT, function () {
    console.log('App started on port ' + PORT + '...');
});
