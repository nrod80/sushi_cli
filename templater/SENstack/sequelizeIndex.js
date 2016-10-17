'use strict'
let db = require('./_db');
{% for table in Tables %}
let {{table.tableName}} = require('./models/{{table.tableName}}')
{% endfor %}

// Sequelize Index:
module.exports = db;


{% for source, name in Associations %}
{% for  target, association in name %}
{{source}}.{{AssociationMap[association][0]}}({{target}})
{{target}}.{{AssociationMap[association][1]}}({{source}}{% if AssociationMap[association][2] %}, { through: '{{source}}{{target}}'}{% endif %})
{% endfor %}
{% endfor %}
