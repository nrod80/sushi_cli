'use strict'

let pg = require('pg');
let Sequelize = require('sequelize');
let env = require('../env');
let dbName = env.DB_NAME;

// connect to postgres db
pg.connect(env.DATABASE_URI, function(err, client, done) {
  if (err) throw err
  client.query('CREATE DATABASE ' + dbName, function(err) {
    if (err) throw err
      //db should exist now, initialize Sequelize
    client.end(function(err) {
      if (err) throw err;
    }); // close the connection
  });
});
