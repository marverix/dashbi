'use strict';

const Datastore = require('nedb');

const AbstractDriver = require('../AbstractDriver');

const DEFAULT_CONFIG = {
  timestampData: true,
  autoload: true,
  corruptAlertThreshold: 0
};


/**
 * NeDB Driver
 */
class NeDBDriver extends AbstractDriver {

  /**
   * Constructor
   * @param {Object} settings Settings
   */
  constructor (settings) {
    super(settings);
    this.config = Object.deepAssign({}, DEFAULT_CONFIG, this.settings);

    this.datastore = new Datastore(this.config);

    this.datastore.persistence.setAutocompactionInterval(30 * Date.MINUTE);
    this.datastore.ensureIndex({ fieldName: 'sid' });
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
module.exports = NeDBDriver;
