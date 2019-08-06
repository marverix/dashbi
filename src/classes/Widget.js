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
   * @param {string} _path Path
   */
  constructor (name, _path) {
    this.name = name;
    this.path = _path;

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
