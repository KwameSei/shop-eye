import express from 'express';
import upload from '../utils/imageUpload.js';
import { 
  getAllBranches, 
  getSingleBranch, 
  createBranch, 
  updateBranch, 
  deleteBranch,
  getPosById,
} from '../controllers/branchControllers.js';

const router = express.Router();

router.post('/create-branch', upload.single('image'), createBranch);
router.get('/get-branches', getAllBranches);
router.get('/branch/:id', getSingleBranch);
router.get('/:branchId/pos-machines', getPosById)
router.put('/branch/:id', upload.single('image'), updateBranch);
router.delete('/branch/:id', deleteBranch);

export default router;