const bcrypt = require('bcryptjs');
const { createUser } = require('../service/user.service');
const userController = require("express").Router();
// userController.patch("/changepassword", (req, res) => {

// })

userController.post("/", async (req, res) => {
    const { email, password, nickname } = req.body;
    // 1) Email 검증
    if (!email.includes("@")) {
        return res.status(400).json({isError: true, message: " 잘못된 Email 형식입니다."});
    }
    
    // 2) password 검증
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)){
        return res.status(400).json({isError: true, message: " 잘못된 Password 형식입니다."});
    } 

    // 3) Nickname 검증

    if(nickname.length < 2) {
        return res.status(400).json({isError: true, message: "닉네임은 두 글자 이상이어야 합니다."});
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    const user = {
        //email, == email: email,
        email: email,
        nickname: nickname,
        password: hashedPassword
    };
    try {
       await createUser(user);    
       return true;
    } catch (err) {
        return false;   
    }
    
});

module.exports = userController;