'use strict';

const express = require('express');
const helmet = require('helmet');

const Log = require('../lib/Log');
const globalConfig = require('../../global-config');


/**
 * WebServer
 */
class WebServer {

  /**
   * Constructor
   * @param {LayoutsController} layoutsController
   */
  constructor (layoutsController) {
    this.layoutsController = layoutsController;

    // Init server
    this.server = express();

    // Trust proxy
    this.server.set('trust proxy', 1);

    // Secure - use helmet
    this.server.use(helmet());

    // Support internal errors
    this.server.use(this.serverSupportsInternalErrors.bind(this));

    // Serve static files
    this.server.use(express.static(globalConfig.path.wwwDist));

    // Default
    this.server.use(this.serverDefaultResponse.bind(this));
  }

  /**
   * Start
   * @returns {Promise}
   */
  start (port = globalConfig.port.webServer) {
    let that = this;

    Log.n(`Starting WebServer...`);
    return new Promise(function (resolve, reject) {
      that.server.listen(port, '0.0.0.0', function() {
        Log.n(`Serving WebServer on port ${port}...`);
        resolve();
      });
    });
  }

  /**
   * Server supports internal errors
   * @param {Object} err
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  serverSupportsInternalErrors (err, req, res, next) {
    res.sendStatus(err.statusCode);
  }

  /**
   * Server default response
   * @param {Object} req
   * @param {Object} res
   */
  serverDefaultResponse (req, res) {
    res.sendStatus(404);
  }

}

module.exports = WebServer;
