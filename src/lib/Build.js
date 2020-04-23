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
async function build (context) {
  await clean();
  await prepare();
  await context.widgetsController.generateIntermediar();
  await context.layoutsController.generateIntermediar();
  await buildPackage();
}

/**
 * Clean
 * @returns {Promise}
 */
function clean () {
  return new Promise((resolve) => {
    Log.n('Cleaning...');
    rm(toCleanStr, () => {
      resolve();
    });
  });
}

/**
 * Prepare
 * @returns {Promise}
 */
function prepare () {
  return new Promise((resolve, reject) => {
    Log.n('Preparing...');
    fs.mkdir(globalConfig.path.wwwIntermediars, (err) => {
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
  return new Promise((resolve, reject) => {
    Log.n('Building...');
    webpack(webpackConfig, (err, stats) => {
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
