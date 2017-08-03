#!/usr/bin/env node
// jshint esversion:6

const path = require('path');
const fs = require('fs');
const exec = require('child_process').execSync;

const helpers = require('./helpers');

// https://github.com/mhulse/kludgy/issues/19
let cwd = path.dirname(fs.realpathSync(__filename));

exec(`cd "${cwd}" && npm start -- "${helpers.argv(0)}" "${helpers.argv(1)}"`);
