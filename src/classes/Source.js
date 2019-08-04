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

    // Start worker
    this.worker = cp.fork(this.dataProvider.path);
    this.worker.send(this.params);
    this.worker.on('message', this.handleWorkerMessage.bind(this));
  }

  handleWorkerMessage (msg) {
    console.log(msg);
  }

}

// Export
module.exports = Source;
