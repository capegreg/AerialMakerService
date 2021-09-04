/**
 * Gregory Bologna
 * Feb 2020
 * https://www.npmjs.com/package/os-service
 */

process.chdir(__dirname);

const service = require("os-service");

function usage () {
	console.log ("usage: node.exe aerialService_add.js <name: maybe aerialmaker?> [username] [password]");
	process.exit (-1);
}

if (process.argv.length > 2) {

	// defaults
	let serviceName = process.argv[2];
	let username = "";
	let password = "";

	if (process.argv.length > 3)
		username = process.argv[3];

	if (process.argv.length > 4)
		password = process.argv[4];

// nodePath: if not specified, C:\Program Files\nodejs\node.exe 
// otherwise, the path to the node binary used to run the service
// specify path or add to same folder as this file

// programPath: The program to run using nodePath, defaults to the value of process.argv[1]
// Ex. Array(2) ["node.exe", "aerialService_add.js]

var options = {
	displayName: 	"",
	serviceName: 	serviceName,
	//programPath: 	"", // defaults to 
	//nodePath: 		"./node.exe", 
	username: 		username,
	password: 		password
};

	service.add (options.serviceName, options, function(error) {
		if (error)
			console.log(error.toString());
	});

} else {
 	usage ();
}