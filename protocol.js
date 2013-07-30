// protocol.js
// defines the Apollo messaging protocol

// currently, as of version 0.0.1, Apollo uses an extremely verbose protocol
// packets are stored in their literal JSON form
// compressed or full binary packets are planned for future

// parsePacket
// parses a given packet
// arguments: packet
// packet: string representation of packet
// return value:
// object form of packet

function parsePacket(packet){
	try{
		return JSON.parse(packet);
	} catch(e){
		console.log("Encountered error parsing packet");
		console.log(packet.toString());
		console.log(e);
		return {"type":"error", "message":e};
	}	
}

// generatePacket
// generates a string represetnation of a packet
// arguments: obj
// obj: object represting packet
// return value:
// string form of packet
function generatePacket(obj){
	return JSON.stringify(obj);
}


// deal with module exports
module.exports.parsePacket = parsePacket;
module.exports.generatePacket = generatePacket;
