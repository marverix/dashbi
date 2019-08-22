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

    this.sendingState = {
      frequently: {
        enabled: false,
        interval: null,
        ref: null
      },

      onChange: {
        enabled: false,
        interval: 100,
        ref: null,
        last: null
      }
    };

    this._boundSendState = this.sendState.bind(this);

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

    if (this.sendingState.frequently.enabled) {
      this.sendingState.frequently.ref = setInterval(this._boundSendState, this.sendingState.frequently.interval);
      setTimeout(this._boundSendState, 5 * Date.SECOND);
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

    if (this.sendingState.frequently.ref) {
      clearInterval(this.sendingState.frequently.ref);
      this.sendingState.frequently.ref = null;
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
    this.afterStoreStare();
  }

  /**
   * After store stare
   */
  afterStoreStare () {
    if (this.sendingState.onChange.enabled) {
      let jsonState = JSON.stringify(this.state);

      if (this.sendingState.onChange.last !== jsonState) {
        this.sendingState.onChange.last = jsonState;

        if (this.sendingState.onChange.ref) {
          clearTimeout(this.sendingState.onChange.ref);
        }

        this.sendingState.onChange.ref = setTimeout(this._boundSendState, this.sendingState.onChange.interval);
      }
    }
  }

  /**
   * Send state every x ms - where x is given interval
   * @param {number} interval
   */
  sendStateEvery (interval) {
    this.sendingState.frequently.enabled = true;
    this.sendingState.frequently.interval = interval;
  }

  /**
   * Send on state change
   * @param {number} interval
   */
  sendOnChange () {
    this.sendingState.onChange.enabled = true;
  }

}

// Export
module.exports = Worker;
