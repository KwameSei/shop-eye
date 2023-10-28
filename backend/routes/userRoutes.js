import express from 'express';
import {
  // activateAccount,
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
router.get('/get-profile/:id', getUserProfile);
// router.get('/activate-account/:token', activateAccount);
router.patch('/update-profile/:id', updateUserProfile)
router.patch('/change-password', changeUserPassword);
router.get('/loggedin', loggedIn);
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.get('/logout', logoutUser)

export default router;