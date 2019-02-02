const shortcut = require('internet-shortcut');

module.exports = async (... data) => {

  const results = [];

  for (const options of data) {

     results.push(await shortcut(options));

  }

  return results;

};
