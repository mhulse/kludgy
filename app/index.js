#!/usr/bin/env node
// jshint esversion:6

//const yargs = require('yargs');
const zombie = require('zombie');
//const pkg = require('../package.json');

//let options = {};

// function ddd(file) {
// 	
// 	try {
// 		
// 		// Run Chrome as background process
// 		// https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
// 		// --disable-gpu currently required, see link above
// 		let child = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless', '--remote-debugging-port=9222', '--disable-gpu'], {
// 			encoding: 'utf8',
// 			detached: true,
// 		});
// 		child.unref();
// 		
// 		console.log('stdout here: \n' + child.stdout);
// 		
// 	} catch(error) {
// 		
// 		console.log('Could not run Chrome as a background process!')
// 		
// 	}
// 	
// }

// function startApp() {
// 
// 	// https://medium.com/@dschnr/using-headless-chrome-as-an-automated-screenshot-tool-4b07dffba79a
// 	// https://objectpartners.com/2017/04/13/how-to-install-and-use-headless-chrome-on-osx/
// 
// 	// $ chrome --headless --disable-gpu --repl http://mky.io/random-street-coords/
// 	// [0707/092640.194270:INFO:headless_shell.cc(278)] Type a Javascript expression to evaluate or "quit" to exit.
// 	// >>> window.COORDS
// 	//{"result":{"type":"string","value":"{\"lat\":69.56685225156927,\"lng\":118.69960863143206}"}}
// 
// 	CDP(client => {
// 		// extract domains
// 		const { Network, Page } = client;
// 		// setup handlers
// 		Network.requestWillBeSent(params => {
// 			console.log(params.request.url);
// 		});
// 		Page.loadEventFired(() => {
// 			client.close();
// 		});
// 		// enable events then start!
// 		Promise.all([Network.enable(), Page.enable()])
// 			.then(() => {
// 				return Page.navigate({ url: "https://github.com" });
// 			})
// 			.catch(err => {
// 				console.error(err);
// 				client.close();
// 			});
// 	}).on('error', error => {
// 		// cannot connect to the remote endpoint
// 		console.error(error);
// 	});
// 
// }

async function getOptions() {

	// let argv = yargs
	// 	.version(pkg.version)
	// 	.usage(`Usage: ddddd`)
	// 	.alias('h', 'help')
	// 	.help('h', 'Show help.')
	// 	.argv;

	//startApp();
	
	//ddd();

	// const browser = new chrome({
	// 	headless: true,
	// 	repl: true
	// });
	// await browser.init();
	// await browser.goTo('https://google.com/');
	// const result = await browser.evaluate(() => document.title)
	// console.log(result)
	// browser.onConsole(msg => {
	// 	console.log('dddd');
	// })
	// await browser.close(true)
	
}

//getOptions();


browser = new zombie({
	debug: false,
	runScripts: true,
	loadCSS: false
});
browser.visit('http://mky.io/random-street-coords/', function(error) {
	if (error) {
		throw error;
	}
	browser.wait().then(() => {
		coords = JSON.parse(browser.window.COORDS);
		console.log(`${coords.lat},${coords.lng}`);
	});
});
