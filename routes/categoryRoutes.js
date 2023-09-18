const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', (req, res) => res.json({ message: 'Welcome to the dev resources server' }));

router.post('/', (req, res) => res.json({ message: 'Create category - admin only' }));

router.put('/:id', (req, res) => res.json({ message: `Edit category - admin only ${req.params.id}` }));

router.delete('/:id', (req, res) => res.json({ message: `Delete category - admin only ${req.params.id}` }));

module.exports = router;
