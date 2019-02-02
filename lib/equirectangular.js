const Equirectangular = require('equirectangular');

module.exports = async o => {

  await new Equirectangular(o);

  return o.output;

};
