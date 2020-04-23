/* eslint-disable no-unused-vars */
'use strict';

const path = require('path');
const fs = require('fs');

const Log = require('./Log');
const globalConfig = require('../../global-config');


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
  register (name, localSource) {
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

  /**
   * Auto register widgets found in node_modules
   * @param {string} type
   */
  autoRegister (type) {
    let modules = fs.readdirSync(globalConfig.path.nodeModules);

    let prefix = `dashbi-${type}-`;
    let newName;

    for (let name of modules) {
      if (name.startsWith(prefix)) {
        newName = name.replace(prefix, '');
        Log.n(`Auto registering ${type.replace('-', '')} '${newName}'`);
        this.register(newName, path.join(globalConfig.path.nodeModules, name));
      }
    }
  }

}

// Export
module.exports = AbstractController;
