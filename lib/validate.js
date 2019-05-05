const util = require('./util');

module.exports = async o => {

  if  ( ! ((typeof o.debug === 'number') && o.levels.includes(o.debug))) {
    throw new TypeError(`Expected \`debug\` to be a number between 0 and 2 (inclusive), got \`${o.debug}\` (${typeof o.debug})`);
  }

  if ( ! ((typeof o.directory === 'string') && (o.directory.length > 0) && (await util.pathExists(o.directory)))) {
    throw new TypeError(`Expected \`directory\` to be a path string to a preexisting folder, got \`${o.directory}\` (${typeof o.directory})`);
  }

  if (o.fisheye) {

    const views = [ 'random', 'big-sky', 'tiny-planet', 'both', ];

    if ( ! ((typeof o.fisheye === 'string') && views.includes(o.fisheye))) {
      throw new TypeError(`Expected \`fisheye\` to be a string, one of “${views.join(', ')}”, got \`${o.fisheye}\` (${typeof o.fisheye})`);
    }

  }

  if ( ! ((typeof o.key === 'string') && (o.key.length >= 39))) {
    throw new TypeError(`Expected \`key\` to be a valid Google Maps API key string of 39 or more characters, got \`${o.key}\` (${typeof o.key})`);
  }

  return {
    debug: o.debug,
    directory: o.directory,
    fisheye: o.fisheye,
    // Protect API key from getting logged later on:
    key: o.key.replace(/[a-z0-9]/gi, '•'),
  };

};
