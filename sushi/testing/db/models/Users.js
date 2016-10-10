'use strict'

// Sequelize Tables:
var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('Users', {
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
}, {
  getterMethods: {},
  setterMethods: {},
  hooks: {}
})