'use strict';

const path = require('path');

const AbstractController = require('./AbstractController');
const DataProvider = require('../classes/DataProvider');


/**
 * Data Providers Controller
 */
class DataProvidersController extends AbstractController {

  /**
   * Constructor
   * @param {string} localSource Local source path
   * @param {LayoutsController} layoutsController Layouts Controller
   * @param {DatabaseController} databaseController Database Controller
   * @param {StompServer} stompServer Stomp Server
   */
  constructor (localSource, layoutsController, databaseController, stompServer) {
    super(path.join(localSource, 'data-providers'));
    this.layoutsController = layoutsController;
    this.databaseController = databaseController;
    this.stompServer = stompServer;
    this.running = [];
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

    return new DataProvider(name, localSource, this.databaseController, this.stompServer);
  }

  /**
   * Auto register data providers
   */
  autoRegister () {
    super.autoRegister('data-provider');
  }

  /**
   * Start Workers
   */
  startWorkers () {
    let sources = this.layoutsController.getSources();
    sources.forEach( (source) => {
      let dataProvider = this.registry.get(source.name);
      let sourceInstance = dataProvider.createSource(source.params);
      this.running.push(sourceInstance);
      this.databaseController.watchFor(sourceInstance.sid);
    });
  }

}

// Export
module.exports = DataProvidersController;
