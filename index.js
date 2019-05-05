const lib = require('./lib/index');

class Kludgy {

  constructor (options = {}) {

    const defaults = {
      debug: 0,
      directory: `${__dirname}/panos`,
      fisheye: undefined,
      key: undefined,
    };

    this._options = {
      ... defaults,
      ... options,
    };

    // Convert debug to a boolean:
    this._debug = ( !!+ this._options.debug);

    this._levels = [
      0, // No debug.
      1, // Output console messages.
      2, // IBID + placeholder data.
    ];

    this._tmp = './tmp';

  }

  async init () {

    const o = this._options;

    try {

      this._validate = await this.validate();
      o.debug && console.log('validate', this._validate);

      this._clean = await this.clean();
      o.debug && console.log('clean', this._clean);

      this._randStreetView = await this.getRandStreetView();
      o.debug && console.log('randStreeView', this._randStreetView);

      this._tileParser = await this.getTileParser();
      o.debug && console.log('tileParser', this._tileParser);

      this._getTileUrls = await this.getTileUrls();
      o.debug && console.log('getTileUrls', this._getTileUrls);

      this._downloadTiles = await this.getDownloadTiles();
      o.debug && console.log('downloadTiles', this._downloadTiles);

      this._eqequirectangular = await this.getEquirectangular();
      o.debug && console.log('equirectangular', this._eqequirectangular);

      this._fisheye = await this.getFisheye();
      o.debug && console.log('fisheye', this._fisheye);

      this._simpleGps = await this.getSimpleGps();
      o.debug && console.log('simpleGps', this._simpleGps);

      this._shortcut = await this.getShortcut();
      o.debug && console.log('shortcut', this._shortcut);

      // https://github.com/sindresorhus/macos-wallpaper/issues/4
      this._wallpaper = await this.getWallpaper();
      o.debug && console.log('wallpaper', this._wallpaper);

    } catch (err) {

      // Turn on debug to ensure logging:
      this._debug = true;

      throw err;

    } finally {

      if (this._debug) {

        const log = await this.logData();
        console.log(`Log file written to: ${log}`);

      }

    }

  }

  async validate () {

    const o = this._options;

    return lib.validate({
      ... o,
      levels: this._levels,
    });

  }

  async clean () {

    const clean = new lib.clean({
      tmp: this._tmp,
    });

    return clean.all();

  }

  async getRandStreetView () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/randStreetView');

    return lib.randStreetView({
      debug: this._debug,
      key: o.key,
    });

  }

  async getTileParser () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/tileParser');

    return lib.tileParser({
      tiles: this._randStreetView.tiles
    });

  }

  async getTileUrls () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/tileUrls');

    return lib.tileUrls({
      id: this._randStreetView.id,
      key: this._randStreetView.image_key,
      zoom: this._tileParser.zoom,
      rows: this._tileParser.rows,
      cols: this._tileParser.cols,
    });

  }

  async getDownloadTiles () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/downloadTiles');

    return lib.downloadTiles({
      urls: this._getTileUrls,
      debug: this._debug,
      tmp: this._tmp,
    });

  }

  async getEquirectangular () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/equirectangular');

    const input = lib.util.joinPaths(this._downloadTiles[0], 'tile_*');
    const output = lib.util.joinPaths(o.directory, `${this._randStreetView.image_key}.jpg`)

    return lib.equirectangular({
      crop: this._tileParser.crop,
      tile: this._tileParser.tile,
      rows: this._tileParser.rows,
      cols: this._tileParser.cols,
      input: input,
      output: output,
    });

  }

  async getFisheye () {

    const o = this._options;

    if (o.fisheye) {

      if (o.debug === 2)
        return require('./lib/data/fisheye');

      return lib.fisheye({
        directory: o.directory,
        image: this._eqequirectangular,
        view: o.fisheye,
      });

    }

  }

  async getSimpleGps () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/simpleGps');

    // Fisheye images may not exist!
    const fisheye = (this._fisheye || []);

    return lib.simpleGps({
      lat: this._randStreetView.lat,
      lon: this._randStreetView.lng,
      images: [
        this._eqequirectangular,
        ... fisheye,
      ],
    });

  }

  async getShortcut () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/shortcut');

    const image_key = this._randStreetView.image_key;
    const lat = this._randStreetView.lat;
    const lon = this._randStreetView.lng;

    return lib.shortcut({
      directory: o.directory,
      name: image_key,
      uri: `http://www.google.com/maps?layer=c&panoid=${image_key}`,
    }, {
      directory: o.directory,
      name: `${image_key}_${lat},${lon}`,
      uri: `https://maps.google.com/?q=${lat},${lon}&ll=${lat},${lon}&z=0`
    });

  }

  async getWallpaper () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/wallpaper');

    const image = (
      // If `fisheye` is set:
      this._fisheye
      ?
      // The result is always an array with 1 or more items,
      // so randomly pick a key:
      lib.util.getRandomArrayKey(this._fisheye)
      :
      // Otherwise, use this:
      this._eqequirectangular
    );

    return lib.wallpaper({
      image: image
    });

  }

  async logData () {

    const o = this._options;

    if (o.debug === 2)
      return require('./lib/data/logData');

    // Fallback to timestamp if `image_key` is undefined:
    const name = ((this._randStreetView && this._randStreetView.image_key) || Date.now());

    return lib.logData({
      data: {
        debug: this._debug,
        clean: this._clean,
        validate: this._validate,
        randStreetView: this._randStreetView,
        tileParser: this._tileParser,
        tileUrls: this._tileUrls,
        downloadTiles: this._downloadTiles,
        eqequirectangular: this._eqequirectangular,
        fisheye: this._fisheye,
        simpleGps: this._simpleGps,
        wallpaper: this._wallpaper,
      },
      output: lib.util.joinPaths(o.directory, `${name}.json`),
    });

  }

}

module.exports = Kludgy;
