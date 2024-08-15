const User = require("../schema/user.schema");

const createUser = async (user) => {
  try {
    const createUser = await User.create(user);
    console.log(createUser);
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (email, password, token) => {
  const user = await User.findOne({});
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    console.log(user);
    return user;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
