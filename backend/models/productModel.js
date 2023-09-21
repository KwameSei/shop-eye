import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true
      },
      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      stock: {
        type: Number,
        required: true
      },
      unit_price: {
        type: Number,
        required: true
      },
      carton_price: {
        type: Number,
      },
      carton_size: {
        type: Number,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      brand: {
        type: String
      },
      description: {
        type: String,
      },
      sold: {
        type: Number,
        default: 0
      },
      image: {
        url: String,
        public_id: String,
      },
      image_mimetype: {
        type: String,
      },
    }, 
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;