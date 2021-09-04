/**
 * Gregory Bologna
 * Feb 2020
 * https://www.npmjs.com/package/os-service
 */
 
process.chdir(__dirname);

const service = require("os-service");

function usage () {
	console.log ("usage: node.exe aerialService_remove.js <name, maybe aerialmaker?> [username] [password]");
	process.exit (-1);
}

if (process.argv.length > 3) {

	service.remove (process.argv[3], function(error) {
		if (error)
			console.trace(error.toString());
	});

} else {
 	usage ();
}

