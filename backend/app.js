var express = require('express');
var bodyParser = require('body-parser');
var Riak = require('basho-riak-client');
var assert = require('assert');

var bucket = 'contributors'

//construct express "application"
var app = express();

//connect to riak DB
var client = new Riak.Client(['127.0.0.1:8087'], function(err,c){
	if(err){
		console.log(err)
		process.exit()
	}
});

//check if node is available
client.ping(function (err, rslt) {
      if (err) {
          console.log(err)
	  process.exit()
      } else {
          // On success, ping returns true
          assert(rslt === true);
          console.log("connected to Riak node")
      }
});

// parse application/json
app.use(bodyParser.json());

// error handling
app.use(function(err, req, res, next) {
    console.log("POST error handling")
    console.error(err.stack);
    res.status(500).send()
    next();
});


//create a new data set
app.post('/newDataSet', function (req, res, next) {
	console.log("POST /newDataSet")

	var data = req.body   	
	
	client.storeValue({
                bucket: bucket,
                key: data.key,
                value: data
            },
	function(err, rslt) {
		if(err){
					console.log("error: " + err)
				}
		}
	);
    console.log("inserted: " + JSON.stringify(data) + " into bucket " + bucket)			
    res.status(201).send()
    next();
});

//get all keys of a bucket
app.get('/getAllKeys', function (req, res, next) {
    console.log("GET /getAllKeys")
	
    client.listKeys({bucket: bucket},
	    function (err, rslt) {
		if (err) {
		    console.log("error: " + err);
		    res.status(404).send()			
		} else {
		    console.log(rslt)
		}
	    }
	);
     next();
});

//get one data set by key
app.get('/getDataSet', function (req, res, next) {
    console.log("GET /getDataSet")	
   	
    client.fetchValue({ bucket: bucket, key: '123', convertToJs: true},
	    function (err, rslt) {
		if (err) {
		    console.log("error: " + err);
		    res.status(404).send()			
		} else {
		    res.send(rslt.values.shift().value)
		}
	    }
	);

});


//start express server (application) on port 3000 and log announce to console
var server = app.listen(3000, function () {
    console.log('Express App listening at http://localhost:3000');
});

