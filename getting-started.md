# Getting Started

You need to do 2 things: provide data (that will be presented), and setup what and how should be presented.

If you want to check out list of public widgets and data providers you should definitly look at
[this awesome list](https://github.com/marverix/dashbi-awesome).

Let's say that you have Jenkins up and running at URL `https://jenkins.example.org`.
You want to have one dashboard that will show last build status of given jobs.

We will start installing Dashbi:

```sh
npm install --save dashbi
```

Now we need to create a new [Dashbi Instance](concepts.md#dashbi-instance):

```js
'use strict';

const Dashbi = require('dashbi');

const dashboard = new Dashbi();
```

Next step is creating a new [Layout](concepts.md#layout):

```js
const firstBoard = dashboard.createLayout({
  name: 'first-board',
  title: 'First Board',
  description: 'My first board that show things',
  icon: 'info'
});
```

Out layout is empty. We need to add a [Widgets](concepts.md#widget) there. But we don't have any data yet!
Let's install [jenkins-build](https://github.com/marverix/dashbi-data-provider-jenkins-build) [Data Provider](concepts.md#data-provider):

```sh
npm install --save dashbi-data-provider-jenkins-build
```

Dashbi will automatically detect this data provider and register it, but keep in mind that if you are creating 
custom data provider (or widget) then you need to register it manually. But let's go back to main topic.

Ok, we have a data provider. Now let's install [jenkins-build-status](https://github.com/marverix/dashbi-widget-jenkins-build-status)
widget, that will present data from `jenkins-build` data provider.

```sh
npm install --save dashbi-widget-jenkins-build-status
```

In the same way as Dashbi detected the data-provider, it will detect installed widget too.

Let's add those widgets to the layout.

```js
firstBoard.addWidget({
  name: 'jenkins-build-status', // name of widget
  title: 'My Job Status',

  source: {
    name: 'jenkins-build', // name of data provider
    params: {
      jenkinsUrl: 'https://jenkins.example.org',
      jobPath: 'job/my-job'
    }
  }
});
```

If you want to check second job status then just add one more widget:

```js
firstBoard.addWidget({
  name: 'jenkins-build-status',
  title: 'My 2nd Job Status',

  source: {
    name: 'jenkins-build',
    params: {
      jenkinsUrl: 'https://jenkins.example.org',
      jobPath: 'job/my-2nd-job'
    }
  }
});
```

Now we need only to tell Dashbi to start:

```js
dashboard.start();
```

Run your script and open `http://localhost:8800`.
