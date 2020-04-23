'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import stomp from './stomp'

const apiUrl = `${location.origin}/api`;
const SOURCE_SIZE_LIMIT = 100;


/**
 * Store itself
 */
Vue.use(Vuex);

export default new Vuex.Store({

  // State
  state: {
    sources: {}
  },

  // Mutations
  mutations: {

    /**
     * Store source record
     * @param {Object} state
     * @param {Object} record
     */
    storeSourceRecord (state, record) {
      let sid = record.sid;
      delete record.sid;
      state.sources[sid].push(record);

      // fix size
      if (state.sources[sid].length > SOURCE_SIZE_LIMIT) {
        state.sources[sid].splice(0, state.sources[sid].length - SOURCE_SIZE_LIMIT);
      }
    }

  },

  // Actions
  actions: {

    /**
     * Init source
     * @param {Object} that That store context
     * @param {string} sid Source ID
     */
    initSource (that, sid) {
      if (that.state.sources[sid]) {
        return;
      }

      Vue.set(that.state.sources, sid, []);
      that.dispatch('fetchSource', sid);
    },

    /**
     * Fetch source
     * @param {Object} that That store context
     * @param {*} sid Source ID
     */
    fetchSource (that, sid) {
      axios.get(`${apiUrl}/source/${sid}`)
      .then((res) => {
        let records = res.data;
        for (let record of records) {
          record.sid = sid;
          that.commit('storeSourceRecord', record);
        }
        stomp.subscribeSource(that, sid);
      });
    }

  }

});
