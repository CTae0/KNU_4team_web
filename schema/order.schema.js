const mongoose = require("../db_init");
const { String } = mongoose.Schema.Types;
const orderSchema = new mongoose.Schema(
  {
    ordererName: {
      //user
      type: String,
      required: true,
    },
    ordererEmail: {
      type: String,
      required: true,
    },
    ordererPhone: {
      type: String,
      required: true,
    },
    shippingName: {
      type: String,
      required: true,
    },
    shippingName: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    recipientPhoneNum: {
      type: String,
      required: true,
    },
    Products: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
