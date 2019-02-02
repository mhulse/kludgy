const randLandCoords = require('rand-land-coords');
const randStreetView = require('rand-street-view');

module.exports = async o => {

  // https://github.com/mhulse/rand-street-view
  const options = {
    attempts: 15,
    debug: o.debug,
    google: false,
    key: o.key,
    throttle: 2,
  };
  let result = {};

  await (async function recursor (counter = 0) {

    counter++;

    options.coords = await randLandCoords();

    if (o.debug) {

      console.log('Coordinates:', options.coords);
      console.log('Counter:', counter);
      console.log('');

      console.log('Searching for panorama, please wait …');
      console.log('');

    }

    let data = await randStreetView(options);

    data = JSON.parse(data);

    if (data.status === 'error') {

      if (counter <= 5) {

        if (o.debug) {

          console.log('');
          console.log(`Recursing: ${counter - 1}`);

        }

        await recursor(counter);

      } else {

        throw new Error(`Exiting due to reaching max recursion: ${counter - 1}`);

      }

    } else {

      // console.log('Found:', data);

      result = data;

    }

  })();

  return result;

};
