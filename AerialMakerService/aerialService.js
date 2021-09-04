/**
 * Gregory Bologna
 * Feb 2020
 * https://www.npmjs.com/package/os-service
 */
 
process.chdir(__dirname);

const service = require("os-service");

// function usage () {
// 	console.log ("usage: node periodic-logger --add <name> [username] [password] [dep dep ...]");
// 	console.log ("       node periodic-logger --remove <name>");
// 	console.log ("       node periodic-logger --run");
// 	process.exit (-1);
// }

// toggle testing modes

//process.argv[2] = "--add";
//process.argv[2] = "--run";

// both needed to remove in debug
  // process.argv[2] = "--remove";
  // process.argv[3] = "aerialmaker";


// if (process.argv[2] == "--add" && process.argv.length >= 4) {
	// var options = {
	// 	programArgs: ["--run", "gregtest"]
	// };

if (process.argv[2] == "--add") {

	var options = {
			displayName: "",
			serviceName: "",
			username: "",
			password: ""
	};

	// if (process.argv.length > 4)
	// 	options.username = process.argv[4];

	// if (process.argv.length > 5)
	// 	options.password = process.argv[5];
		
	// if (process.argv.length > 6)
	// 	options.dependencies = process.argv.splice(6);

// "C:\Program Files\nodejs\node.exe" "c:\AerialMakerService\aerialService.js"

	service.add (options.serviceName, options, function(error) {
		if (error)
			console.log(error.toString());
	});

// } else if (process.argv[2] == "--remove" && process.argv.length >= 4) {
} else if (process.argv[2] == "--remove") {
	service.remove (process.argv[3], function(error) {
		if (error)
			console.trace(error.toString());
	});

} else if (process.argv[2] == "--run") {

	let jobId = 0;
	let runJob = () => {
			jobId = setInterval(() => {
	 		doit();
			clearInterval(jobId);
	 	}, 4000); // 86400
	};

	function doit() {

		try {

			const cp = require('child_process');
			var job = cp.fork(`AerialMaker/aerialMaker.js`);

			job.on('message', (m) => {
				console.log('PARENT got message:', m);
			});

			job.on('exit', code => {
				console.log(`\nExit code is: ${code}`);
				runJob();
			});

		} catch (error) {
			console.error(error);
		}
	}

	service.run (runJob(), function () {
		service.stop (0); // cb
	//	process.exit (-1);
	});

// } else {
// 	usage ();
}
