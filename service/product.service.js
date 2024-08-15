const Product = require("../schema/product.schema");

const getProductList = async () => {
  try {
    const productList = await Product.find();

    return productList;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getProductList,
};
