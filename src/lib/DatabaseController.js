'use strict';

const path = require('path');

const AbstractController = require('./AbstractController');


/**
 * Database Controller
 */
class DatabaseController extends AbstractController {

  /**
   * Constructor
   * @param {string} localSource Local source path
   */
  constructor (localSource) {
    super(path.join(localSource, 'db-drivers'));
    this.driver = null;
    this.watchingFor = new Set();
  }

  /**
   * Constructor
   * @param {Object} config Config
   */
  init (config) {
    let Driver = this.registry.get(config.driver)
    this.driver = new Driver(config.settings);
  }

  /**
   * Create registry entry
   * @param {string} name Name
   * @param {string} [localSource] Local source path
   * @returns {Widget}
   */
  createRegistryEntry (name, localSource) {
    if (!localSource) {
      localSource = path.join(this.localSource, name);
    }

    return require(localSource);
  }

  /**
   * Auto register db-drivers
   */
  autoRegister () {
    super.autoRegister('db-driver');
  }

  /**
   * Put data to datastore
   * @param {string} sid Source ID
   * @param {*} state State
   */
  put (sid, state) {
    return this.driver.put(sid, state);
  }

  /**
   * Fetch data from datastore
   * @param {string} sid Source ID
   */
  fetch (sid) {
    return this.driver.fetch(sid);
  }

  /**
   * Warch for given Source
   * @param {string} sid Source ID
   */
  watchFor (sid) {
    if (!this.watchingFor.has(sid)) {
      this.watchingFor.add(sid);

      if (typeof this.driver.cleanUp === 'function') {
        setInterval(this.driver.cleanUp.bind(this.driver, sid), 10 * Date.SECOND);
      }
    }
  }

}

// Export
module.exports = DatabaseController;
