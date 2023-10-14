import mongoose from "mongoose";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: [2, "Name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [emailRegex, "Please provide a valid email address"],
    index: true
  },
  phone: {
    type: String,
    // unique: true,
    match: [phoneRegex, "Please provide a valid phone number"],
    default: null,
    index: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select : false // Prevents password from being returned in response
  },
  address: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: "https://www.flaticon.com/free-icon/user_709722",
  },
  level: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  role: {
    type: String,
    default: "user",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  status: {
    type: String,
    default: "not_active",
  },
  activated_token: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
})

const User = mongoose.model("User", userSchema)

export default User;