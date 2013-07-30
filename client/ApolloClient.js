var _sock;

function sendMessage(msg){
	_sock.send(JSON.stringify(msg));
}

function parseMessage(msg){
	return JSON.parse(msg);
}

var messageListeners = {};

function handleMessage(msg){
	if(msg.type in messageListeners){
		messageListeners[msg.type](msg);
	} else {
		console.log("Unhandled "+msg.type+" message");
		console.log(msg);
	}
}

function addMessageListener(message, listener){
	messageListeners[message] = listener;
}

function ApolloClient(host, port){
	_sock = new WebSocket("ws://"+host+":"+port);
	
	_sock.onopen = function(e){
		handleMessage({"type":"connect"});
	};
	
	_sock.onclose = function(e){
		handleMessage({"type":"disconnect"});
	};
	
	_sock.onmessage = function(e){
		handleMessage(parseMessage(e.data));
	};
	
	_sock.onerror = function(e){
		handleMessage({"type":"error", "error":e.data});
	};
	
}