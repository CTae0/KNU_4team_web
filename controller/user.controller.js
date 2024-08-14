//user.controller.js
const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../service/user.service");
const userController = require("express").Router();
const jwt = require("jsonwebtoken");
// userController.patch("/changepassword", (req, res) => {

// })

userController.post("/signin", async (req, res) => {
  // 사용자로부터 email과 password를 받음
  const email = req.body.email;
  const password = req.body.password;
  // email 혹은 password 둘중에 하나라도 없으면? 나가라
  if (!email || !password) {
    return res
      .status(400)
      .json({ result: false, message: "(!)로그인 정보가 올바르지 않습니다." });
  }
  // email을 기준으로 DB에서 유저 데이터를 꺼내와야 함

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ result: true, message: "로그인실패" });
  }

  console.log("컨트롤러", user);

  //User가 실제 있는 구간
  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (isValidPassword) {
    try {
      const token = jwt.sign(
        { email: user.email, nickname: user.nickname },
        process.env.JWT_SECRET
      );

      if (!token) {
        console.error("JWT 토큰 생성 실패");
        return res.status(500).json({
          result: false,
          message: "토큰 생성에 실패했습니다.",
        });
      }

      return res.status(200).json({
        result: true,
        message: "로그인 성공",
        token: token,
        user: email,
      });
    } catch (error) {
      console.error("JWT 생성 중 오류:", error);
      return res.status(500).json({
        result: false,
        message: "서버 오류로 토큰 생성에 실패했습니다.",
      });
    }
  }
});

userController.post("/mypage", async (req, res) => {
  const { token } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ isVerify: false, message: "Invalid token" });
    else return res.status(200).json({ isVerify: true });
  });
});
userController.post("/", async (req, res) => {
  const { email, password, nickname } = req.body;
  // 1) Email 검증
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ isError: true, message: " 잘못된 Email 형식입니다." });
  }

  // 2) password 검증
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ isError: true, message: " 잘못된 Password 형식입니다." });
  }

  // 3) Nickname 검증

  if (nickname.length < 2) {
    return res
      .status(400)
      .json({ isError: true, message: "닉네임은 두 글자 이상이어야 합니다." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = {
    //email, == email: email,
    email: email,
    nickname: nickname,
    password: hashedPassword,
  };
  try {
    await createUser(user);
    return true;
  } catch (err) {
    return false;
  }
});

module.exports = userController;
