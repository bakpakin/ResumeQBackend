'use strict';

var express = require('express');
var multer = require('multer');
var uploads = multer({dest: 'uploads/'});
var uuid = require ('node-uuid');
var path = require('path');
var PORT = process.env.PORT || 8000;

var app = express();

app.get('/', function (req, res) {
    console.log('Homepage hit...');
    res.sendFile(path.join(__dirname, './index.html'));
});

// Resume UPLOADS
app.post('/resume_submit', function (req, res, next) {
    console.log('Resume submission received...');
    return next();
}, uploads.single('resume'), function (req, res) {
    // Here the file has been uploaded.
    console.log(req.body); //form fields
    console.log(req.file); //form files
	res.status(204).end();
});

app.get('/resume/:id', function (req, res) {
    var id = req.params.id;
    console.log('Resume "' + id + '" requested.');
    res.send({
        id: id,
        success: true,
        data: 'LOL'
    });
});

app.listen(PORT, function () {
    console.log('App started on port ' + PORT + '...');
});
