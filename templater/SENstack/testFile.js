const expect = require('chai').expect

{% for name, _ in Tests %}

describe('{{name}}', function() {
  {% for it_block in Tests[name].tests %}
  it('{{it_block}}', function() {

  })
  {% endfor %}

  })
{% endfor %}
