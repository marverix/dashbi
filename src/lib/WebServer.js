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
   * @param {DatabaseController} databaseController
   */
  constructor(layoutsController, databaseController) {
    this.layoutsController = layoutsController;
    this.databaseController = databaseController;

    // Init server
    this.server = express();

    // Trust proxy
    this.server.set('trust proxy', 1);

    // Secure - use helmet
    this.server.use(helmet());

    // Support internal errors
    this.server.use(this.serverSupportsInternalErrors.bind(this));

    // API
    this.server.get('/api/source/:source', this.getSource.bind(this));

    // Serve static files
    this.server.use(express.static(globalConfig.path.wwwDist));

    // Default
    this.server.use(this.serverDefaultResponse.bind(this));
  }

  /**
   * Start
   * @returns {Promise}
   */
  start(port = globalConfig.port.webServer) {
    let that = this;

    Log.n(`Starting WebServer...`);
    return new Promise(function (resolve, reject) {
      that.server.listen(port, '0.0.0.0', function () {
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
  serverSupportsInternalErrors(err, req, res, next) {
    res.sendStatus(err.statusCode);
  }

  /**
   * Server default response
   * @param {Object} req
   * @param {Object} res
   */
  serverDefaultResponse(req, res) {
    res.sendStatus(404);
  }

  /**
   * Get source
   * @param {Object} req
   * @param {Object} res
   */
  getSource(req, res) {
    if (!this.validateQuery(req.query)) {
      res.sendStatus(400);
      return;
    }

    this.databaseController.fetch(req.params.source)
    .then(function (data) {
      res.send(data);
    })
    .catch(function (err) {
      res.sendStatus(400)
    });
  }

  /**
   * Validates query and returns true if is valid
   *
   * @param {Object} query Express Request Query Object
   * @return {boolean} Verdict
   */
  validateQuery(query) {
    if (query.limit == null) {
      query.limit = 1;
    }

    if (query.offset == null) {
      query.offset = 0;
    }

    if (!isNumeric(query.limit) || !isNumeric(query.offset)) {
      return false;
    }

    query.limit = parseInt(query.limit);
    query.offset = parseInt(query.offset);

    if (query.limit < 0 || query.offset < 0) {
      return false;
    }

    return true;
  }

}

module.exports = WebServer;
