var network = require('./network'); // network module is a wrapper around the 
				    // normal net module for extended capabillities

var config = require('./config'); // configuration loader

var protocol = require('./protocol'); // provides methods for handling the Apollo protocol
var extensionHandler = require('./extensionHandler');

var extension = require('./extension'); // server extension: root of the application

function ExtensionAPI(){
}
ExtensionAPI.prototype.addMessageListener = function(message, handler){
	extensionHandler.addMessageListener(message, handler);
}

extension.init(new ExtensionAPI()); // initalize the extension

function connectionHandler(client){
	console.log("Client connected");
	extensionHandler.handleMessage(client, {"type":"GSDconnect"}, true); // send an explicit true to override the restricted messages
}

function dataHandler(client, data){
	var message = protocol.parsePacket(data); // parse the message
	extensionHandler.handleMessage(client, message); // handle the message
}

function endHandler(client){
	console.log("Client disconnected");
	extensionHandler.handleMessage(client, {"type":"GSDdisconnect"}, true); // send an explicit true to override the restricted messages
}

network.server(network.WS, config.port, connectionHandler, dataHandler, endHandler);
network.server(network.TCP, config.port-1, connectionHandler, dataHandler, endHandler);