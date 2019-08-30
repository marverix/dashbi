'use strict';

const Datastore = require('nedb');

const DEFAULT_CONFIG = {
  timestampData: true,
  autoload: true,
  corruptAlertThreshold: 0
};

const LIMIT_PER_SID = 10000;


/**
 * NeDB Driver
 */
class NeDBDriver {

  /**
   * Constructor
   * @param {Object} settings Settings
   */
  constructor (settings) {
    this.config = Object.deepAssign({}, DEFAULT_CONFIG, settings);
    this.datastore = new Datastore(this.config);
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
      }, (err, newDoc) => {
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
      .exec( (err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs.reverse());
        }
      });
    });
  }

  /**
   *  Clean up given Source
   * @param {string} sid Source ID
   */
  cleanUp (sid) {
    this.datastore.find({ sid })
    .sort({ createdAt: -1 })
    .skip(LIMIT_PER_SID)
    .exec( (err, docs) => {
      if (!err && docs.length) {
        let sids = docs.map((doc) => doc.sid);
        this.datastore.remove({
          $where: function () { return sids.includes(this.sid); }
        }, { multi: true }, () => {
          this.datastore.persistence.compactDatafile();
        });
      }
    });
  }

}

// Export
module.exports = NeDBDriver;
