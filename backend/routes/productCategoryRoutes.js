import express from 'express';

import {
  createProductCategory,
  getProductCategories,
  getSingleProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductsByCategory
} from '../controllers/productCategoryControllers.js';

const router = express.Router();

router.post('/create-product-category', createProductCategory);
router.get('/get-product-categories', getProductCategories);
router.get('/product-category/:id', getSingleProductCategory);
router.get('/category/:id/products', getProductsByCategory);
router.put('/product-category/:id', updateProductCategory);
router.delete('/product-category/:id', deleteProductCategory);
export default router;