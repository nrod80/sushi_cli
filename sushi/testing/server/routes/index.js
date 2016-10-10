'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap


router.use(function(req, res) {
  res.status(404).end();
});

module.exports = router;