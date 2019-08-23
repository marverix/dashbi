# Concepts


## Dashbi Instance

Dashbi Instance is just new instance of `Dashbi` main class.
Creating new Dashbi instance looks like this:

```js
const Dashbi = require('dashbi');

const dashboard = new Dashbi();
```

To start created dashboard use `start()` method:

```js
dashboard.start();
```

This will trigger building dashboard, starting servers etc.

## Data Provider

Data Provider is an abstraction layer based on which [Sources](#source) are created.
Each Data Provider must have `index.js`. This script will be used to fork a new
[Node.js Child Process](https://nodejs.org/api/child_process.html#child_process_child_process).
There is no restrictions what Data Provider can/cannot do. It's standalone script.
Only restriction is that it should send to main process data.

[Dashbi Worker Class](https://github.com/marverix/dashbi-worker) is designed to help develop new Data Providers.

## Source

Source is an parametrized Data Provider instance. Dashbi will create as much Data Providers forks (child_process) as
much different configurations of the same Data Provider are. E.g.

```js
firstBoard.addWidget({
  name: 'jenkins-build-status',
  title: 'My Job Status',

  source: {
    name: 'jenkins-build',
    params: {
      jenkinsUrl: 'https://jenkins.example.org',
      jobPath: 'job/my-job'
    }
  }
});

firstBoard.addWidget({
  name: 'jenkins-build-status',
  title: 'Copy of My Job Status',

  source: {
    name: 'jenkins-build',
    params: { // the same as above
      jenkinsUrl: 'https://jenkins.example.org',
      jobPath: 'job/my-job'
    }
  }
});

firstBoard.addWidget({
  name: 'jenkins-build-status',
  title: 'My 2nd Job Status',

  source: {
    name: 'jenkins-build',
    params: {
      jenkinsUrl: 'https://jenkins.example.org',
      jobPath: 'job/my-2nd-job' // different
    }
  }
});
```

Above example will create 2 sources. Data Provider `jenkins-build` has been used 3 times, but only 2 times with different
`params`. Because of that first 2 widgets will be fed from the same source, but third one will use other source.

## Layout

Layout is an container for [Widgets](#widget).

```js
const firstBoard = dashboard.createLayout({
  name: 'first-board',
  title: 'First Board',
  description: 'My first board that show things',
  icon: 'info' // font-awesome 4.7 icon name (without 'fa-' prefix)
});
```

List of added layouts will be visible in dashboard home page.

There is no restrictions nor how many layouts one dashboard instance can have, neither how many widgets may be in one
layout. Content overflow is the limit ;)

## Widget

Widget is the representer of source. Widget always gets the array of [States](#state) limited to the 100 newest.
How you will use it it's up to yours imagination. E.g. If you want to present current last state then you will be interested
in the last index (the newest one). 

Adding widget to Layout not only has front-end impact, but also tells back-end that you need this data provider with
this configuration.

## State

State is abstraction used both in data provider and in widget. Basicly it's empty Object. But it's up to Data Provider
how it will use it. 

Imagine that there is a princess in the tower. She is sick and the prince is far away at the conference.
The prince would like to know how she is. So he hires a doctor to regularly record the princess' state of health.
The doctor sends his notes to the server regularly so that the prince can read what and how princess is (in his free time).
It turns out, however, that the doctor writes like a doctor - so the prince cannot read it. He decides to hire a translator, actually two.
One is to draw a real-time graph of the princess's pulse based on this notes, and the other to draw the current body temperature.

In above example doctor would be the Data Provider and translators a Widgets.

