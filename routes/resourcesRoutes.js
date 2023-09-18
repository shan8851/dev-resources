const express = require('express');
const { getAllResources, addResource, editResource, deleteResource } = require('../controllers/resourcesController');
const router = express.Router();

router.route('/').get(getAllResources).post(addResource);
router.route('/:id').put(editResource).delete(deleteResource);

module.exports = router;
