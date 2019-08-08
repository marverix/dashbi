'use strict';

/**
 * Worker Class
 * Used to create new workers for Data Providers
 */
class Worker {

  /**
   * Constructor
   * @param {Object} config
   */
  constructor (config = {}) {
    this.config = config;
    this.checks = [];
    this.state = {};
    this.sendingState = null;

    process.on('message', this.handleMessage.bind(this));
  }

  /**
   * Handle incoming message from Main process
   * @param {Object} msg Message
   */
  handleMessage (msg) {
    Object.assign(this.config, msg);
    this.start();
  }

  /**
   * Start
   */
  start () {
    this.stop();

    for (let check of this.checks) {
      check.ref = setInterval(check.handler.bind(this), check.interval);
      check.handler.call(this);
    }

    if (this.sendingState) {
      this.sendingState.ref = setInterval(this.sendState.bind(this), this.sendingState.interval);
      setTimeout(this.sendState.bind(this), 5 * Date.SECOND);
    }
  }

  /**
   * Stop
   */
  stop () {
    for (let check of this.checks) {
      if (check.ref) {
        clearInterval(check.ref);
        check.ref = null;
      }
    }

    if (this.sendingState && this.sendingState.ref) {
      clearInterval(this.sendingState.ref);
      this.sendingState.ref = null;
    }
  }

  /**
   * Add check
   * @param {Function} handler
   * @param {number} interval
   */
  addCheck (handler, interval) {
    this.checks.push({
      handler,
      interval,
      ref: null
    });
  }

  /**
   * Send
   * @param {*} data
   */
  send (data) {
    process.send(data);
  }

  /**
   * Send state
   */
  sendState () {
    this.send(this.state);
  }

  /**
   * Store state
   * @param {string} key
   * @param {*} value
   */
  storeState (key, value) {
    this.state[key] = value;
  }

  /**
   * Send state every x ms - where x is given interval
   * @param {number} interval
   */
  sendStateEvery (interval) {
    this.sendingState = {
      interval,
      ref: null
    };
  }

}

// Export
module.exports = Worker;
