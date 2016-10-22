'use strict';

var express = require('express');
var multer = require('multer');
var uploads = multer({dest: 'uploads/'});
var uuid = require('node-uuid');
var path = require('path');
var fs = require('fs');
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
    fs.stat(path.join(__dirname, './uploads/' + id), function(err, res) {
        if(err == null) {
            res.type('application/pdf');
            res.sendFile(path.join(__dirname, './uploads/' + id));
        } else if(err.code == 'ENOENT') {
            // file does not exist
            res.status(404).json({
                id: id,
                success: false,
                error: 'Could not find resume.'
            });
        } else {
            console.log('Some other error: ', err.code);
        }
    });
});

app.listen(PORT, function () {
    console.log('App started on port ' + PORT + '...');
});
