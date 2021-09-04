/***
	AerialService
	Created by: GBologna
	Created On: 2/10/2020
	Usage: run from windows service
	2020-07-01, removed delay and added const path,
	removed execArgv on cp.fork
 */

/*
using fork: 
a communication channel is established to the child process when using fork, 
so we can use the send function on the forked process along with the global 
process object itself to exchange messages between the parent and forked processes.
*/

process.chdir(__dirname);

const service = require("os-service");
const { fork } = require('child_process');
var CronJob = require('cron').CronJob; // added 4/5/2020 by gwb for scheduling by crontab
var fork_path = '\\AerialMaker';

let jobId = 0;

/*
 cronjob started in delay. use standard cron syntax 
 but with 6 asterisks see here https://www.npmjs.com/package/cron
*/
var cjob = new CronJob('00 05 19 * * *', function() {
	// stop cronJob to prevent overlap for long jobs
	// restart cronJob in job exit
	cjob.stop(); 
	doit();
}, null, true, 'America/New_York');


function delayWork() {
	// not implemented
}

// enable a delay before service actually starts
var delay = (seconds) => {
	//setTimeout(() => delayWork(), seconds*1000);
};

//var delay = (seconds) => {
//	setTimeout(() => cjob.start(), seconds*1000);
//};

function doit() {
	try {

		const cp = require('child_process');
		//var job = cp.fork(`${fork_path}\\aerialMaker.js`, {execArgv:['--inspect']});
		var job = cp.fork(`${fork_path}\\aerialMaker.js`);

		job.on('message', (m) => {
			console.log('Message from fork:', m);
		});

		job.on('exit', code => {
			cjob.start(); // restart cronJob
			console.log(`\nProcess exit code is: ${code}`);
		});

	} catch (error) {
		console.error(error);
	}
}

// The callback function will be called when the service receives a stop request
// start immediate after (n) second delay
service.run (delay(1), function () {
	service.stop (0);
	process.exit (-1);
});
