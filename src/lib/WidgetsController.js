'use strict';

const path = require('path');
const fs = require('fs');

const globalConfig = require('../../global-config');

const Log = require('../lib/Log');
const AbstractController = require('./AbstractController');
const Widget = require('../classes/Widget');


/**
 * Widgets Controller
 */
class WidgetsController extends AbstractController {

  /**
   * Constructor
   * @param {string} localSource Local source path
   */
  constructor (localSource) {
    super(path.join(localSource, 'widgets'));
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

    return new Widget(name, localSource);
  }

  /**
   * Auto register widgets
   */
  autoRegister () {
    super.autoRegister('widget');
  }

  /**
   *
   * @param {Object} config Widget Config
   */
  extendConfig (config) {
    let widget = this.registry.get(config.name);
    return Object.deepAssign({}, { params: widget.defaults }, config);
  }

  /**
   * Generate intermediar
   * This function will generate `widgets.js` which will be used for Client App to import widgets as components
   * @returns {Promise}
   */
  generateIntermediar () {
    return new Promise( (resolve, reject) => {
      Log.n('Generating widgets intermediar...');

      let index = "'use strict';\n"
                + "import Vue from 'vue';\n";

      let i = 0;
      this.registry.forEach(function (widget) {
        index += `import w${i} from '${widget.path}';\n`
               + `Vue.component('widget-${widget.name}', w${i});\n`;
        i++;
      });

      fs.writeFile(globalConfig.path.intermediarsWidgetsFile, index, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}

// Export
module.exports = WidgetsController;
