const mongoose = require("../db_init");
const { String } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    ordererName: {
      type: String,
      required: true,
    },
    ordererEmail: {
      type: String,
      required: true,
    },
    ordererPhoneNumber: {
      type: String,
      required: true,
    },
    ordererAddress: {
      type: String,
      required: true,
    },
    ordererThink: {
      type: String,
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
