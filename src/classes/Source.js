'use strict';

const cp = require('child_process');


/**
 * Source Class
 */
class Source {

  /**
   * Constructor
   * @param {DataProvider} dataProvider Parent Data Provider instance
   * @param {Object} params Params
   */
  constructor (dataProvider, params) {
    this.dataProvider = dataProvider;
    this.params = params;

    // Create Source ID
    this.sid = md5(this.dataProvider.name + '-' + JSON.stringify(params));

    // Start worker
    this.worker = cp.fork(this.dataProvider.path);
    this.worker.send(this.params);
    this.worker.on('message', this.handleWorkerMessage.bind(this));
  }

  /**
   * Handle worker message
   * @param {*} state
   */
  handleWorkerMessage (state) {
    this.dataProvider.databaseController.put(this.sid, state);
  }

}

// Export
module.exports = Source;
