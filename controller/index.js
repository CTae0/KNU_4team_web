const userController = require("./user.controller");
const productController = require("./product.controller");
const apiController = require("express").Router();

apiController.use("/user", userController);
apiController.use("/product", productController);

module.exports = apiController;
