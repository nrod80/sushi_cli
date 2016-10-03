'use strict'
{% for table in Tables %}
let {{table.name}} = require('./models/{{table.name}}')
{% endfor %}

// Sequelize Index:
let db = require('./_db');
module.exports = db;

{% for source, name in Associations %}
//{{source}} Associations
{% for  target, association in name %}
{{source}}.{{association}}({{target}})
{% endfor %}

{% endfor %}
