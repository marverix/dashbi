import 'promise/polyfill';
import finka from '@bitbar/finka';
finka();

import Vue from 'vue';
import App from './App';

import router from './lib/router';
import store from './lib/store';

// Global components

// <icon ...></icon>
import Icon from 'Components/Icon';
Vue.component('icon', Icon);

// <widget-{{name}}></widget-{{name}}>
import 'Intermediars/widgets';

// Styles
import 'normalize.css';
import 'Fonts/index.css';
import 'font-awesome/less/font-awesome.less';
import 'Stylesheets/index.less';
import 'Stylesheets/flexgrid.less';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
