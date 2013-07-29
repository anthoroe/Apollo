// Player.js
// defines the Player class
// allows a higher-level access to the connections

function Player(conn){
	// store the connection
	this.conn = conn;

	// class is extensible:
	// properties may be modified by the game's modules
}

Player.prototype.send = function(msg){
	// assume a standard connection for the moment
	this.conn.write(msg);
};	

module.exports = Player;
