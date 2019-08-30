# dashbi-db-driver-nedb

This is the default database driver for Dashbi. It's using [NeDB](https://github.com/louischatriot/nedb)
(please support author if you can!).

## Usage

As it's default driver, you don't need to specify it. But if you want to then:

```js
const dashboard = new Dashbi({
  database: {
    driver: 'nedb',
    settings: {
      // NeDB options
    }
  }
});
```

In the `settings` you can put your desired [NeDB options](https://github.com/louischatriot/nedb#creatingloading-a-database).

Default set options are:

```js
{
  timestampData: true,
  autoload: true,
  corruptAlertThreshold: 0
}
```

## Persistence

It's very highly possible that you will want to use persistent NeDB mode. To do that simply specify `filename` in options.
Like this:

```js
const dashboard = new Dashbi({
  database: {
    driver: 'nedb',
    settings: {
      filename: './datastore.db'
    }
  }
});
```

## Auto-clean and Limit Per Source ID

This driver has `cleanUp` method and limit per source is 10,000.
This means that Dashbi DatabaseController will regulary clean up each source,
so there will be no more then 10,000 records per source.
