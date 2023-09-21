import mongoose from 'mongoose';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

// Create user cart
export const createUserCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);

    let products = [];

    // Check if cart already exists
    const cartExists = await Cart.findOne({ user: req.user._id });
    if (cartExists) {
      cartExists.remove();
    }

    // Loop through cart items
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.quantity = cart[i].quantity;
      // object.color = cart[i].color;
      // object.size = cart[i].size;
      // object.unit_price = cart[i].price;
      // object.total_price = cart[i].price * cart[i].quantity;
      let getPrice = await Product.findById(cart[i]._id).select('unit_price').exec();
      object.unit_price = getPrice.unit_price;
      products.push(object);
    }
    console.log("the products are: ", products);

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].unit_price * products[i].quantity;
    }

    // Create new cart
    const newCart = await Cart.create({
      user: req.user?._id,
      cart,
      products,
      total_price: cartTotal,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Cart created successfully',
      newCart,
    });
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
};

// Get user cart
export const getUserCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      'products.product'
      );
    if (cart) {
      res.status(200).json({
        status: 200,
        success: true,
        cart
      });
    } else {
      res.status(404)
      throw new Error('Cart not found');
    }
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
}

// Get empty cart
export const getEmptyCart = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.id);
  try {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.remove();
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Cart emptied successfully'
      });
    } else {
      res.status(404)
      throw new Error('Cart not found');
    }
  } catch (error) {
    res.status(400)
    throw new Error(error);
  }
}
