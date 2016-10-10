'use strict';

// Express Router:
const router = require('express').Router(); // eslint-disable-line new-cap
const Tests = require('../../db').model('Tests');

router.get('/', (req, res, next) => {
  return Tests.findAll()
    .then(data => res.send(data))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  return Tests.findById(req.params.id)
    .then(data => res.send(data))
    .catch(next)
})

router.post('/', (req, res, next) => {
  return Tests.create(req.body)
    .then(data => res.send(data))
    .catch(next)
})

module.exports = router;