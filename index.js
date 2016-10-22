'use strict';

var express = require('express');
var multer = require('multer');
var path = require('path');
var PORT = process.env.PORT || 8000;

var app = express();

app.get('/', function (req, res) {
    console.log('Homepage hit...');
    res.sendFile(path.join(__dirname, './index.html'));
});

// Resume UPLOADS
app.post('/resume_submit', function (req, res) {
    console.log('Resume submission received...');
});

app.listen(PORT, function () {
    console.log('App started on port ' + PORT + '...');
});
