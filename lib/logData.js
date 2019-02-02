const util = require('./util');

module.exports = async (o) => {

  await util.writeJson(o.output, o.data);

  return o.output;

};
