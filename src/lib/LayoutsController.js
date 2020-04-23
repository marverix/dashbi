'use strict';

const fs = require('fs');

const globalConfig = require('../../global-config');

const Log = require('../lib/Log');
const Layout = require('../classes/Layout');
const schemaValidator = require('../lib/SchemaValidator');


/**
 * Layouts Controller
 */
class LayoutsController {

  /**
   * Constructor
   * @param {WidgetsController} widgetsController
   */
  constructor (widgetsController) {
    this.widgetsController = widgetsController;
    this.list = new Map();
  }

  /**
   * Create new
   * @param {Object} config Layout config
   * @returns {Layout}
   */
  createNew (config) {
    let layout = new Layout(config, this.widgetsController);
    this.list.set(config.name, layout);
    return layout;
  }

  /**
   * Create layout
   * @param {Object} config Layout config
   * @returns {Layout}
   */
  createLayout (config) {
    schemaValidator.validateLayoutConfig(config);

    Log.n(`Creating layout '${config.name}'`);

    if (this.list.has(config.name)) {
      throw new Error(`Layout '${config.name}' already exists`);
    }

    return this.createNew(config);
  }

  /**
   * Has layout with given name
   * @param {string} name Desired layout name
   */
  has (name) {
    return this.list.has(name);
  }

  /**
   * Get sources
   * @returns {string[]}
   */
  getSources () {
    let sources = new Set();
    this.list.forEach((item) => {
      let itemSources = item.getSources();
      itemSources.forEach( (source) => sources.add(source) );
    });
    return sources;
  }

  /**
   * Generate intermediar
   * This function will generate `layouts.json` which will be used for Client App to get information about available layouts
   * @returns {Promise}
   */
  generateIntermediar () {
    return new Promise( (resolve, reject) => {
      Log.n('Generating layouts intermediar...');

      let layoutsObject = [];
      this.list.forEach((layout) => {
        layoutsObject.push( layout.toJson() );
      });

      fs.writeFile(globalConfig.path.intermediarsLayoutsFile, JSON.stringify(layoutsObject.reverse()), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}

// Export
module.exports = LayoutsController;
