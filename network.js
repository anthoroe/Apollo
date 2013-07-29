// network.js -- compatibillity layer for net, allowing support for more interfaces

var net = require('net'); // original
var tls = require('tls'); // tls

function Network(){
	this.TCP = 0;
	this.TLS = 1;
	
	this.mode = this.TCP;
	this.pfx = "";
	this.key = "";
	this.cert = "";
	this.ca = "";
	
	this.createServer = function(options, callback){
		if(arguments.length == 0){
			if(this.mode == this.TCP){
				return net.createServer();
			} else if(this.mode == this.TLS){
				return tls.createServer(this.generateOptions({}));
			}
		} else if(arguments.length == 1){
			if(this.mode == this.TCP){
				return net.createServer(options);
			} else if(this.mode == this.TLS){
				return tls.createServer(this.generateOptions({}), options);
			}
		} else if(arguments.length == 2){
			if(this.mode == this.TCP){
				return net.createServer(options, callback);
			} else if(this.mode == this.TLS){
				return tls.createServer(this.generateOptions(options), callback);
			}
		}
	}
	
	this.generateOptions = function(existingOptions){
		// generates options for TLS
		
		if(this.pfx.length){
			existingOptions.pfx = this.pfx;
		}
		if(this.key.length){
			existingOptions.key = this.key;
		}
		if(this.cert.length){
			existingOptions.cert = this.cert;
		}
		if(this.ca.length){
			existingOptions.ca = this.ca;
		}
		return existingOptions;
	};
};

module.exports = new Network();
