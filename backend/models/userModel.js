import mongoose from "mongoose";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z)]{2,}))$/;
const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const userSchema = mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select : false // Prevents password from being returned in response
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
    unique: true,
    match: [phoneRegex, "Please provide a valid phone number"],
  },
  photo: {
    type: String,
    required: [true, "Please upload your photo"],
    default: "https://www.flaticon.com/free-icon/user_709722",
  },
  bio: {
    type: String,
    maxLength: [500, "Bio cannot be more than 500 characters long"],
  },
}, {
  timestamps: true,
})

const User = mongoose.model("User", userSchema)

export default User;