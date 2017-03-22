var express = require('express');
var bodyParser = require('body-parser');
var Riak = require('basho-riak-client');

//construct express "application"
var app = express();

//connect to riak DB
var client = new Riak.Client(['127.0.0.1:8089']);

// parse application/json
app.use(bodyParser.json());

// error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('failed');
    next();
});


//define POST response for route "/students"
app.post('/newDataSet', function (req, res, next) {
    // console.log(JSON.stringify(req.body, null, 2));         //only for test
    students.push(new Student(req.body.firstName, req.body.lastName, req.body.matrikelNr));
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("successfull");
    next();
});

//define GET response for route "/students/:lastname"
app.get('/getAllDataSets', function (req, res, next) {
    res.send(students.filter(function (student) {
        return student.lastName === req.params.lastname;
    }));
    next();
});

//start express server (application) on port 3000 and log announce to console
var server = app.listen(3000, function () {
    console.log('Express App listening at http://localhost:3000');
});