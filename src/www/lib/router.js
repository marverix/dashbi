'use strict';

import Vue from 'vue'
import Router from 'vue-router'

import Home from '@components/Home'
import Layout from '@components/Layout'
import Error404 from '@components/Error404'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/layout/:name',
    component: Layout
  },
  {
    path: '*',
    component: Error404
  }
];

export default new Router({
  routes
});
