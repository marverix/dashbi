import 'finka';
import Vue from 'vue';
import App from './App';
import router from './router';

// Global components

// <icon ...></icon>
import Icon from '@components/Icon';
Vue.component('icon', Icon);

// <widget-{{name}}></widget-{{name}}>
import '@intermediars/widgets';

// Styles
import 'normalize.css';
import '@fonts/index.css';
import 'font-awesome/less/font-awesome.less';
import '@less/index.less';
import '@less/g-system.less';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
