'use strict'

let Sequelize = require('sequelize');

let db = new Sequelize('{{dialect}}://localhost:{{port}}/{{dbName}}'
  {%if logging %}
    , { LOGGING: {{ logging }} }
  {% endif %}
  );

module.exports = db;
