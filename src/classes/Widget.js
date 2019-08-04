'use strict';

const path = require('path');
const fs = require('fs');


/**
 * Widget Class
 */
class Widget {

  /**
   * Constructor
   * @param {string} name Unique name
   * @param {string} localSource Local source path
   */
  constructor (name, localSource) {
    this.name = name;
    this.path = path.join(localSource, 'widgets', name);

    // Validate structure

    // Must have index.vue
    if (!fs.existsSync(path.join(this.path, 'index.vue'))) {
      throw new Error('Widget must have index.vue file');
    }

    // Must have defaults.json
    let defaultsPath = path.join(this.path, 'defaults.json');
    if (!fs.existsSync(defaultsPath)) {
      throw new Error('Widget must have defaults.json file');
    }

    // Load defaults
    this.defaults = require(defaultsPath);
  }

}

// Export
module.exports = Widget;
