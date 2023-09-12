import mongoose from "mongoose";
import Supplier from "../models/supplierSchema.js";

// Create supplier
export const createSupplier = async (req, res) => {
  const { name, address, phone, email, vat } = req.body;
  console.log('Received request body:', req.body);

  try {
    // Check if email is present in the request body
    if (!email) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email is required",
      });
    }
    
    const emailToLower = email.toLowerCase();

    // Check if supplier already exists
    const supplierExists = await Supplier.findOne({ email: emailToLower });
    if (supplierExists) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Supplier already exists",
      });
    }

    // Create new supplier
    const supplier = new Supplier({
      name,
      address,
      phone,
      email: emailToLower,
      vat,
    });

    // Save supplier
    const createdSupplier = await supplier.save();

    // Check if supplier was created
    if (createdSupplier) {
      res.status(201).json({
        status: 201,
        success: true,
        data: createdSupplier,
      });
    } else {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid supplier data",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  };
};

// Get all suppliers
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: 200,
      success: true,
      data: suppliers,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  };
}

// Get single supplier
export const getSingleSupplier = async (req, res) => {
  const supplierId = mongoose.Types.ObjectId(req.params.id);
  try {
    const supplier = await Supplier.findById({ _id: supplierId });
    res.status(200).json({
      status: 200,
      success: true,
      data: supplier,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  };
};

// Update supplier
export const updateSupplier = async (req, res) => {
  const supplierId = mongoose.Types.ObjectId(req.params.id);
  const { name, address, phone, email, vat } = req.body;

  try {
    const supplier = await Supplier.findById({ _id: supplierId });

    if (supplier) {
      supplier.name = name || supplier.name;
      supplier.address = address || supplier.address;
      supplier.phone = phone || supplier.phone;
      supplier.email = email || supplier.email;
      supplier.vat = vat || supplier.vat;

      const updatedSupplier = await supplier.save();

      res.status(200).json({
        status: 200,
        success: true,
        data: updatedSupplier,
      });
    } else {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Supplier not found",
      });
    };
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  };
};

// Delete supplier
export const deleteSupplier = async (req, res) => {
  const supplierId = mongoose.Types.ObjectId(req.params.id);

  try {
    const supplier = await Supplier.findById({ _id: supplierId });

    if (supplier) {
      await supplier.remove();
      res.status(200).json({
        status: 200,
        success: true,
        message: "Supplier deleted successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Supplier not found",
      });
    };
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  };
};