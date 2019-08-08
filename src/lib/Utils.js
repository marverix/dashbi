'use strict';

/**
 * Get source id
 * @param {string} sourceName
 * @param {Object} sourceParams
 */
function getSourceId (sourceName, sourceParams) {
  return md5(sourceName + '-' + JSON.stringify(sourceParams));
}

// Export
module.exports = {
  getSourceId
};
