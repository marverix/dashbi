'use strict';

const rm = require('rimraf');
const fs = require('fs');

const webpack = require('webpack');
const webpackConfig = require('../www/webpack.config');

const globalConfig = require('../../global-config');

const Log = require('./Log');

const toClean = [
  globalConfig.path.wwwDist,
  globalConfig.path.wwwIntermediars
];
const toCleanStr = `{${toClean.join(',')}}`;


/**
 * Build
 * @param {Dashbi} context
 * @returns {Promise}
 */
function build (context) {
  return clean().then(function() {
    return prepare().then(function () {
      return context.widgetsController.generateIntermediar().then(function() {
        return context.layoutsController.generateIntermediar().then(function() {
          return buildPackage();
        });
      });
    });
  });
}

/**
 * Clean
 * @returns {Promise}
 */
function clean () {
  return new Promise(function (resolve, reject) {
    Log.n('Cleaning...');
    rm(toCleanStr, function() {
      resolve();
    });
  });
}

/**
 * Prepare
 * @returns {Promise}
 */
function prepare () {
  return new Promise(function (resolve, reject) {
    Log.n('Preparing...');
    fs.mkdir(globalConfig.path.wwwIntermediars, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Build package
 * @returns {Promise}
 */
function buildPackage () {
  return new Promise(function (resolve, reject) {
    Log.n('Building...');
    webpack(webpackConfig, function (err, stats) {
      if (err) {
        throw err;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        Log.err('Build failed with errors');

        for (let error of info.errors) {
          Log.err(error);
        }

        reject();
        return;
      }

      if (stats.hasWarnings()) {
        Log.warn('Build had warnings');

        for (let warning of info.warnings) {
          Log.warn(warning);
        }
      }

      Log.n('Build complete');
      resolve();
    });
  });
}


module.exports = build;
