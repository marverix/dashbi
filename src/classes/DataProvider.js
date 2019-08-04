'use strict';

const path = require('path');
const fs = require('fs');

const Source = require('./Source');


/**
 * Data Provider Class
 */
class DataProvider {

  /**
   * Constructor
   * @param {string} name Unique name
   * @param {string} localSource Local source path
   */
  constructor (name, localSource) {
    this.name = name;
    this.path = path.join(localSource, 'data-providers', name);

    // Validate structure

    // Must have index.js
    if (!fs.existsSync(path.join(this.path, 'index.js'))) {
      throw new Error('Data provider must have index.js file');
    }
  }

  /**
   * Create source
   * @param {Object} params Source params
   */
  createSource (params) {
    return new Source(this, params);
  }

}

// Export
module.exports = DataProvider;
