// @desc: Get all resources
// @access: Public
// @route GET /api/resources
const getAllResources = async (req, res) => {
 try {
    res.json({ message: 'Get all goals'})
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc: Add resources
// @access: Private
// @route POST /api/resources
const addResource = async (req, res) => {
 try {
    res.json({ message: 'Add resource' })
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc: Edit resources
// @access: Private
// @route POST /api/resources
const editResource = async (req, res) => {
 try {
    res.json({ message: `Edit resource ${req.params.id}` })
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};



// @desc: Delete resources
// @access: Private
// @route DELETE /api/resources
const deleteResource = async (req, res) => {
 try {
    res.json({ message: `Delete resource ${req.params.id}` })
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

module.exports = {
  getAllResources,
  addResource,
  editResource,
  deleteResource,
};
