const Product = require("../schema/product.schema");
const { getProductList } = require("../service/product.service");
const productController = require("express").Router();

productController.get("/", async (req, res) => {
  const productList = await getProductList();
  console.log(productList);
  return res.json({ result: true, data: productList });
});

module.exports = productController;
