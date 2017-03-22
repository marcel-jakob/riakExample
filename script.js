var IPadress = "127.0.0.1"
var portNo = "8098"

$( document ).ready(function(){
	console.log("jquery works!")
	newDataSet("test")			
});	

// should work
var newDataSet = function(data){	
	$.ajax({
	    url: "http://"+ IPadress +":"+ portNo +"/buckets/test/keys",
	    type: "POST",
	    headers: {
		"Content-Type": "text/plain",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	    },
	    success: function (data) {
		alert("success")
		console.log(data);
	    }
	});
}

// doesn't work
var readAllDataSets = function(){
	$.ajax({
    url: "http://"+ IPadress +":"+ portNo +"/buckets/example/keys",
    type: "get",
    dataType: 'json',
    success: function (data) {
        console.info(data);
    }
	});
}

// nice to have
var deletDataSet = function(){
}

// nice to have
var modifyDataSet = function(){
}