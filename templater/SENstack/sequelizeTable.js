'use strict'

// Sequelize Tables:
var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('{{name}}', {
{% for field in Fields %}
  {{field.name}}: {
    {% if field.type %} type: {{ field.type | Sequelize_Type }}
    {% endif %}
},{% endfor %}
}, {
  getterMethods: {
    {% for getter in Getters %}
        {{getter.name}}: function() {

        },
    {% endfor %}
  },
  setterMethods: {
    {% for setter in Setters %}
        {{setter.name}}: function() {

        },
    {% endfor %}
  },
  hooks: {
    {% for hook in Hooks %}
        {{hook.name}}: function() {

        },
    {% endfor %}
  }
})
