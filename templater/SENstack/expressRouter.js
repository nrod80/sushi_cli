'use strict';

// Express Router:
const router = require('express').Router(); // eslint-disable-line new-cap
const {{tableName}} = require('../../db').model('{{tableName}}');

{% if routes.get %}
router.get('/', (req, res, next) => {
 return {{tableName}}.findAll()
 .then(data => res.send(data))
 .catch(next)
})

{% endif %}
{% if routes.getId %}
router.get('/:id', (req, res, next) => {
 return {{tableName}}.findById(req.params.id)
 .then(data => res.send(data))
 .catch(next)
})

{% endif %}
{% if routes.deleteId %}
router.delete('/:id', (req, res, next) => {
 return {{tableName}}.findById(req.params.id)
 .then(data => data.delete)
 .then(data => res.send(202))
 .catch(next)
})

{% endif %}
{% if routes.post %}
router.post('/', (req, res, next) => {
 return {{tableName}}.create(req.body)
 .then(data => res.send(data))
 .catch(next)
})

{% endif %}
{% if routes.putId %}
router.put('/:id', (req, res, next) => {
 return {{tableName}}.findById(req.params.id)
 .then(data => data.update(req.body))
 .then(data => res.send(data))
   .catch(next)
})

{% endif %}
module.exports = router;
