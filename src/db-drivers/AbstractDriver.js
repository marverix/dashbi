'use strict';


/**
 * Abstract Driver
 */
class AbstractDriver {

  /**
   * Constructor
   * @param {Object} settings Settings
   */
  constructor (settings) {
    this.settings = settings;
  }

  /**
   * Put data
   * @param {string} sid Source ID
   * @param {*} state State
   */
  put (sid, state) {
    throw new Error('Please override this method!');
  }

  /**
   * Fetch data
   * @param {string} sid Source ID
   */
  fetch (sid) {
    throw new Error('Please override this method!');
  }

}

// Export
module.exports = AbstractDriver;
