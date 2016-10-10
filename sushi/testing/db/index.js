'use strict'
let Users = require('./models/Users')
let Tests = require('./models/Tests')

// Sequelize Index:
let db = require('./_db');
module.exports = db;

//Users Associations
Users.hasMany(Tests)

//Tests Associations
Tests.belongsTo(Users)