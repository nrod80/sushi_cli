'use strict'

// Express Server:
const path = require('path')
const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser')
const db = require('../db')

app.use(morgan('dev'))

app.use(bodyparser.json())
app.use('/api', require('./routes'))
app.get('/', function(req, res, next) {
  res.send(`
<pre style="font-size:3rem;">____          ____
|    |     |  |    |   | |
|___ |     |  |___ |___| |
   | |     |     | |   | |
___| |_____|  ___| |   | |</pre>
`)
})

app.use(function(req, res, next) {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next(null);
  }
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// listen on port 3000
var port = 3000;
app.listen(port, function () {
  console.log('The server is anxiously awaiting you on port', port);
  db.sync()
  .then(function () {
    console.log('The database has been primed for filling');
  })
  .catch(function (err) {
    console.error('You messed up', err, err.stack);
  });
});


return app;
