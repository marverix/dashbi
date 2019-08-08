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
   * @param {string} _path Path
   * @param {DatabaseController} databaseController Database Controller
   * @param {StompServer} stompServer Stomp Server
   * @param
   */
  constructor (name, _path, databaseController, stompServer) {
    this.name = name;
    this.path = _path;
    this.databaseController = databaseController;
    this.stompServer = stompServer;

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
