const fs = require('fs-extra');
const path = require('path');
const url = require('url');
const untildify = require('untildify');

module.exports = {

  pathExists: async function(target, dir = false) {

    target = this.fullPath(target);

    // Check if path’s dir exists, regardless of file:
    target = (dir ? path.dirname(target) : target);

    return fs.pathExists(target);

  },

  joinPaths: (... paths) => {

    return path.join(... paths);

  },

  removePath: async function(file) {

    await fs.remove(this.fullPath(file));

  },

  getUrlParts: (path, parseQueryString = false) => {

    return url.parse(path, parseQueryString);

  },

  urlFileName: function(file) {

    let result = '';

    try {

      const parsed = this.getUrlParts(file);

      // Some images have query string; we need to keep it:
      result = this.baseName([
        parsed.pathname,
        parsed.search,
      ].filter(Boolean).join(''));

    } catch (err) {

      result = '';

    }

    return result;

  },

  baseName: function(file) {

    return path.basename(file);

  },

  dirName: file => {

    let result = '';

    try {
      result = path.dirname(file);
    } catch (err) {
      result = '';
    }

    return result;

  },

  fullPath: file => {

    let result = '';

    try {
      result = path.resolve(untildify(file));
    } catch (err) {
      result = '';
    }

    return result;

  },

  writeJson: async function(file, data) {

    await fs.writeJson(this.fullPath(file), data);

  },

  getRandomArrayKey: arr => {

    return arr[Math.floor(Math.random() * arr.length)];

  },

};
