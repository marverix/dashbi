'use strict';

const Ajv = require('ajv');
const ajv = new Ajv({
  // this options allows Ajv to set "default" values from scheme to object
  useDefaults: true
});

const DashbiConfigSchema = require('../schemas/DashbiConfig.json');
const dashbiConfigValidator = ajv.compile(DashbiConfigSchema);

const LayoutConfigSchema = require('../schemas/LayoutConfig.json');
const layoutConfigValidator = ajv.compile(LayoutConfigSchema);

const WidgetConfigSchema = require('../schemas/WidgetConfig.json');
const widgetConfigValidator = ajv.compile(WidgetConfigSchema);

/**
 * Validate Dashbi Config by JSON schema
 * @param {Object} config Dashbi Config
 */
function validateDashbiConfig (config) {
  let valid = dashbiConfigValidator(config);
  if (!valid) {
    console.error(dashbiConfigValidator.errors);
    throw new Error('Invalid Dashbi Config')
  }
}

/**
 * Validate Layout Config by JSON schema
 * @param {Object} config Layout Config
 */
function validateLayoutConfig (config) {
  let valid = layoutConfigValidator(config);
  if (!valid) {
    console.error(layoutConfigValidator.errors);
    throw new Error('Invalid Layout Config')
  }
}

/**
 * Validate Widget Config by JSON schema
 * @param {Object} config Widget Config
 */
function validateWidgetConfig (config) {
  let valid = widgetConfigValidator(config);
  if (!valid) {
    console.error(widgetConfigValidator.errors);
    throw new Error('Invalid Widget Config')
  }
}


module.exports = {
  validateDashbiConfig,
  validateLayoutConfig,
  validateWidgetConfig
};
