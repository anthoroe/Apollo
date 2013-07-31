var net = require('net');
var WebSocketServer = require('websocket').server;
var http = require('http');
var protocol = require('./protocol');

function Connection(medium, conn){
	console.log("Connection");
	
	this.conn = conn;
	this.medium = medium;

	// use this rather than the Player class... they work similarly enough
}

Connection.prototype.send = function(msg){
	if(this.medium == module.exports.TCP)
		this.conn.write(protocol.generatePacket(msg));
	if(this.medium == module.exports.WS)
		this.conn.send(protocol.generatePacket(msg));
};

module.exports.TCP = 0;
module.exports.WS = 1;

var WSconns = [];
var WS_conns = [];

function server(medium, port, connectionHandler, dataHandler, endHandler){
	if(medium == module.exports.TCP){
		net.createServer(function(TCP_conn){
			TCPconn = new Connection(medium, TCP_conn);
			connectionHandler(TCPconn);
			TCP_conn.on('data', function(d){
				dataHandler(TCPconn, d);	
			});
			TCP_conn.on('end', function(){
				endHandler(TCPconn);
			});
		}).listen(port);
	} else if(medium == module.exports.WS){
		server = http.createServer(function(req, res){
			res.end("Oops!");
		}).listen(port); // no embedded server at the moment
		wsServer = new WebSocketServer({httpServer: server});
		wsServer.on('request', function(req){
			WS_conns.push(req.accept(null, req.origin));
			var i = WS_conns.length-1;
			
			WSconns.push(new Connection(medium, WS_conns[i]));
			
			
			connectionHandler(WSconns[i]);
			WS_conns[i].on('message', function(message){
				// force text
				dataHandler(WSconns[i], message.utf8Data);
			});
			WS_conns[i].on('close', function(){
				endHandler(WSconns[i]);
			});
		});		
	}
}

module.exports.server = server;
