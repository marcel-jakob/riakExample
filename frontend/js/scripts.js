var backend = "localhost:3000"

$( document ).ready(function(){
	console.log("jquery works!")

	setInterval(function(){
		getAllKeys()
	}, 1000);
});

// should work
var newDataSet = function(){
	var data = {email: $("#exampleInputEmail1").val(), user: $("#exampleInputPassword1").val()}

	console.log("pushing" + JSON.stringify(data))
	$.ajax({
	    url: "http://" + backend + "/newDataSet",
	    type: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify(data),
	    success: function (data) {
				console.log(data);
				$("#exampleInputEmail1").val("");
				$("#exampleInputPassword1").val("");
			},
			error: function(error){
				console.log(error);
			}
	});
}

// should work
var getAllKeys = function(){
	$.ajax({
	    url: "http://" + backend + "/getAllKeys",
	    type: "GET",
	    success: function (data) {
				console.log(data);
				$( "#keyList" ).empty()
				var kList = $('#keyList')
				$.each(data, function(i)
				{
				    var li = $('<li/>')
				        .attr('role', 'menuitem')
				        .appendTo(kList)
						var aaa = $('<p/>')
				        .text(data[i])
				        .appendTo(li);
				});
			},
			error: function(error){
				console.log(error);
			}
	});
}

// should work
var getDataSet = function(){
	var key = $("#exampleInputEmail2").val();

	$.ajax({
	    url: "http://" + backend + "/getDataSet?key=" + key,
	    type: "GET",
	    success: function (data) {
				console.log(JSON.stringify(data));
				var username = data.user;
				$("#exampleInputEmail2").val("");
				$("#exampleUsername").html(username);
			},
			error: function(error){
				console.log(error);
			}
	});
}

// nice to have
var deletDataSet = function(){
}

// nice to have
var modifyDataSet = function(){
}
