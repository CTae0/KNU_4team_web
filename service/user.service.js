const User = require("../schema/user.schema");

const createUser = async (user) => {
  try {
    const createUser = await User.create(user);
    console.log(createUser);
  } catch (err) {}
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    return null;
  }
};

const getUser = async (email, password) => {
  const user = await User.findOne({});
};

module.exports = {
  createUser,
  getUserByEmail,
};
