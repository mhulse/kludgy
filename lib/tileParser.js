const tileParser = require('tile-parser');

module.exports = async o => {

  return tileParser(o.tiles);

};
