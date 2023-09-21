import mongoose from "mongoose";
import Category from "../models/product_categoryModel.js";
import Product from "../models/productModel.js";

export const createProductCategory = async (req, res) => {
  try {
    let product_category = await Category.create(req.body);

    // Update associated products with this product category's ObjectId
    const { productIds } = req.body;
    if (productIds && Array.isArray(productIds)) {
      const updatePromises = productIds.map(async (productId) => {
        const product = await Product.findById(productId);
        if (product) {
          product.product_category.push(product_category._id);
          await product.save();
        }
      });
      await Promise.all(updatePromises);
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Category created successfully",
      product_category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

export const getProductCategories = async (req, res) => {
  try {
    let product_category = await Category.find({}).sort({ createdAt: -1 }); // sort by most recent

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Categories retrieved successfully",
      product_category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

// Get a single product category
export const getSingleProductCategory = async (req, res) => {
  try {
    let product_category = await Category.findById({ _id: req.params.id });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Category retrieved successfully",
      product_category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

// Update a product category
export const updateProductCategory = async (req, res) => {
  const productId = mongoose.Types.ObjectId(req.params.id);

  if (!productId) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid product category id",
    });
  }

  try {
    const { name } = req.body;
    console.log(req.body);

    const product_category = await Category.findById(productId);
    console.log('Product category', product_category);

    if (!product_category) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Product category not found",
      });
    }

    // Update associated products with this product category's ObjectId
    product_category.name = name || product_category.name;

    // Update the associated products
    const { productIds } = req.body;
    if (productIds && Array.isArray(productIds)) {
      const updatePromises = productIds.map(async (productId) => {
        const product = await Product.findById(productId);
        if (product) {
          product.product_category.push(product_category._id);
          await product.save();
        }
      });
      await Promise.all(updatePromises);
    }

    // Save the updated product category
    const updatedCategory = await product_category.save();
    console.log('This is the updated category', updatedCategory)

    // Fetch all product categories
    const categories = Product.find({});
    console.log("Categories", categories);

    res.status(200).json({
      success: true,
      status: 200,
      message: "POS updated successfully",
      updatedPos,
      poss,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  } 
};

// Delete a product category
export const deleteProductCategory = async (req, res) => {
  const categoryId = mongoose.Types.ObjectId(req.params.id);
  try {
    let product_category = await Category.findByIdAndDelete({
      _id: categoryId,
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Category deleted successfully",
      product_category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    let product_category = await Category.findById({ _id: req.params.id });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Category retrieved successfully",
      product_category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  } 
}