import cloudinary from 'cloudinary';
import Branch from '../models/pos_branchModel.js';

export const createBranch = async (req, res) => {
  const { name, address, phone } = req.body;
  const image = req.file.path;

  if (!image) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'Please upload an image'
    })
  }

  console.log(req.body);

  try {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: 'POS/branches',
      width: 150,
      crop: 'scale',
      use_filename: true,
      resource_type: 'image'
    });

    console.log(result);

    const branch = await Branch.create({
      name,
      address,
      phone,
      image: {
        url: result.secure_url,
        public_id: result.public_id
      },
      image_mimetype: req.file.mimetype,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Branch created successfully',
      branch
    });
    console.log(branch);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      success: true,
      message: 'All branches retrieved successfully',
      branches
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get a single branch
export const getSingleBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Branch not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Branch retrieved successfully',
      branch
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update a branch
export const updateBranch = async (req, res) => {
  const { name, address, phone } = req.body;
  const image = req.file.path;

  if (!image) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'Please upload an image'
    })
  }

  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Branch not found'
      });
    }

    // Update the branch properties
    branch.name = name || branch.name;
    branch.address = address || branch.address;
    branch.phone = phone || branch.phone;

    // Check if a new image was uploaded
    if (req.file) {
      // Delete the previous image from cloudinary
      if (branch.image.public_id) {
        await cloudinary.v2.uploader.destroy(branch.image.public_id);
      }

      // Upload the new image to cloudinary
      const result = await cloudinary.v2.uploader.upload(image, {
      folder: 'POS/branches',
      width: 150,
      crop: 'scale',
      use_filename: true,
      resource_type: 'image'
    });

      branch.image = {
        url: result.secure_url,
        public_id: result.public_id
      }
      branch.image_mimetype = req.file.mimetype;
  }

  const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, {
    name,
    address,
    phone,
    image: {
      url: result.secure_url,
      public_id: result.public_id
    },
    image_mimetype: req.file.mimetype,
  }, { new: true });

  // Save the updated branch
  await branch.save();

  // Fetch the updated branch and return it to the client
  const branches = await Branch.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Branch updated successfully',
    updatedBranch,
    branches
  });
  console.log(updatedBranch);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete a branch
export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Branch not found'
      });
    }

    // Delete the branch image from cloudinary
    if (branch.image.public_id) {
      await cloudinary.v2.uploader.destroy(branch.image.public_id);
    }

    // Delete the branch from the database
    // await branch.remove();
    const deletedBranch = await Branch.findByIdAndDelete(req.params.id);

    // Fetch all branches and return them to the client
    const branches = await Branch.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Branch deleted successfully',
      branches,
      deletedBranch
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};