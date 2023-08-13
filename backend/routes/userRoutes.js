import express from 'express';
import { 
  changeUserPassword,
  forgotPassword,
  getUserProfile, 
  loggedIn, 
  loginUser, 
  logoutUser, 
  registerUser, 
  resetPassword, 
  updateUserProfile 
} from '../controllers/userControllers.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-profile', getUserProfile);
router.patch('/update-profile', updateUserProfile)
router.patch('/change-password', changeUserPassword);
router.get('/loggedin', loggedIn);
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.get('/logout', logoutUser)

export default router;