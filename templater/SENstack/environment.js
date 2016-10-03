'use strict'
module.exports = {
  DATABASE_URI: '{{dialect}}://localhost:{{port}}/{{DBname}}',
  {% if logging %}
  LOGGING: {{logging}},
  {% endif %}
  {% if dialect %}
  DIALECT: '{{dialect}}',{% endif %}
  DB_NAME:'{{DBName}}'
};
