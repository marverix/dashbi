'use strict';

import Stomp from '@stomp/stompjs';
import { port } from '@root/global-config'

const URL = `${location.origin.replace(/\d+$/, port.stompServer ).replace(/^http/, 'ws')}/stomp`;

/**
 * Init Cient
 */
const client = Stomp.client(URL);
client.reconnect_delay = 5 * Date.SECOND;
const promise = new Promise(function (resolve, reject) {
  client.connect('anonymous', 'anonymous', resolve, reject);
});

/**
 * Subscribe source
 * @param {Object} that That store context
 * @param {string} sid Source ID
 */
function subscribeSource (that, sid) {
  promise.then(function () {
    client.subscribe(`/source/${sid}`, handleRecord.bind(that));
  });
}

/**
 * Handle record
 * @returns {Function}
 */
function handleRecord (msg) {
  if (msg.body) {
    this.commit('storeSourceRecord', JSON.parse(msg.body));
  }
}


// Export
export default {
  subscribeSource
};
