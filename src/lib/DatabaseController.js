'use strict';

const Datastore = require('nedb');

const globalConfig = require('../../global-config');

const Log = require('../lib/Log');


/**
 * Database Controller
 */
class DatabaseController {

  /**
   * Constructor
   * @param {string} filename Database filename
   */
  constructor (filename) {
    this.datastore = new Datastore({
      filename,
      timestampData: true,
      autoload: true,
      corruptAlertThreshold: 0
    });
  }

  /**
   * Put data to datastore
   * @param {string} sid Source ID
   * @param {*} state State
   */
  put (sid, state) {
    this.datastore.insert({
      sid,
      state
    }, function (err, newDoc) {
      if (err) {
        Log.err(err);
      }
    });
  }

}

// Export
module.exports = DatabaseController;
