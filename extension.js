// a simple example for an avatar chat

var users = [];
var ids = 0;

function broadcast(message){
	var i = 0;
	while(i < users.length){
		users[i].send(message);
		++i;
	}
}

function connect(client, message){
	users.push(client);
	
	client.id = ids++;
	
	broadcast({"type":"connect", "id": client.id});
}

function disconnect(client, message){
	// find user in array
	var i = 0;
	while(i < users.length){
		if(users[i].id == client.id)
			break;
		++i;
	}
	
	// remove user
	users.splice(i);
	
	broadcast({"type":"disconnect", "id": client.id});
}

function move(client, message){
	broadcast({"type":"move", "id":client.id, "x":message.x, "y":message.y});
}

module.exports.init = function(API){
	API.addMessageListener("connect", connect);
	API.addMessageListener("move", move); // add event listeners
	API.addMessageListener("disconnect", disconnect);
	
}; // expose our init method