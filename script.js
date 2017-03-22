var IPadress = 0
var portNo = 0

$( document ).ready(function(){
	console.log("jquery works!")			
});	

// should work
var newDataSet = function(data){	
	$.ajax({
    url: "http://"+ IPadress +":"+ portNo +"/buckets/example/keys",
    type: "post",
    headers: {
        Content-Type: "text/plain"
    },
    dataType: 'json',
    success: function (data) {
        console.info(data);
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