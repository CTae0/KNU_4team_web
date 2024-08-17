const productController = require("./product.controller");
const userController = require("./user.controller");
const orderController = require("./order.controller");
const apiController = require("express").Router();

apiController.use("/user", userController);
apiController.use("/order", orderController);
apiController.use("/product", productController);

module.exports = apiController;
