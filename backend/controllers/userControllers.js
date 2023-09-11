import User from '../models/userModel.js';
// import Token from '../models/tokenModel.js';
import sendEmail from '../utils/email.js';
import cloudinary from 'cloudinary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  console.log("the token is: ", token);
  // Remove password from user object
  const { password: userPassword, ...userData } = user.toObject();
  console.log("the user data is: ", userData);
  res.status(statusCode).json({ success: true, roles: user.roles, token, user: userData });
  console.log("the response is: ", res);
};

export const registerUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const { name, email, password } = req.body;

    // Validate user input
    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        status: 400,
        message: 'All fields are required'
      })
    }

    // Check password length
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        status: 400,
        message: 'Password must be at least 6 characters long'
      })
    }

    // Convert email to lowercase
    const emailToLower = email.toLowerCase();

    // Check if user already exists
    const userExists = await User.findOne({ email: emailToLower });
    if (userExists) {
      res.status(400).json({
        success: false,
        status: 400,
        message: 'User already exists'
      })
    }

    const token = jsonwebtoken.sign(
      {
        name, email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN}
    );

    // const emailData = {
    //   subject: `Account activation link`,
    //   message: `
    //     <h1>Please use the following link to activate your account</h1>
    //     <p>${process.env.CLIENT_URL}/activate-account/${token}</p>
    //     <hr />
    //     <p>This email may contain sensitive information</p>
    //     <p>${process.env.CLIENT_URL}</p>
    //   `,
    //   send_to: email,
    //   sent_from: process.env.EMAIL_USER,
    //   reply_to: process.env.EMAIL_USER,
    // };

    const subject = 'Account activation link';
    const message = `
        <h1>Please use the following link to activate your account</h1>
        <p>${process.env.CLIENT_URL}/api/users/activate-account/${token}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `;
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = process.env.EMAIL_USER;

    req.body.activated_token = token;

    // await sendEmail(emailData);

    sendEmail(subject, message, send_to, sent_from, reply_to);

    const newUser = await User.create(req.body);

    res.status(201).json({
      success: true,
      status: 201,
      message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
      newUser
    })
    
    // const { name, email, password } = req.body;

    // // Validate user input
    // if (!email || !password || !name) {
    //   res.status(400)
    //   throw new Error('All fields are required');
    // }

    // // Check password length
    // if (password.length < 6) {
    //   res.status(400)
    //   throw new Error('Password must be at least 6 characters long');
    // }

    // // Convert email to lowercase
    // const emailToLower = email.toLowerCase();

    // // Check if user already exists
    // const userExists = await User.findOne({ email: emailToLower });
    // if (userExists) {
    //   res.status(400)
    //   throw new Error('User already exists');
    // }

    // // Encode password
    // const saltRounds = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // // Create user
    // const newUser = new User({
    //   name,
    //   email: emailToLower,
    //   password: hashedPassword,
    // });

    // // Save user to database
    // const savedUser = await newUser.save();

    // // Create token
    // const token = jwt.sign({ user: savedUser }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    // const response = {
    //   _id: savedUser._id,
    //   name: savedUser.name,
    //   email: savedUser.email,
    //   token
    // };

    // res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

// Activate user account
export const activateAccount = async (req, res) => {
  let token = req.params.token;

  try {
    if (token) {
      jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log('Error while verifying token', err);
          return res.status(400).json({
            success: false,
            status: 400,
            message: 'Incorrect or expired link'
          })
        }
      });

      let updatedFields = {
        status: 'active',
        activated_token: ''
      };

      let user = await User.findOneAndUpdate(
        { activated_token: token },
        updatedFields,
        { new: true }
      );
      
      res.status(200).json({
        success: true,
        status: 200,
        message: 'Account activated successfully',
        user
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: error.message,
      error: error.message
    })
  }
};

// Login user
export const loginUser = async (req, res) => {

    const { email, password } = req.body;

  try {
    // Validate user input
    if (!(email && password)) {
      res.status(400)
      throw new Error('All fields are required');
    }

    // Convert email to lowercase
    const emailToLower = email.toLowerCase();

    // Check if user exists
    const user = await User.findOne({ email: emailToLower }).select('+password');

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.status === 'active') {
          // Only allow login for active users
          const payload = {
            _id: user._id,
            name: user.name,
            level: user.level,
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
          });
          console.log(token);

          res.json({
            success: true,
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              level: user.level,
              avatar: user.avatar,
            },
            message: 'User logged in successfully',
          })
        } else if (user.status === 'not_active') {
          res.status(400).json({
            success: false,
            status: 400,
            message: 'Please activate your account first'
          })
        }
      } else {
        res.status(400).json({
          success: false,
          status: 400,
          message: 'Invalid email or password',
        })
      }
    }

    // if (!user) {
    //   res.status(400)
    //   throw new Error('User does not exist');
    // }

    // // Check if password is correct
    // const correctPassword = await bcrypt.compare(password, user.password);
    
    // if (!correctPassword) {
    //   res.status(400)
    //   throw new Error('Invalid email or password');
    // }

    // // Create token
    // sendTokenResponse(user, 200, res);
    
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
};

// Fetch user profile
// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       const { _id, name, email} = user;
//       res.status(200).json({
//         _id, name, email,
//       });
//     } else {
//       res.status(404)
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     res.status(400)
//     throw new Error(error);
//   }
// };

// Fetch user profile
export const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({
      success: false,
      status: 400,
      message: 'Invalid user id'
    })
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      const { _id, name, email, phone, address, level, avatar } = user;
      res.status(200).json({
        _id, name, email, phone, address, level, avatar
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
    // const user = await User.findById(req.user._id);
    // if (user) {
    //   user.name = req.body.name || user.name;
    //   user.email = email // disallowing user to change email
    //   // user.phone = req.body.phone || user.phone;
    //   // user.bio = req.body.bio || user.bio;
    //   // user.photo = req.body.photo || user.photo;

    //   // if (req.body.password) {
    //   //   // Encode password
    //   //   const saltRounds = await bcrypt.genSalt(10);
    //   //   const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    //   //   user.password = hashedPassword;
    //   // }

    //   const updatedUser = await user.save();
    //   const { name, email } = updatedUser;
    //   res.status(200).json({
    //     _id, name, email
    //   });
    // } else {
    //   res.status(404)
    //   throw new Error('User not found');

    const { name, email, phone, password, address, level } = req.body;
    const avatar = req.file.path;

    // Validate user input
    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        status: 400,
        message: 'All fields are required'
      })
    }
    
    // Check password length
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        status: 400,
        message: 'Password must be at least 6 characters long'
      })
    }

    // Convert email to lowercase
    const emailToLower = email.toLowerCase();

    // Find user
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        status: 404,
        message: 'User not found'
      })
    }

    // Update the user properties
    user.name = name || user.name;
    user.email = emailToLower || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.level = level || user.level;
    
    // Check if there is a new avatar
    if (req.file) {
      // Delete old avatar from cloudinary
      if (user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }
    }

    // Upload image to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'shop-eye/users',
      width: 150,
      crop: 'scale',
      use_filename: true,
      resource_type: 'auto'
    });

    console.log("the result is: ", result);

    // Update the user avatar
    user.avatar.url = result.secure_url || user.avatar.url;
    user.avatar.public_id = result.public_id || user.avatar.public_id;

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Fetch all users
    const users = await User.find({}).select('-password');  // exclude password from response

    // Send response
    res.status(200).json({
      success: true,
      status: 200,
      updatedUser,
      users,
      message: 'User updated successfully'
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: error.message,
      error: error.message
    })
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404)
      throw new Error('User not found');
    }

    // Delete user avatar from cloudinary
    if (user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    await user.remove();
    res.status(200).json({
      success: true,
      status: 200,
      message: 'User deleted successfully' 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: error.message,
      error: error.message
    })
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