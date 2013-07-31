// handles extension events

var listeners = {};

var restrictedMessages = ["connect", "disconnect"]; // these are server defined handlers
													// require explicit allow to handle

function handleMessage(client, message, serverOrigin){
	if(message.type in listeners){
		if(message.type in restrictedMessages){
			if(!serverOrigin){
				console.log("Restricted message "+message.type+" sent without approval");
				console.log("Ignoring...");
				return;
			}
		}
		listeners[message.type](client, message); // call the appropiate handlers
		console.log(client.id);
	} else {
		// unhandled event exception
		console.log("Unhandled "+message.type+" event");
		console.log(message);
	}
}

function addMessageListener(type, handler){
	listeners[type] = handler;
}

module.exports.handleMessage = handleMessage;
module.exports.addMessageListener = addMessageListener;