const Category = require('../models/categoryModel');

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
      const category = await Category.findById(req.params.id);

      if (category) {
         category.name = req.body.name || category.name;
         // Add more fields if there are any

         const updatedCategory = await category.save();
         res.json(updatedCategory);
      } else {
         res.status(404);
         throw new Error('Category not found');
      }
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
      const category = await Category.findById(req.params.id);

      if (category) {
         await category.remove();
         res.json({ message: 'Category removed' });
      } else {
         res.status(404);
         throw new Error('Category not found');
      }
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
