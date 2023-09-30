import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import sendToken from '../utils/jwtToken.js';

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // Check if token exists
    if (!token) {
      res.status(401)
      throw new Error('Not authorized to access this route');
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from token
    const user = await User.findById(verified.id).select('-password');
    // Check if user exists
    if (!user) {
      res.status(404)
      throw new Error('No user found');
    }
    // Set user to req.user
    req.user = user;

    next();
    
  } catch (error) {
    res.status(401)
    throw new Error(error.message);
  }
};