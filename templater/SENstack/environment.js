'use strict'
module.exports = {
  DATABASE_URI: 'postgres://localhost:{{port}}/{{dialect}}',
  {% if logging %}
  LOGGING: {{logging}},
  {% endif %}
  {% if dialect %}
  DIALECT: '{{dialect}}',{% endif %}
  DB_NAME:'{{dbName}}'
};
