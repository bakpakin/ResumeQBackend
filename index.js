'use strict';

var nedb = require('nedb');
var express = require('express');
var multer = require('multer');
var uploads = multer({dest: 'uploads/'});
var uuid = require('node-uuid');
var path = require('path');
var fs = require('fs');
var PORT = process.env.PORT || 8000;
var mkdirp = require('mkdirp');
var bodyParser = require('body-parser');

var db = new nedb({ filename: './datafile', autoload: true });
db.loadDatabase();
var app = express();
app.use(bodyParser.json());

mkdirp.sync('./collections');

app.use('/static', express.static(path.join(__dirname, 'static')));

// Main page
app.get('/', function (req, res) {
    console.log('Homepage hit...');
    res.sendFile(path.join(__dirname, './pages/index.html'));
});

// Successful upload page
app.get('/qrcode/:id', function (req, res) {
    console.log('Qrcode page hit...');
    res.sendFile(path.join(__dirname, './pages/uploaded.html'));
});

// Resume UPLOADS
app.post('/resume_submit', function (req, res, next) {
    console.log('Resume submission received...');
    return next();
}, uploads.single('resume'), function (req, res) {
    // Here the file has been uploaded.
    console.log(req.body); //form fields
    console.log(req.file); //form files
    res.redirect('/qrcode/' + req.file.filename);
});

app.get('/resume/test.pdf', function (req, res) {
    res.type('application/pdf');
    res.sendFile(path.join(__dirname, './test.pdf'));
});

app.post('/makecollection', function (req, res) {
    var id = uuid.v4()
    db.insert({
        id: id,
        data: req.body // LOL - but hackathon.
    });
});

app.get('/getcollection/:id', function (req, res) {
    var id = req.params.id;
    db.find({
        id: id
    }, function (err, docs) {
        if (err) {
            res.send({
                success: false,
                error: err
            });
        } else {
            res.send({
                success: true,
                results: docs
            });
        }
    });
});

app.get('/resume/:id', function (req, res) {
    var id = req.params.id;
    id = id.replace(/\.[^/.]+$/, ""); // strip file extensions. Everything is a pdf.
    console.log('Resume "' + id + '" requested.');
    fs.stat(path.join(__dirname, './uploads/' + id), function(err, data) {
        if(err == null) {
            res.type('application/pdf');
            res.sendFile(path.join(__dirname, './uploads/' + id));
        } else if(err.code == 'ENOENT') {
            // file does not exist
            res.status(404).send();
        } else {
            console.log('Some other error: ', err.code);
            res.status(500).send();
        }
    });
});

app.listen(PORT, function () {
    console.log('App started on port ' + PORT + '...');
});
