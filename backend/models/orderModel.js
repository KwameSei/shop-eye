import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unit_price: {
          type: Number,
          required: true,
        },
      }
    ],
    total_price: {
      type: Number,
      required: true,
    },
    total_items: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed", "Cash On Delivery", "Processing", "Dispatched", "Cancelled", "Completed"
      ]
    },
    payment_intent: {
      type: String,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    delivery_address: {
      type: String
    },
    delivery_status: {
      type: String
    },
    delivery_date: {
      type: Date
    },
    delivery_time: {
      type: String
    },
    delivery_fee: {
      type: Number
    },

  }, 
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;