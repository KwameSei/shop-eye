import mongoose from 'mongoose';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const posSchema = new mongoose.Schema({
  alias: {
    type: String,
    trim: true,
    required: [true, "Please enter a POS alias"]
  },
  serial_number: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [emailRegex, "Please provide a valid email address"],
    index: true,
    lowercase: true,
    trim: true
  },
  branch:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch"
    }
}, { 
  timestamps: true
});

const Pos = mongoose.model("POS", posSchema);

export default Pos;