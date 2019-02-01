#!/usr/bin/env node
// jshint esversion:6

module.exports = {

  argv: function(key) {

  let args = process.argv.slice(0).splice(process.execArgv.length + 2);

  key = ((( ~~ key) >= 1) ? key : 0);

  return ((args[key]) ? args[key].trim() : '');

  },

};
