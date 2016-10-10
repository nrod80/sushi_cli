'use strict'

let Sequelize = require('sequelize')

let db = new Sequelize('postgres://localhost:5432/testing');

module.exports = db;