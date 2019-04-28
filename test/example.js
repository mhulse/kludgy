const Kludgy = require('../index');

(async () => {

  const kludgy = new Kludgy({
    debug: 1,
    // directory: '~/Desktop/panos',
    fisheye: 'both',
    key: require('./key'),
  });

  console.log('before');

  try {
    await kludgy.init();
  } catch (err) {
    console.error(err);
  }

  console.log('after');

})();
