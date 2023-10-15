const express = require('express');
const { getAllResources, addResource, editResource, deleteResource } = require('../controllers/resourcesController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Joi = require('joi');

const resourceValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().trim().default(""),
  category: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/), // Assuming ObjectId is a 24-character hex string
  link: Joi.string().required().trim().uri(),
  tags: Joi.array().items(Joi.string().trim()),
  user: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
});

const validateResource = (req, res, next) => {
  const { error } = resourceValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  next();
};

/**
 * @swagger
 * /api/v1/resources:
 *  get:
 *    tags:
 *      - Resources
 *    summary: Get all resources with optional pagination, filtering, and sorting
 *    description: Fetches all resources from the database with optional pagination, filtering, and sorting
 *    parameters:
 *      - in: query
 *        name: page
 *        description: The current page (defaults to 1)
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        description: The number of resources per page (defaults to 10)
 *        schema:
 *          type: integer
 *      - in: query
 *        name: sortBy
 *        description: The field to sort by (either 'name' or 'updatedAt')
 *        schema:
 *          type: string
 *      - in: query
 *        name: order
 *        description: The sorting order (either 'asc' or 'desc')
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response containing paginated, filtered, and sorted resources
 */
router.route('/').get(getAllResources);

/**
 * @swagger
 * /api/v1/resources:
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
 *              category:
 *                type: string
 *    responses:
 *      '201':
 *        description: Successfully added a new resource
 */
router.route('/').post(protect, validateResource, addResource);



/**
 * @swagger
 * /api/v1/resources/{id}:
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
router.route('/:id').put(protect, validateResource, editResource);

/**
 * @swagger
 * /api/v1/resources/{id}:
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
