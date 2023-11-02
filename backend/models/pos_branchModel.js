import mongoose from 'mongoose';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    match: [emailRegex, 'Please fill a valid email address for your shop'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password need to be longer'],
  },
  phone: {
    type: String,
    match: [phoneRegex, 'Please fill a valid phone number'],
    trim: true,
    required: [true, 'Shop phone number required']
  },
  role: {
    type: String,
    default: 'seller',
  },
  image: {
    url: String,
    public_id: String,
  },
  image_mimetype: {
    type: String,
  },
  pos_machine:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'POS'
    }
  ],
},
  { timestamps: true }
);

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;