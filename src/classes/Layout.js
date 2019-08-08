'use strict';

const schemaValidator = require('../lib/SchemaValidator');
const { getSourceId } = require('../lib/Utils');


/**
 * Layout Class
 */
class Layout {

  /**
   * Constructor
   * @param {Object} config Config
   * @param {WidgetsController} widgetsController
   */
  constructor (config, widgetsController) {
    Object.assign(this, config);
    this.widgetsController = widgetsController;
    this.widgets = [];
  }

  /**
   * Add Widget
   * @param {Object} config Widget Config
   */
  addWidget (config) {
    schemaValidator.validateWidgetConfig(config);

    // Validate if such widget is registered
    if (!this.widgetsController.isRegistered(config.name)) {
      throw new Error(`Widget '${config.name}' is not registered`);
    }

    this.widgets.push(
      this.widgetsController.extendConfig(config)
    );

    return this.widgets.length;
  }

  /**
   * Get sources
   * @returns {Set<string>}
   */
  getSources () {
    let sources = new Set();
    for (let widget of this.widgets) {
      if (widget.source != null) {
        sources.add(widget.source);
      }
    }
    return sources;
  }

  /**
   * To JSON
   */
  toJson () {
    let widgets = [];
    let tmpConfig;

    for (let widgetConfig of this.widgets) {
      tmpConfig = Object.assign({}, widgetConfig);
      if (tmpConfig.source) {
        tmpConfig.source = getSourceId(tmpConfig.source.name, tmpConfig.source.params);
      }
      widgets.push(tmpConfig);
    }

    return {
      name: this.name,
      title: this.title,
      description: this.description || null,
      icon: this.icon || null,
      widgets
    };
  }

}

// Export
module.exports = Layout;
