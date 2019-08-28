'use strict';

const path = require('path');
const fs = require('fs');

const globalConfig = require('../../global-config');

const Log = require('./Log');
const schemaValidator = require('./SchemaValidator');
const Build = require('./Build');

const DatabaseController = require('./DatabaseController');
const DataProvidersController = require('./DataProvidersController');
const WidgetsController = require('./WidgetsController');
const LayoutsController = require('./LayoutsController');

const WebServer = require('./WebServer');
const StompServer = require('./StompServer');


/**
 * Main Class
 */
class Dashbi {

  /**
   * Constructor
   * @param {Object} config
   */
  constructor (config = {}) {
    schemaValidator.validateDashbiConfig(config);

    Log.info(`Initializing new Dashbi instance`);

    // Database File path
    this.databaseFile = config.databaseFile ? path.resolve(config.databaseFile) : null;

    // Local Source path
    this.localSource = config.localSource ? path.resolve(config.localSource) : null;

    if (!fs.existsSync(this.localSource)) {
      throw new Error(`Source '${this.localSource}' does not exist`);
    }

    // DatabaseController
    this.databaseController = new DatabaseController(this.databaseFile);

    // Widgets Controller
    this.widgetsController = new WidgetsController(this.localSource);

    // Layouts Controller
    this.layoutsController = new LayoutsController(this.widgetsController);

    // StompServer
    this.stompServer = new StompServer();

    // Data Providers Controller
    this.dataProvidersController = new DataProvidersController(
      this.localSource, this.layoutsController, this.databaseController, this.stompServer
    );

    // WebServer
    this.webServer = new WebServer(this.layoutsController, this.databaseController);

    // Init embeded
    this.widgetsController.register('about', path.join(globalConfig.path.widgets, 'about'));
    let about = this.layoutsController.createNew({
      name: 'about',
      title: 'About',
      description: 'Information about this software',
      icon: 'info'
    });
    about.addWidget({
      name: 'about',
      title: 'About'
    });

    // Auto register
    if (config.autoRegister) {
      this.widgetsController.autoRegister();
      this.dataProvidersController.autoRegister();
    }
  }

  /**
   * Register a new Data Provider
   * @param {string} name Unique name
   * @returns {DataProvider}
   */
  registerDataProvider (name) {
    Log.n(`Registering data provider '${name}'`);

    if (this.dataProvidersController.isRegistered(name)) {
      throw new Error(`Data Provider '${name}' already registered`);
    }

    return this.dataProvidersController.register(name);
  }

  /**
   * Register a new Widget
   * @param {string} name Unique name
   * @returns {Widget}
   */
  registerWidget (name) {
    Log.n(`Registering widget '${name}'`);

    if (this.widgetsController.isRegistered(name)) {
      throw new Error(`Widget '${name}' already registered`);
    }

    return this.widgetsController.register(name);
  }

  /**
   * Create layout
   * @param {Object} config Layout config
   * @returns {Layout}
   */
  createLayout (config) {
    return this.layoutsController.createLayout(config);
  }

  /**
   * Start
   */
  start () {
    Log.info(`Starting!`);

    Build(this).then( () => {
      this.dataProvidersController.startWorkers();
      this.webServer.start();
      this.stompServer.start();
    });
  }

}

// Export
module.exports = Dashbi;
