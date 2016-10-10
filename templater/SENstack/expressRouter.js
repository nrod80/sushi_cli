'use strict';

// Express Router:
const router = require('express').Router(); // eslint-disable-line new-cap
const {{name}} = require('../../db').model('{{name}}');

{% if Routes.get %}
router.get('/', (req, res, next) => {
 return {{name}}.findAll()
 .then(data => res.send(data))
 .catch(next)
})

{% endif %}
{% if Routes.getID %}
router.get('/:id', (req, res, next) => {
 return {{name}}.findById(req.params.id)
 .then(data => res.send(data))
 .catch(next)
})

{% endif %}
{% if Routes.deleteID %}
router.delete('/:id', (req, res, next) => {
 return {{name}}.findById(req.params.id)
 .then(data => data.delete)
 .then(data => res.send(202))
 .catch(next)
})

{% endif %}
{% if Routes.post %}
router.post('/', (req, res, next) => {
 return {{name}}.create(req.body)
 .then(data => res.send(data))
 .catch(next)
})

{% endif %}
{% if Routes.putID %}
router.put('/:id', (req, res, next) => {
 return {{name}}.findById(req.params.id)
 .then(data => data.update(req.body))
 .then(data => res.send(data))
   .catch(next)
})

{% endif %}
module.exports = router;
