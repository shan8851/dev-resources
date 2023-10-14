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
    const newResource = new Resource({
        ...req.body,
        user: req.user._id
    });

    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
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
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }

    if (resource.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to edit this resource');
    }

    // Update the resource details
    resource.name = req.body.name || resource.name;
    // Add other fields similarly...

    const updatedResource = await resource.save();
    res.json(updatedResource);
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
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }

    if (resource.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this resource');
    }

    await resource.remove();
    res.json({ message: 'Resource removed' });
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
