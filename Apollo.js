var network = require('./network'); // network module is a wrapper around the 
				    // normal net module for extended capabillities

var config = require('./config'); // configuration loader

var protocol = require('./protocol'); // provides methods for handling the Apollo protocol

function connectionHandler(client){
	console.log("Client connected");
}

function dataHandler(client, data){
	var message = protocol.parsePacket(data); // parse the message
	console.log(message); // dump the message
}

function endHandler(client){
	console.log("Client disconnected");
}

network.server(network.TCP, config.port, connectionHandler, dataHandler, endHandler);