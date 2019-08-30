'use strict';

const path = require('path');

const config = {
  path: {
    root: path.resolve(__dirname)
  },

  port: {
    webServer: 8800,
    stompServer: 8801
  }
};

config.path.dashbiModules = path.join(config.path.root, 'node_modules');
config.path.nodeModules = path.resolve('./node_modules');

config.path.src = path.join(config.path.root, 'src');
config.path.classes = path.join(config.path.src, 'classes');
config.path.dbDrivers = path.join(config.path.src, 'db-drivers');
config.path.lib = path.join(config.path.src, 'lib');
config.path.schemas = path.join(config.path.src, 'schemas');
config.path.widgets = path.join(config.path.src, 'widgets');
config.path.www = path.join(config.path.src, 'www');

config.path.wwwAssets = path.join(config.path.www, 'assets');
config.path.wwwComponents = path.join(config.path.www, 'components');
config.path.wwwConfig = path.join(config.path.www, 'config');
config.path.wwwDist = path.join(config.path.www, 'dist');
config.path.wwwIntermediars = path.join(config.path.www, 'intermediars');
config.path.wwwLib = path.join(config.path.www, 'lib');

config.path.intermediarsLayoutsFile = path.join(config.path.wwwIntermediars, 'layouts.json');
config.path.intermediarsWidgetsFile = path.join(config.path.wwwIntermediars, 'widgets.js');


module.exports = config;
