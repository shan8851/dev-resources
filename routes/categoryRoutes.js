const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, editCategory, deleteCategory } = require('../controllers/categoryController');

router.route('/').get(getAllCategories).post(addCategory);
router.route('/:id').put(editCategory).delete(deleteCategory);

module.exports = router;
