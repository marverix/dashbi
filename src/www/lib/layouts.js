'use strict';

import layouts from 'Intermediars/layouts.json';


/**
 * Get all
 * @returns {Object[]}
 */
function getAll () {
  return layouts;
}

/**
 * Get layout with given name
 * @returns {Object|null} null if not found, otherwise Layout
 */
function getByName (name) {
  let idx = layouts.lookFor({ name });
  return idx > -1 ? layouts[idx] : null;
}


export default {
  getAll,
  getByName
}
