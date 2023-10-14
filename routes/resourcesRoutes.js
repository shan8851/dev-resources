const express = require('express');
const { getAllResources, addResource, editResource, deleteResource } = require('../controllers/resourcesController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');


/**
 * @swagger
 * /api/resources:
 *  get:
 *    tags:
 *      - Resources
 *    summary: Get all resources
 *    description: Fetches all resources from the database
 *    responses:
 *      '200':
 *        description: A successful response containing all resources
 */
router.route('/').get(getAllResources);

/**
 * @swagger
 * /api/resources:
 *  post:
 *    tags:
 *      - Resources
*    security:
 *      - BearerAuth: []
 *    summary: Add a resource
 *    description: Adds a new resource to the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *    responses:
 *      '201':
 *        description: Successfully added a new resource
 */
router.route('/').post(protect, addResource);


/**
 * @swagger
 * /api/resources/{id}:
 *  put:
 *    tags:
 *      - Resources
*    security:
 *      - BearerAuth: []
 *    summary: Edit a resource
 *    description: Edits a resource in the database by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the resource to edit
 *    responses:
 *      '200':
 *        description: Successfully edited resource
 */
router.route('/:id').put(protect, editResource);

/**
 * @swagger
 * /api/resources/{id}:
 *  delete:
 *    tags:
 *      - Resources
 *    security:
 *      - BearerAuth: []
 *    summary: Delete a resource
 *    description: Deletes a resource in the database by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the resource to delete
 *    responses:
 *      '200':
 *        description: Successfully deleted resource
 */
router.route('/:id').delete(protect, deleteResource);


module.exports = router;
