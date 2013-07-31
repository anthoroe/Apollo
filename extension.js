// avatar chat

var Apollo;

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
	
	broadcast({"type":"join", "user": Apollo.sync(client, ["id", "x", "y"])});
	
	for(var user in users){
		if(users[user].id != client.id){
			client.send({"type":"join", "user": Apollo.sync(users[user], ["id", "x", "y"])});
		}
	}
}

function disconnect(client, message){
	delete users[client.id];
}

function move(client, message){
	client.x = message.x;
	client.y = message.y;
	broadcast({"type":"move", "user": Apollo.sync(client, ['id', 'x', 'y'])});
}

function chat(client, message){
	broadcast({"type":"chat", "id":client.id, "message":message.message});
}

module.exports.init = function(ApolloRef){
	Apollo = ApolloRef; // save the API instance
	
	Apollo.addMessageListener("GSDconnect", connect);
	Apollo.addMessageListener("GSDdisconnect", disconnect);
	Apollo.addMessageListener("move", move);
	Apollo.addMessageListener("chat", chat);
};