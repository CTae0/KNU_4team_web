const productController = require("express").Router();

const dummyData = Array.from({ length: 30 }, (_, index) => {
  const product = {
    title: `product-title-${index + 1}`,
    description: `product-description-${index + 1}`,
    imgUrl: `https://picsum.photos/id/${index + 1}/200/300`,
    price: Math.floor(Math.random() * 90000 + 10000),
    stock: Math.ceil(Math.random() * 100),
  };
  return product;
});

productController.get("/", (req, res) => {
  return res.json({ result: true, data: dummyData });
});

module.exports = productController;
