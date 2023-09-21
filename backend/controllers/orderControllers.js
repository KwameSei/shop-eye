import mongoose from "mongoose";
import uniqid from "uniqid";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    const { _id } = req.user;
    const user = await User.findById({user: _id});
    const userCart = await Cart.findOne({ user: req._id });

    let finalAmount = 0;

    if (userCart.total_after_discount) {
      finalAmount = userCart.total_after_discount * 100;
    } else {
      finalAmount = userCart.total_price * 100;
    }

    let newOrder = await new Order({
      products: userCart.products,
      payment_intent: {
        id: uniqid(),
        amount: finalAmount,
        currency: "GHC",
        status: "Not Processed",
        created: Date.now(),
        payment_method_types: ["cash"],
      },
      orderStatus: "Not Processed",
      orderedBy: user._id,
    }).save();

    // Decrease quantity, increase sold
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      };
    });

    let updated = await Product.bulkWrite(bulkOption, {});

    res.status(200).json({
      status: 200,
      success: true,
      message: "Order created successfully",
      newOrder,
      updated
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("products.product")
      .populate("orderedBy")
      .exec();

    res.status(200).json({
      status: 200,
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  } 
};

// Get a single order
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product")
      .populate("orderedBy")
      .exec();

    if (!order) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      order,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        orderStatus: status,
        delivery_status: status,
        delivery_date: Date.now()
      },
      { new: true }
    ).exec();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Order status updated successfully",
      updated,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};