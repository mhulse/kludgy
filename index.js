#!/usr/bin/env node
// jshint esversion:6

const path = require('path');
const zombie = require('zombie');

browser = new zombie({
	loadCSS: false,
	//waitDuration: (10 * 1000),
});

function start() {
	
	browser.visit(`file://${path.resolve('./index.html')}`, function(error) {
		
		if ( ! error) {
			
			browser
				.wait()
				.then(() => {
					
					coords = JSON.parse(browser.window.COORDS);
					
					browser.window.close();
					
					// Only Google panoramas work with this codebase.
					// https://github.com/mhulse/random-street-coords/issues/4
					if (coords.copyright == '© 2017 Google') {
						
						console.log(`${coords.lat},${coords.lng}`);
						
					} else {
						
						start();
						
					}
					
				});
			
		} else {
			
			throw error;
			
		}
		
	});
	
}

start();
