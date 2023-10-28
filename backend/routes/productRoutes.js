import express from 'express';
import upload from '../utils/imageUpload.js';
import { 
  createProduct,
  deleteProduct,
  getProductsByCategory,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../controllers/productControllers.js';

const router = express.Router();

router.post('/create-product', upload.single('image'), createProduct);
router.get('/get-products', getProducts);
router.get('/product/:id', getSingleProduct);
router.get('/:id/products', getProductsByCategory);
router.put('/product/:id', upload.single('image'), updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;