// avatar chat

var users = {}; // index by ID

var idCounter = 0;

function broadcast(msg){
	for(user in users){
		users[user].send(msg);
	}
}

function connect(client, message){
	client.id = idCounter++;
	users[client.id] = client;
	
	client.x = Math.random();
	client.y = Math.random();
	
	broadcast({"type":"join", "id": client.id, "x":client.x, "y":client.y});
	
	for(var user in users){
		console.log(users[user].id+" = "+client.id)
		if(users[user].id != client.id){
			console.log("se")
			client.send({"type":"join", "id":users[user].id, "x":users[user].x, "y":users[user].y});
		}
	}
}

function disconnect(client, message){
	delete users[client.id];
}

function move(client, message){
	client.x = message.x;
	client.y = message.y;
	broadcast({"type":"move", "id":client.id, "x":client.x, "y":client.y});
}

function chat(client, message){
	broadcast({"type":"chat", "id":client.id, "message":message.message});
}

module.exports.init = function(API){
	API.addMessageListener("connect", connect);
	API.addMessageListener("disconnect", disconnect);
	API.addMessageListener("move", move);
	API.addMessageListener("chat", chat);
};