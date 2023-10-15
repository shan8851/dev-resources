// @desc: Get all resources
// @access: Public
// @route GET /api/resources
const getAllResources = async (req, res) => {
  try {
    const queryObj = {};

    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    if (req.query.tag) {
      queryObj.tags = { $in: [req.query.tag] };
    }

    const page = Number(req.query.page) || 1;       // Default to page 1
    const limit = Number(req.query.limit) || 10;    // Default to 10 items per page
    const skip = (page - 1) * limit;

    let sortObj = {};
    if (req.query.sortBy && ['name', 'updatedAt'].includes(req.query.sortBy)) {
      sortObj[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
    }

    const totalResources = await Resource.countDocuments(queryObj);
    const resources = await Resource.find(queryObj)
                                    .skip(skip)
                                    .limit(limit)
                                    .sort(sortObj);

    res.json({
      page,
      totalPages: Math.ceil(totalResources / limit),
      totalResources,
      count: resources.length,
      resources
    });

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
    resource.description = req.body.description || resource.description;
    resource.link = req.body.link || resource.link;
    resource.category = req.body.category || resource.category;
    resource.tags = req.body.tags || resource.tags;

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
