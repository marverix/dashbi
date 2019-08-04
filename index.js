require('finka');
const path = require('path');
const fs = require('fs');

const globalConfig = require('./global-config');

const Log = require('./src/lib/Log');
const Build = require('./src/lib/Build');
const DataProvidersController = require('./src/lib/DataProvidersController');
const WidgetsController = require('./src/lib/WidgetsController');
const LayoutsController = require('./src/lib/LayoutsController');
const WebServer = require('./src/lib/WebServer');


/**
 * Main Class
 */
class Dashbi {

  /**
   * Constructor
   * @param {string|null} localSource Local source path
   */
  constructor (localSource = null) {
    Log.info(`Initializing new Dashbi instance`);

    // Local Source path
    this.localSource = localSource == null ? null : path.resolve(localSource);

    if (!fs.existsSync(this.localSource)) {
      throw new Error(`Source '${this.localSource}' does not exist`);
    }

    // Widgets Controller
    this.widgetsController = new WidgetsController(this.localSource);

    // Layouts Controller
    this.layoutsController = new LayoutsController(this.widgetsController);

    // Data Providers Controller
    this.dataProvidersController = new DataProvidersController(this.localSource, this.layoutsController);

    // WebServer
    this.webServer = new WebServer(this.layoutsController);

    // Init embeded
    this.widgetsController.register('about', globalConfig.path.src);
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

    // this.dataProvidersController.startWorkers();
    let that = this;
    Build(this).then(function() {
      that.webServer.start();
    });
  }

}

// Export
module.exports = Dashbi;
