import express from 'express';

import {
  createPos,
  getPos,
  getSinglePos,
  updatePos,
  deletePos,
  getPosByEmail,
  getPosBySerialNumber
} from '../controllers/posControllers.js';

const router = express.Router();

router.post('/create-pos', createPos);
router.get('/get-pos', getPos);
router.get('/get-single-pos/:id', getSinglePos);
router.put('/update-pos/:id', updatePos);
router.delete('/delete-pos/:id', deletePos);
router.get('/get-pos-by-email/:email', getPosByEmail);
router.get('/get-pos-by-serial-number/:serial_number', getPosBySerialNumber);

export default router;