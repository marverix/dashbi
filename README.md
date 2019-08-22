# Dashbi

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

Dashbi is light framework that lets you build own dashboards corresponding your needs.

## Quick Start

Deploying the simplest dashboard that will show Dashbi version: 

```js
const Dashbi = require('dasbhi').Dashbi;
const dashboard = new Dashbi();
dashboard.start();
```

Wonna more? Dive into documentation then! :)

## Documentation

https://marverix.github.io/dashbi/

## Browsers/Hardware Support

Initially project was intended to work with all modern browsers
that supports the [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout),
but it seems that a lot of TV screens with embeded web browsers don't support it.
This is why project aims to work with older browsers like:

* Firefox 37+
* Chrome 34+
* Edge 12+

Tested with following TV web browsers:

* Samsung Browser 1.0 on Tizen Linux

## Versioning

This project is using Semver v2.0.0.

## Credits and Thanks

* Project is inspired by no longer maintained [Dashing](https://github.com/Shopify/dashing) project
* Used libraries (check [package.json](package.json) to see whole list):

  * [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework
  * [NeDB](https://github.com/louischatriot/nedb/) - Embedded persistent or in memory database for Node.js
  * [StompBrokerJS](https://github.com/marverix/StompBrokerJS) - Simple Node.js STOMP 1.1 broker for embedded usage
  * [STOMP.js](https://github.com/stomp-js/stomp-websocket) - Stomp client for Web browsers and Node.js applications
  * [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and Node.js
  * [Vue.js](https://vuejs.org/) - Progressive framework for building user interfaces
  * [Vuex](https://vuex.vuejs.org/) - A state management pattern + library for Vue.js applications
  * [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
  * [Webpack](https://webpack.js.org/) - A module bundler
  * [Babel](https://babeljs.io/) - The compiler for next generation JavaScript
  * [ajv](https://ajv.js.org/) - The fastest JSON Schema Validator

* Thanks to my employer - [Bitbar](https://bitbar.com/)

## Copyright and License

Copyright (c) 2019 Marek Sierociński.

Released under the [ICS](LICENSE) license.
