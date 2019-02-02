const wallpaper = require('wallpaper');

module.exports = async o => {

  const options = {
    screen: 'all',
  };

  await wallpaper.set(o.image, options);

  return wallpaper.get(options);

};
