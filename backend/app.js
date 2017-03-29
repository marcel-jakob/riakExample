var express = require('express')
var bodyParser = require('body-parser')
var Riak = require('basho-riak-client')
var assert = require('assert')
var cors = require('cors')

var bucket = 'contributors'

//construct express "application"
var app = express()

//connect to riak DB
var client = new Riak.Client(['127.0.0.1:8087'], function(err,c){
	if(err){
		console.log(err)
		process.exit()
	}
})

//check if node is available
client.ping(function (err, rslt) {
	if (err) {
  	console.log(err)
		process.exit()
	}
	else {
    // On success, ping returns true
    assert(rslt === true)
    console.log("connected to Riak node")
	}
})

app.use(cors())

// parse application/json
app.use(bodyParser.json())


//create a new data set (first value in JSON is used as key)
app.post('/newDataSet', function (req, res) {
	console.log("POST /newDataSet")
	var data = req.body

	client.storeValue({
	              bucket: bucket,
	              key: data[Object.keys(data)[0]],
	              value: data
	          },
		function(err, rslt) {
			if(err){
				console.log("ERROR: " + err)
			}
			else{
				console.log("inserted: " + JSON.stringify(data) + " into bucket " + bucket)
				res.status(201).send("{key: " + data[Object.keys(data)[0]] + "}")
			}
		}
	)
})


//get all keys of a bucket
app.get('/getAllKeys', function (req, res) {
	console.log("GET /getAllKeys")
	client.listKeys({ bucket: bucket, stream: false},
		function (err, rslt) {
			if (err) {
				console.log("ERROR: " + err)
			}
			else {
				res.send(rslt.keys)
			}
		}
	)
})

//get one data set by key (defined to query parameter)
app.get('/getDataSet', function (req, res) {
	console.log("GET /getDataSet")
	var key = req.query.key

	if(key){
		client.fetchValue({ bucket: bucket, key: key, convertToJs: true},
			function (err, rslt) {
				if (err) {
					console.log("ERROR: " + err);
				}
				else {
					res.send(rslt.values.shift().value)
				}
			})
		}
})

//!!!DOESN'T WORK get all data sets of a bucket
app.get('/getAllDataSets', function (req, res) {
	console.log("GET /getAllDataSets")
	client.listKeys({ bucket: bucket, stream: false},
		function (err, rslt) {
			if (err) {
				console.log("ERROR: " + err)
			}
			else {
				var dataSets = []
				var keys= rslt.keys
				for (var x in keys) {
					//console.log(rslt.keys[x])
					client.fetchValue({ bucket: bucket, key: keys[x], convertToJs: true},
						function (err, rslt) {
							if (err) {
								console.log("ERROR: " + err);
							}
							else if(rslt) {
								//dataSets.push(keys[x] + "   " + JSON.stringify(rslt.values.shift().value))
								console.log(JSON.stringify(rslt.values.shift().value))
							}
						}
					)
				}
			}
		})
		res.send("dataSets")
	}
)



//start express server (application) on port 3000 and log announce to console
var server = app.listen(3000, function () {
	console.log('Express App listening at http://localhost:3000')
})
