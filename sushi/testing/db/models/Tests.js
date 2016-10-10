'use strict'

// Sequelize Tables:
var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('Tests', {
  name: {
    type: Sequelize.STRING
  },
  difficulty: {
    type: Sequelize.INTEGER
  },
}, {
  getterMethods: {},
  setterMethods: {},
  hooks: {}
})