import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  totalProducts: {
    type: Number,
    required: true,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
