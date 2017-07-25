#!/usr/bin/env node
// jshint esversion:6

const path = require('path');
const zombie = require('zombie');

browser = new zombie({
	debug: false,
	runScripts: true,
	loadCSS: false
});

browser.visit(`file://${path.resolve('./index.html')}`, function(error) {
	
	if ( ! error) {
	
		browser.wait().then(() => {
			coords = JSON.parse(browser.window.COORDS);
			console.log(`${coords.lat},${coords.lng}`);
		});
		
	} else {
		
		throw error;
		
	}
	
});
