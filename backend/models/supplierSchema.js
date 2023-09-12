import mongoose from "mongoose";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const supplierSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: String,
    phone: {
      type: String,
      match: [phoneRegex, 'Please fill a valid phone number'],
      required: [true, 'User phone number required']
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      match: [emailRegex, "Please provide a valid email address"],
      index: true
    },
    vat: Number,
}, {
  timestamps: true
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;