#!/usr/bin/env node
// jshint esversion:6

const path = require('path');
const zombie = require('zombie');
const fs = require('fs');

const helpers = require('./helpers');

const browser = new zombie({
  loadCSS: false,
  //waitDuration: (10 * 1000),
});
const html = './temp.html';

function init() {

  let key = helpers.argv();

  if (key.length) {

    let template = `
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=${key}&callback=kludgy.init"></script>
    <script src="maps.js"></script>
    `.replace(/\s{2,}/g, '');

    fs.writeFileSync(html, template, 'utf8');

    start();

  }

}

function start() {

  browser.visit(`file://${path.resolve(html)}`, function(error) {

    if ( ! error) {

      browser
        .wait()
        .then(() => {

          coords = JSON.parse(browser.window.COORDS);

          browser.window.close();

          // https://github.com/mhulse/random-street-coords/issues/4
          if (coords.copyright.includes('Google')) {

            // This line must be here as `kludgy.sh` depends on this output!
            console.log(`${coords.lat},${coords.lng},${coords.id}`);

            fs.unlinkSync(html);

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
