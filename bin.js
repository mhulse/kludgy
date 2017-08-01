#!/usr/bin/env node
// jshint esversion:6

const exec = require('child_process').execSync;

const helpers = require('./helpers');

exec(`npm start -- "${helpers.argv(0)}" "${helpers.argv(1)}"`);
