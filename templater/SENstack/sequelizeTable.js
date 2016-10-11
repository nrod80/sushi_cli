'use strict'

// Sequelize Tables:
var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('{{tableName}}', {
{% for field in fields %}
  {{field.name}}: {
    {% if field.type %} type: {{ field.type | Sequelize_Type }}
    {% endif %}
  },
{% endfor %}
})
