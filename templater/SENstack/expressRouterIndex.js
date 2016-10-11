'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap

{% for table in Tables %}
router.use('/{{table.tableName}}', require('./{{table.tableName}}'));
{% endfor %}

router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;
