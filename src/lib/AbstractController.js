'use strict';

/**
 * Abstract Controller
 */
class AbstractController {

  /**
   * Constructor
   * @param {string} localSource Local source path
   */
  constructor (localSource) {
    this.localSource = localSource;
    this.registry = new Map();
  }

  /**
   * Is registered
   * @param {string} name Name
   * @returns {boolean}
   */
  isRegistered (name) {
    return this.registry.has(name);
  }

  /**
   * Register
   * @param {string} name Name
   * @param {string} [localSource] Local source path
   * @returns {Object}
   */
  register (name, localSource = this.localSource) {
    let entry = this.createRegistryEntry(name, localSource);
    this.registry.set(name, entry);
    return entry;
  }

  /**
   * Create registry entry
   * @param {string} name Name
   * @param {string} [localSource] Local source path
   */
  createRegistryEntry (name, localSource) {
    throw new Error('Please overwrite this method');
  }

}

// Export
module.exports = AbstractController;
