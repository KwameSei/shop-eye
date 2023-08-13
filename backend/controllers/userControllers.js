import User from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import sendEmail from '../utils/email.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400)
      throw new Error('All fields are required');
    }

    // Check password length
    if (password.length < 6) {
      res.status(400)
      throw new Error('Password must be at least 6 characters long');
    }

    // Convert email to lowercase
    const emailToLower = email.toLowerCase();

    // Check if user already exists
    const userExists = await User.findOne({ email: emailToLower });
    if (userExists) {
      res.status(400)
      throw new Error('User already exists');
    }

    // Encode password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await User.create({
      name,
      email: emailToLower,
      password: hashedPassword,
      phone
    });

    // Create token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      sameSite: 'none',
      secure: true
    });

    if (user) {
      const { _id, name, email, photo, phone, bio } = user;
      res.status(201).json({
        _id, name, email, photo, phone, bio, token
      });
    } else {
      res.status(400)
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400)
      throw new Error('All fields are required');
    }

    // Convert email to lowercase
    const emailToLower = email.toLowerCase();

    // Check if user exists
    const user = await User.findOne({ email: emailToLower });

    if (!user) {
      res.status(400)
      throw new Error('User does not exist');
    }

    // Check if password is correct
    const correctPassword = await bcrypt.compare(password, user.password);
    
    if (user && correctPassword) {
      // Create token
      const token = generateToken(user._id);

      // Send HTTP-only cookie
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        sameSite: 'none',
        secure: true
      });

      // Send response
      const { _id, name, email, photo, phone, bio } = user;
      res.status(200).json({
        _id, name, email, photo, phone, bio, token
      });
    } else {
      res.status(400)
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
};

// Fetch user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const { _id, name, email, photo, phone, bio } = user;
      res.status(200).json({
        _id, name, email, photo, phone, bio
      });
    } else {
      res.status(404)
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = email // disallowing user to change email
      user.phone = req.body.phone || user.phone;
      user.bio = req.body.bio || user.bio;
      user.photo = req.body.photo || user.photo;

      // if (req.body.password) {
      //   // Encode password
      //   const saltRounds = await bcrypt.genSalt(10);
      //   const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      //   user.password = hashedPassword;
      // }

      const updatedUser = await user.save();
      const { name, email, photo, phone, bio } = updatedUser;
      res.status(200).json({
        _id, name, email, photo, phone, bio
      });
    } else {
      res.status(404)
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
};

// Change user password
export const changeUserPassword = async (req, res) => {
  const user = await User.findById(req.user._id); // req.user is set by protect middleware

  const { oldPassword, newPassword } = req.body;

  if(!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Validate user input
  if (!oldPassword || !newPassword) {
    res.status(400)
    throw new Error('All fields are required');
  }

  // Check if old password is correct
  const correctPassword = await bcrypt.compare(oldPassword, user.password);
  
  if (!correctPassword) {
    res.status(400)
    throw new Error('Old password is incorrect');
  }

  // Check password length
  if (newPassword.length < 6) {
    res.status(400)
    throw new Error('Password must be at least 6 characters long');
  }
  
  // Save new password
  if (user && correctPassword) {
    // Encode password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } else {
    res.status(400)
    throw new Error('Old password is incorrect');
  }
};

// Login Status
export const loggedIn = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({ loggedIn: false });
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.status(200).json({ loggedIn: true });
  } else {
    return res.status(200).json({ loggedIn: false });
  }
};

// Reset password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // Find user
  const user = await User.findOne({ email });
  // Check if user exists
  if (!user) {
    res.status(400)
    throw new Error('User does not exist');
  }

  // Delete any existing reset tokens
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create reset token
  const resetToken = crypto.randomBytes(32).toString('hex') + user._id;
  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  // Save reset token to database
  await new Token({
    userId: user._id,
    token: resetPasswordToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 60 * 1000 // 30 minutes
  }).save();

  // Send reset password email
  const resetPasswordURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // Send email
  const subject = 'Reset your password';
  const message = `
    <h1>Reset your password</h1>
    <h2>Hello ${user.name}</h2>
    <p>Please click the link below to reset your password</p>
    <p>The reset link is valid for 30 minutes</p>
    <a href="${resetPasswordURL}" clicktracking=off>${resetPasswordURL}</a>
    <p>If you did not request a password reset, please ignore this email</p>
    <p>Regards, <br />Shop Eye Team</p>
    `
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER; // your email address

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
}

// Reset password
export const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  // Check if token exists
  if (!resetToken) {
    res.status(400)
    throw new Error('Invalid token');
  }

  // Check if token is valid
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Find token in database
  const userToken = await Token.findOne({ token: hashedToken, expiresAt: { $gt: Date.now() } });

  // Check if token exists
  if (!userToken) {
    res.status(404)
    throw new Error('Invalid token or token expired');
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({ message: 'Password reset successfully' });
};

// Logout user
export const logoutUser = (req, res) => {
  // res.clearCookie('token');
  // res.status(200).json({ message: 'User logged out successfully' });

  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(Date(0)),
    sameSite: 'none',
    secure: true
  });
  res.status(200).json({ message: 'User logged out successfully' });
};