import mongoose from 'mongoose';
import Pos from '../models/posModel.js';
import Branch from '../models/pos_branchModel.js';

export const createPos = async (req, res) => {
  try {
    let pos = await Pos.create(req.body);

    // Update associated branches with this POS machine's ObjectId
    const { branchIds } = req.body;
    if (branchIds && Array.isArray(branchIds)) {
      const updatePromises = branchIds.map(async (branchId) => {
        const branch = await Branch.findById(branchId);
        if (branch) {
          branch.pos_machine.push(pos._id);
          await branch.save();
        }
      });
      await Promise.all(updatePromises);
    }
    
    res.status(200).json({
      success: true,
      status: 200,
      message: "POS created successfully",
      pos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

export const getPos = async (req, res) => {
  try {
    let pos = await Pos.find({}).sort({ createdAt: -1 }); // sort by most recent
    
    res.status(200).json({
      success: true,
      status: 200,
      message: "POS retrieved successfully",
      pos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

// Get a single POS
export const getSinglePos = async (req, res) => {
  try {
    let pos = await Pos.findById({_id: req.params.id});
    
    res.status(200).json({
      success: true,
      status: 200,
      message: "POS retrieved successfully",
      pos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

// Update a POS
export const updatePos = async (req, res) => {
  const posId = mongoose.Types.ObjectId(req.params.id);

  // Check if posId is a valid ObjectId
  if (!posId) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid POS ID",
    });
  }

  try {
    const { alias, serial_number, email} = req.body;
    console.log(req.body);
    // Find the POS by id
    let pos = await Pos.findById(posId);
    console.log("This is pos", pos);

    if (!pos) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "POS not found",
      });
    }

    // Update the POS
    pos.alias = alias || pos.alias;
    pos.serial_number = serial_number || pos.serial_number;
    pos.email = email || pos.email;

    // Update associated branches
    const { branchIds } = req.body;
    if (branchIds && Array.isArray(branchIds)) {
      const updatePromises = branchIds.map(async (branchId) => {
        const branch = await Branch.findById(branchId);
        if (branch) {
          branch.pos_machine.push(pos._id);
          await branch.save();
        }
      });
      await Promise.all(updatePromises);
    }

    // Save the POS
    const updatedPos = await pos.save();
    console.log("This is updatedPos", updatedPos);

    // Fetch all POSs
    const poss = await Pos.find({});  // sort by most recent
    console.log("This is poss", poss);

    res.status(200).json({
      success: true,
      status: 200,
      message: "POS updated successfully",
      updatedPos,
      poss,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}
// Delete a POS
export const deletePos = async (req, res) => {
  try {
    let pos = await Pos.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      success: true,
      status: 200,
      message: "POS deleted successfully",
      pos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

// Get POS by email
export const getPosByEmail = async (req, res) => {
  try {
    let pos = await Pos.find({ email: req.params.email });

    res.status(200).json({
      success: true,
      status: 200,
      message: "POS retrieved successfully",
      pos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

// Get POS by serial number
export const getPosBySerialNumber = async (req, res) => {
  try {
    let pos = await Pos.find({ serial_number: req.params.serial_number });

    res.status(200).json({
      success: true,
      status: 200,
      message: "POS retrieved successfully",
      pos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};