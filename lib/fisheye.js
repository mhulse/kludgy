const Fisheye = require('fisheye');

module.exports = async o => {

  // Build array for looping; pass all but `both`, as fisheye doesn’t mind
  // options passed that are not “valid”:
  const views = ((o.view === 'both') ? [ 'big-sky', 'tiny-planet', ] : [ o.view ]);
  const results = [];

  for (const view of views) {

    const fisheye = new Fisheye({
      directory: o.directory,
      image: o.image,
      view: view,
    });

    results.push(await fisheye.create());

  }

  // Return array of output images:
  return results.map(function(key) {
    return key.output;
  });

};
