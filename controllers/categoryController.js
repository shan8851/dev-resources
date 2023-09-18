const Category = require('../models/Category');

// @desc: Get all category
// @access: Public
// @route GET /api/category
const getAllCategories = async (req, res) => {
 try {
    const categories = await Category.find();
    res.json(categories)
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc: Add category
// @access: Private
// @route POST /api/category
const addCategory = async (req, res) => {
 try {
    const category = await Category.create(req.body);
    res.json(category)
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc: Edit category
// @access: Private
// @route POST /api/category
const editCategory = async (req, res) => {
 try {
    res.json({ message: `Edit category ${req.params.id}` })
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};



// @desc: Delete category
// @access: Private
// @route DELETE /api/category
const deleteCategory = async (req, res) => {
 try {
    res.json({ message: `Delete category ${req.params.id}` })
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
