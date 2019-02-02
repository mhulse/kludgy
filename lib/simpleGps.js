const simpleGps = require('simple-gps');

module.exports = async o => {

  const results = [];

  for (const image of o.images) {

    if (image) {

      await simpleGps(
        image,
        o.lat,
        o.lon,
      )
        .then(result => {
          results.push({
            result: result,
            image: image,
            lat: o.lat,
            lon: o.lon,
          });
        });

    }

  }

  return results;

};
