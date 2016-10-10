'use strict';

// Express Router:
const router = require('express').Router(); // eslint-disable-line new-cap
const Users = require('../../db').model('Users');

router.delete('/:id', (req, res, next) => {
  return Users.findById(req.params.id)
    .then(data => data.delete)
    .then(data => res.send(202))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  return Users.findById(req.params.id)
    .then(data => data.update(req.body))
    .then(data => res.send(data))
    .catch(next)
})

module.exports = router;