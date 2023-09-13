import mongoose from 'mongoose';

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
  phone: {
    type: String,
    match: [phoneRegex, 'Please fill a valid phone number'],
    trim: true,
    required: [true, 'User phone number required']
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