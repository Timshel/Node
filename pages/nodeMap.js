
var serverURL = "http://localhost:1234";

function startSocket(){
	var ws = new WebSocket("ws://localhost:8000/service");

	ws.onopen = function() {
		alert("webSocket open"); 
		ws.send("hello");
	};

	ws.onmessage = function( evt ){
		alert( evt.data );
	};

	ws.onclose = function(){alert("webSocket closed");}

	setTimeout( function (){
		ws.send("monkey");
	}, 2000 );
}


