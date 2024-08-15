const Order = require("../schema/order.schema");

const createOrder = async (order) => {
  try {
    const createdOrder = await Order.create(order);
    console.log(createdOrder);
    return createdOrder;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createOrder,
};
