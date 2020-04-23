'use strict';

const http = require('http');
const StompBroker = require('stomp-broker-js');

const Log = require('../lib/Log');
const globalConfig = require('../../global-config');


/**
 * StompServer
 */
class StompServer {

  /**
   * Constructor
   */
  constructor () {
    this.server = http.createServer();

    this.stomp = new StompBroker({
      server: this.server
    });
  }

  /**
   * Start
   * @returns {Promise}
   */
  start (port = globalConfig.port.stompServer) {
    Log.n(`Starting StompServer...`);
    return new Promise( (resolve) => {
      this.server.listen(port, () => {
        Log.n(`Serving StompServer on port ${port}...`);
        resolve();
      });
    });
  }

  /**
   * Send message to given topic
   * @param {string} topic
   * @param {Object} msg
   */
  send (topic, msg) {
    this.stomp.send(`/${topic}`, {}, JSON.stringify(msg));
  }

  /**
   * Update source
   * @param {string} sid
   * @param {Object} data
   */
  updateSource (sid, data) {
    this.send(`source/${sid}`, data);
  }
}


// Export
module.exports = StompServer;
