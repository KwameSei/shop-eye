import express from 'express';
import {
  createUserCart,
  getUserCart,
  getEmptyCart
} from '../controllers/cartControllers.js';

const router = express.Router();

router.post('/create-cart', createUserCart);
router.get('/get-cart/:id', getUserCart);
router.get('/empty-cart/:id', getEmptyCart);

export default router;