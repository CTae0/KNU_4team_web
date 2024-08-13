const User = require("../schema/user.schema")

const createUser = async (user) => {
    try {
        const createUser = await User.create(user);
        console.log(createUser);
    } catch(err) {

    }
    
};

const getUser = async (email, password) => {
    const user = await User.findOne({});
}

module.exports = {
    createUser,
}