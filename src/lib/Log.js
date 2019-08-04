'use strict';

const chalk = require('chalk');


/**
 * Color log
 * @param {string} color Color that is valid method name of `chalk`
 * @param {*} msg Message to log
 */
function clog(color, msg) {
  console.log(chalk[color](msg));
}


/**
 * Log
 */
const Log = {

  /**
   * Log error style message
   */
  err: (msg) => {
    clog('red', msg);
  },

  /**
   * Log warning style message
   */
  warn: (msg) => {
    clog('yellow', msg);
  },

  /**
   * Log information style message
   */
  info: (msg) => {
    clog('cyan', msg);
  },

  /**
   * Log normal style message
   */
  n: (msg) => {
    console.log(msg);
  }

};

module.exports = Log;
