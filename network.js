var net = require('net');
var WebSocketServer = require('websocket').server;
var http = require('http');
var protocol = require('./protocol');

function Connection(medium, conn){
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

function server(medium, port, connectionHandler, dataHandler, endHandler){
	if(medium == module.exports.TCP){
		net.createServer(function(conn){
			var _conn = new Connection(medium, conn);
			connectionHandler(_conn);
			conn.on('data', function(d){
				dataHandler(_conn, d);	
			});
			conn.on('end', function(){
				endHandler(_conn);
			});
		}).listen(port);
	} else if(medium == module.exports.WS){
		server = http.createServer(function(req, res){  }).listen(port); // no embedded server at the moment
		wsServer = new WebSocketServer({httpServer: server});
		wsServer.on('request', function(req){
			var conn = req.accept(null, req.origin);

			_conn = new Connection(medium, conn);
			connectionHandler(_conn);
			conn.on('message', function(message){
				// force text
				dataHandler(_conn, message.utf8Data);
			});
			conn.on('close', function(){
				endHandler(_conn);
			});
		});		
	}
}

module.exports.server = server;
