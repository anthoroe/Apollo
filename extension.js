var API;

function init(_API){
	API = _API; // store the API reference
	
	API.addMessageListener("ping", ping); // add a listener for the ping message
}

function ping(client, message){
	client.send({"type":"pong"});
}

module.exports.init = init; // expose our init method