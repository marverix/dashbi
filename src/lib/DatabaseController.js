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
    return new Promise( (resolve, reject) => {
      this.datastore.insert({
        sid,
        state
      }, function (err, newDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    });
  }

  /**
   * Fetch data from datastore
   * @param {string} sid Source ID
   */
  fetch (sid) {
    return new Promise( (resolve, reject) => {
      this.datastore.find({ sid })
      .projection({
        state: 1,
        createdAt: 1
      })
      .sort({ createdAt: -1 })
      .limit(100)
      .exec(function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs.reverse());
        }
      });
    });
  }

}

// Export
module.exports = DatabaseController;
