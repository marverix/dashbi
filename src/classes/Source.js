'use strict';

const cp = require('child_process');
const { getSourceId } = require('../lib/Utils');


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
    this.sid = getSourceId(this.dataProvider.name, params);

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
    let that = this;
    this.dataProvider.databaseController.put(this.sid, state).then(function (record) {
      that.dataProvider.stompServer.updateSource(record.sid, record);
    });
  }

}

// Export
module.exports = Source;
