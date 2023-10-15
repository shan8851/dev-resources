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

// @desc: Add a new category
// @access: Admin Only (Protected)
// @route POST /api/categories
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create a new category
        const category = new Category({
            name,
            description
        });

        await category.save();

        res.status(201).json({
            success: true,
            data: category
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error: ${error}`
        });
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
         category.description = req.body.description || category.description;

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
