'use strict';

import Vue from 'vue'
import Router from 'vue-router'

import Home from 'Components/Home'
import Layout from 'Components/Layout'
import Error404 from 'Components/Error404'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Dashbi'
    }
  },
  {
    path: '/layout/:name',
    component: Layout,
    meta: {
      title: 'Layout'
    }
  },
  {
    path: '*',
    component: Error404,
    meta: {
      title: 'Error 404'
    }
  }
];

const router = new Router({
  routes
});

router.beforeEach( (to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
