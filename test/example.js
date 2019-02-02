const Kludgy = require('../index');

(async () => {

  const kludgy = new Kludgy({
    debug: 1, // 2 = all placehoder data returned.
    // directory: '~/Desktop/panos',
    fisheye: 'both', // You get both view types, but it will take longer.
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
