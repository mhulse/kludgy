const util = require('./util');

module.exports = class {

  constructor (options = {}) {

    this._options = options;

  }

  async all () {

    const result = {};

    result['remove temp directory'] = await this.removeTmp();

    //
    // Add other house cleaning tasks here …
    //

    return result;

  }

  async removeTmp () {

    const o = this._options;

    try {

      await util.removePath(o.tmp);

      return true;

    } catch (err) {

      return false;

    }

  }

};
