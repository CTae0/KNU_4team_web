//product.service.js 코드입니다.
const Product = require("../schema/product.schema");

const getProductList = async () => {
  try {
    const productList = await Product.find();
    //    console.log("productList: ", productList);

    return productList;
  } catch (err) {
    console.log(err);
  }
};
// const createUser = async (user) => {
//     try {
//         const createUser = await User.create(user);
//         console.log(createUser);
//     } catch(err) {
//         console.log(err);
//     }

// };
// const getUserByEmail = async (email) => {

//     try {
//         const user = await User.findOne({email});
//         console.log(user);
//         return user;
//     } catch(err) {
//         return null;
//     }

// };

module.exports = {
  getProductList,
};
