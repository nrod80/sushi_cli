'use strict'
let db = require('./_db');
{% for table in Tables %}
let {{table.tableName}} = require('./models/{{table.tableName}}')
{% endfor %}

// Sequelize Index:
module.exports = db;


{% for source, name in Associations %}
{% for  target, association in name %}
{{source}}.{{association}}({{target}})
{% endfor %}
{% endfor %}
