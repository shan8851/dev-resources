const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, editCategory, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { checkAdmin } = require('../middleware/checkAdmin');

/**
 * @swagger
 * /api/v1/categories:
 *  get:
 *    tags:
 *      - Categories
 *    summary: Get all categories
 *    description: Fetches all categories from the database
 *    responses:
 *      '200':
 *        description: A successful response containing all categories
 */
router.route('/').get(getAllCategories);

/**
 * @swagger
 * /api/v1/categories:
 *  post:
 *    tags:
 *      - Categories
 *    summary: Add a category
 *    description: Adds a new category to the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Name of the category.
 *                example: "Web Development"
 *              description:
 *                type: string
 *                description: Description for the category.
 *                example: "All resources related to web development."
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '201':
 *        description: Successfully added a new category
 */
router.route('/').post(protect, checkAdmin, addCategory);


/**
 * @swagger
 * /api/v1/categories/{id}:
 *  put:
 *    tags:
 *      - Categories
 *    summary: Edit a category
 *    description: Edits a category in the database by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the category to edit
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Successfully edited category
 */
router.route('/:id').put(protect, checkAdmin, editCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *  delete:
 *    tags:
 *      - Categories
 *    summary: Delete a category
 *    description: Deletes a category in the database by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the category to delete
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Successfully deleted category
 */
router.route('/:id').delete(protect, checkAdmin, deleteCategory);

module.exports = router;
