import express from 'express';
import {
  getAllSuppliers,
  getSingleSupplier,
  deleteSupplier,
  createSupplier,
  updateSupplier,
} from '../controllers/supplierControllers.js';

const router = express.Router();

router.post('/create-supplier', createSupplier);
router.get('/get-all-suppliers', getAllSuppliers);
router.get('/get-single-supplier/:id', getSingleSupplier);
router.delete('/delete-supplier/:id', deleteSupplier);
router.put('/update-supplier/:id', updateSupplier);

export default router;