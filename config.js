var fs = require('fs');

var obj;

try{
	obj = JSON.parse(fs.readFileSync("config.json"));
} catch(e){
	console.log("Caught error "+e+" parsing config file");
	console.log("Aborting...");
	process.exit();
}

module.exports = obj; // it's a sort of singleton
				// NOT an object
				// shouldn't be treated like such, anyway
