import cloudinary from 'cloudinary';
import Branch from '../models/pos_branchModel.js';
import Pos from '../models/posModel.js';

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

    // Initialize an empty array to hold the POS machines
    let pos_machine = [];

    // Check if the POS machines are more than one
    if (req.body.pos_machine.length > 1) {
      // Loop through the array of POS machines
      for (let i = 0; i < req.body.pos_machine.length; i++) {
        // Push each POS machine to the pos_machine array
        pos_machine.push(req.body.pos_machine[i]);
      }
    } else {
      // Push the single POS machine to the pos_machine array
      pos_machine.push(req.body.pos_machine);
    }

    const newBranch = await Branch.create({
      name,
      address,
      phone,
      image: {
        url: result.secure_url,
        public_id: result.public_id
      },
      image_mimetype: req.file.mimetype,
      pos_machine
    });

    let pos_arr = pos_machine.split(','); // Convert the string to an array
    const pos = await Pos.find().where('_id').in(pos_arr).exec(); // Find all the pos machines in the array

    console.log(newBranch);

    // Create an array of references to the POS machines
    const posReferences = pos.map((posMachine) => posMachine._id);

    newBranch.pos_machine = posReferences; // Add the pos machines to the branch
    await newBranch.save(); // Save the branch

    // Fetch all branches and return them to the client
    const branches = await Branch.find().sort({ createdAt: -1 });

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Branch created successfully',
      newBranch,
      branches
    });
    console.log(newBranch);
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
  // try {
  //   const branches = await Branch.find().populate('pos_machine').sort({ createdAt: -1 });

  //   res.status(200).json({
  //     status: 200,
  //     success: true,
  //     message: 'All branches retrieved successfully',
  //     branches
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({
  //     status: 500,
  //     success: false,
  //     message: 'Internal server error',
  //     error: error.message
  //   });
  // }

  try {
    const posMachines = await Pos.find({}, 'alias'); // Only select the 'alias' field

    res.status(200).json({
      status: 200,
      success: true,
      message: 'All POS machines retrieved successfully',
      posMachines,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Get a single branch
export const getSingleBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id).populate('pos_machine').exec();

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
    const branch = await Branch.findById(req.params.id).populate('pos_machine').exec();

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

    let updatedBranch = branch; // Initialize a variable to hold the updated branch

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

      // Save the updated branch
      updatedBranch = await branch.save();
  }

  // Fetch the updated branch and return it to the client
  const branches = await Branch.find().populate('pos_machine').sort({ createdAt: -1 });

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

// Get POS machine by its id
export const getPosById = async (req, res) => {
  try {
    const branchId = req.params.branchId;

    // Find the branch by its id
    const branch = await Branch.findById(branchId).populate('pos_machine').exec();

    if (!branch) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Branch not found'
      });
    }

    // Find all the POS machines that are not in the branch
    const pos = await Pos.find({ branch: { $ne: branchId } });

    // Extract POS machines associated with the branch
    const posMachines = branch.pos_machine.map((posMachine) => ({
      value: posMachine._id,
      label: posMachine.alias
    }));

    res.status(200).json({
      status: 200,
      success: true,
      message: 'POS retrieved successfully',
      pos,
      posMachines
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

// Delete a branch
export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id).populate('pos_machine').exec();

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
    const deletedBranch = await Branch.findByIdAndDelete(req.params.id).populate('pos_machine').exec();

    // Fetch all branches and return them to the client
    const branches = await Branch.find().populate('pos_machine').sort({ createdAt: -1 });

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