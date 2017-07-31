#!/usr/bin/env node
// jshint esversion:6

const path = require('path');
const zombie = require('zombie');
const concat = require('concat');

browser = new zombie({
	loadCSS: false,
	//waitDuration: (10 * 1000),
});

function init() {
	
	concat([
		'top.html',
		'bottom.html',
	], 'main.html')
	.then(() => {
		start();
	});
	
}

function start() {
	
	browser.visit(`file://${path.resolve('./main.html')}`, function(error) {
		
		if ( ! error) {
			
			browser
				.wait()
				.then(() => {
					
					coords = JSON.parse(browser.window.COORDS);
					
					browser.window.close();
					
					// Only Google panoramas work with this codebase.
					// https://github.com/mhulse/random-street-coords/issues/4
					if (coords.copyright == '© 2017 Google') {
						
						console.log(`${coords.lat},${coords.lng},${coords.id}`);
						
					} else {
						
						start();
						
					}
					
				});
			
		} else {
			
			throw error;
			
		}
		
	});
	
}

init();
