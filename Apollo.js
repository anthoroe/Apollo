var network = require('./network'); // network module is a wrapper around the 
				    // normal net module for extended capabillities

var config = require('./config'); // configuration loader

var protocol = require('./protocol'); // provides methods for handling the Apollo protocol

network.createServer(function(conn){
	console.log("Client connected");

	conn.on('data', function(d){
		var message = protocol.parsePacket(d); // parse the message
		console.log(message); // dump the message
	});

	conn.on('end', function(){
		console.log("Client disconnected");
	});
}).listen(config.port, config.host);
