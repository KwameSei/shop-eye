import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import slugify from 'slugify';
import Product from '../models/productModel.js';
import Category from '../models/product_categoryModel.js';

export const createProduct = async (req, res) => {
  const { name, stock, unit_price, carton_price, carton_size, slug } = req.body;
  const image = req.file.path;

  if (!image) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: 'Image is required'
    });
  }

  try {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: 'POS/products',
      width: 200,
      crop: 'scale',
      use_filename: true,
      resource_type: 'image'
    });

    // Slugify the name
    // if (req.body.name) {
    //   req.body.slug = slugify(req.body.name, {
    //     lower: true,
    //     strict: true
    //   });
    // }

    // Parse Selected Categories as an array
    const selectedProductCategories = Array.isArray(req.body.category)
      ? req.body.category 
      : [req.body.category];
    
    const product = new Product({
      name,
      stock,
      unit_price,
      carton_price,
      carton_size,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      image_mimetype: image.mimetype,
      category: selectedProductCategories,
      slug
    });

    await product.save();

    // Fetch the product from the database
    const products = await Product.find().populate('category').sort({ createdAt: -1 });

    if (!products) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'Products not found'
      });
    }

    // Calculate total stock by summing the stock of all products
    const totalStock = products.reduce((acc, product) => acc + product.stock, 0);

    // Calculate total unit price by summing the unit price of all products
    const totalUnitPrice = products.reduce((acc, product) => acc + product.unit_price, 0);

    // Calculate total carton price by summing the carton price of all products
    const totalCartonPrice = products.reduce((acc, product) => acc + product.carton_price, 0);

    // Calculate total carton size by summing the carton size of all products
    const totalCartonSize = products.reduce((acc, product) => acc + product.carton_size, 0);

    // Calculate total number of products
    const totalProducts = products.length;

    res.status(201).json({
      status: 201,
      success: true,
      product,
      products,
      totalStock,
      totalUnitPrice,
      totalCartonPrice,
      totalCartonSize,
      totalProducts,
      message: 'Product created successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error: error.message
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').sort({ createdAt: -1 });
    const categories = await Category.find();

    if (!products || !categories) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'Products or categories not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      products,
      categories
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error: error.message
    });
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = mongoose.Types.ObjectId(req.params.id);

  try {
    const product = await Product.findById(id).populate('category');

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = mongoose.Types.ObjectId(req.params.id);
  const { name, stock, unit_price, carton_price, carton_size } = req.body;
  const image = req.file.path;

  try {
    const product = await Product.findById(id).populate('category');

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'Product not found'
      });
    }

    if (req.body.name) {
      req.body.slug = slugify(req.body.name, {
        lower: true,
        strict: true
      });
    }

    if (image) {
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'POS/products',
        width: 200,
        crop: 'scale',
        use_filename: true,
        resource_type: 'image'
      });

      product.image.url = result.secure_url;
      product.image.public_id = result.public_id;
      product.image_mimetype = image.mimetype;
    }

    product.name = name || product.name;
    product.stock = stock || product.stock;
    product.unit_price = unit_price || product.unit_price;
    product.carton_price = carton_price || product.carton_price;
    product.carton_size = carton_size || product.carton_size;

    await product.save();

    // Fetch the product from the database
    const products = await Product.find().populate('category').sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      success: true,
      product,
      products,
      message: 'Product updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error: error.message
    });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = mongoose.Types.ObjectId(req.params.id).populate('category');

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'Product not found'
      });
    }

    await product.remove();

    // Fetch the product from the database
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      success: true,
      products,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error: error.message
    });
  }
}

export const searchProducts = async (req, res) => {
  const { search } = req.query;

  try {
    const products = await Product.find({ name: { $regex: search, $options: 'i' } });

    if (!products) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'Products not found'
      });
    }

    if (products.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'No product found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error: error.message
    });
  }
}

export const getProductsByCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'Category not found'
      });
    }

    // Find products that belong to this category
    const products = await Product.find({ category: id });

    if (products.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'No product found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      category,
      products,
      message: 'Products fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error: error.message
    })
  }
}