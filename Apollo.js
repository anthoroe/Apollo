var network = require('./network'); // network module is a wrapper around the 
				    // normal net module for extended capabillities

var config = require('./config'); // configuration loader

network.createServer(function(conn){
	console.log("Client Connected");
}).listen(config.port, config.host);
