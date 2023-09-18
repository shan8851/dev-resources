// @desc: Get all category
// @access: Public
// @route GET /api/category
const getAllCategories = async (req, res) => {
 try {
    res.json({ message: 'Get all categories'})
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
    res.json({ message: 'Add category' })
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
