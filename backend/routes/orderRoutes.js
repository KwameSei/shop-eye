import express from 'express';

import {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrderStatus
} from '../controllers/orderControllers.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/get-orders', getOrders);
router.get('/order/:id', getSingleOrder);
router.put('/update-order/:id', updateOrderStatus);

export default router;