const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, editCategory, deleteCategory } = require('../controllers/categoryController');

/**
 * @swagger
 * /api/categories:
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
 * /api/categories:
 *  post:
 *    tags:
 *      - Categories
 *    summary: Add a category
 *    description: Adds a new category to the database
 *    responses:
 *      '201':
 *        description: Successfully added a new category
 */
router.route('/').post(addCategory);

/**
 * @swagger
 * /api/categories/{id}:
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
 *    responses:
 *      '200':
 *        description: Successfully edited category
 */
router.route('/:id').put(editCategory);

/**
 * @swagger
 * /api/categories/{id}:
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
 *    responses:
 *      '200':
 *        description: Successfully deleted category
 */
router.route('/:id').delete(deleteCategory);



module.exports = router;
