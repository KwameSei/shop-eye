import mongoose from 'mongoose';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const posSchema = new mongoose.Schema({
  alias: String,
  serial_number: String,
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [emailRegex, "Please provide a valid email address"],
    index: true
  },
}, { 
  timestamps: true 
});

const Pos = mongoose.model("POS", posSchema);

export default Pos;