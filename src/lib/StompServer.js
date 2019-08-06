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

    this.stomp.on('connecting', this.whenClientConnecting.bind(this));
    this.stomp.on('connected', this.whenClientConnected.bind(this));
    this.stomp.on('disconnected', this.whenClientDisconnected.bind(this));
    this.stomp.on('send', this.whenSend.bind(this));
    this.stomp.on('subscribe', this.whenClientSubscribe.bind(this));
    this.stomp.on('unsubscribe', this.whenClientUnsubscribe.bind(this));
  }

  /**
   * Start
   * @returns {Promise}
   */
  start (port = globalConfig.port.stompServer) {
    let that = this;

    Log.n(`Starting StompServer...`);
    return new Promise(function (resolve, reject) {
      that.server.listen(port, function() {
        Log.n(`Serving StompServer on port ${port}...`);
        resolve();
      });
    });
  }

  /**
   * When cliens is connecting (after socket is opened)
   * @see {@link https://4ib3r.github.io/StompBrokerJS/StompServer.html#event:connecting}
   * @param {string} sessionId
   */
  whenClientConnecting (sessionId) {
    // Do something here?
  }

  /**
   * When client has connected (connection established and negotiated)
   * @see {@link https://4ib3r.github.io/StompBrokerJS/StompServer.html#event:connected}
   * @param {string} sessionId
   * @param {Object} headers
   */
  whenClientConnected (sessionId, headers) {
    // Do something here?
  }

  /**
   * When client has disconnected
   * @see {@link https://4ib3r.github.io/StompBrokerJS/StompServer.html#event:disconnected}
   * @param {string} sessionId
   */
  whenClientDisconnected (sessionId) {
    // Do something here?
  }

  /**
   * When broker send message to subscribers
   * @see {@link https://4ib3r.github.io/StompBrokerJS/StompServer.html#event:send}
   * @param {string} dest
   * @param {string} frame
   */
  whenSend (dest, frame) {
    // Do something here?
  }

  /**
   * When client subscribe topic
   * @see {@link https://4ib3r.github.io/StompBrokerJS/StompServer.html#event:subscribe}
   * @param {string} id
   * @param {string} sessionId
   * @param {string} topic
   * @param {string[]} tokens
   * @param {Object} socket
   */
  whenClientSubscribe (id, sessionId, topic, tokens, socket) {
    // Send data
  }

  /**
   * When client unsubscribe topic
   * @see {@link https://4ib3r.github.io/StompBrokerJS/StompServer.html#event:unsubscribe}
   * @param {string} id
   * @param {string} sessionId
   * @param {string} topic
   * @param {string[]} tokens
   * @param {Object} socket
   */
  whenClientUnsubscribe (id, sessionId, topic, tokens, socket) {
    // Do something here?
  }

  send (topic) {
    this.stomp.send(`/${topic}`, {});
  }
}


// Export
module.exports = StompServer;
