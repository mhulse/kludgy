const ParallelImageDownloader = require('parallel-image-downloader');
const util = require('./util');

module.exports = async (o) => {

  const parallelImageDownloader = new ParallelImageDownloader({
    target: util.fullPath(o.tmp),
    debug: (o.debug || false),
    // 10 images, downloaded 2 at a time, over a five second period:
    interval: 5,
    rate: 10,
    concurrency: 5,
    rename: async (file) => {

      const name = util.urlFileName(file);
      const parsed = util.getUrlParts(file, true);
      let x;
      let y;

      if (parsed.search) {

        x = parsed.query.x;
        y = parsed.query.y;

      } else {

        const parts = file.split('=')[1].split('-');

        x = parts[0].replace(/\D/g, '');
        y = parts[1].replace(/\D/g, '');

      }

      x = x.padStart(2, '0');
      y = y.padStart(2, '0');

      return file.replace(name, `tile_y${y}-x${x}`);

    },
  });

  const result = await parallelImageDownloader.download(o.urls);

  // Put download path location as first key for easy access later:
  result.unshift(util.dirName(result[0][0].path));

  return result;

};
