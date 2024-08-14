const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../service/user.service");
const userController = require("express").Router();

userController.post("/signin", async (req, res) => {
  const body = req.body;
  // 사용자로부터 email과 password를 받음
  const email = body.email;
  const password = body.password;
  // email 혹은 password 둘중에 하나라도 없으면? 나가라
  if (!email || !password) {
    return res
      .status(400)
      .json({ result: false, message: "(!)로그인 정보가 올바르지 않습니다." });
  }
  // email을 기준으로 DB에서 유저 데이터를 꺼내와야 함.
  const user = await getUserByEmail(email);
  // 만약 유저 정보가 없다면 나가라.
  if (!user) {
    return res
      .status(404)
      .json({ result: false, message: "(!)회원정보가 없습니다." });
  }
  // User가 실제 있는 구간
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (isValidPassword) {
    const token = jwt.sign(
      { email: user.email, nickname: user.nickname },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ result: true, message: "로그인 성공", token });
  } else {
    return res
      .status(400)
      .json({ result: false, message: "(!)비밀번호가 올바르지 않습니다." });
  }
});

userController.post("/", async (req, res) => {
  const { email, password, nickname } = req.body;
  console.log(req.body);

  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 email 입니다." });
  }
  // 2) password 검증
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 비밀번호 형식입니다." });
  }
  // 3) nickname 검증
  if (nickname.length < 2) {
    return res
      .status(400)
      .json({ isError: true, message: "잘못된 비밀번호 형식입니다." });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = {
    email,
    nickname,
    password: hashedPassword,
  };
  try {
    await createUser(user);
    return res.status(201).json({ result: true });
  } catch (err) {
    return res.status(500).json({ result: false });
  }
});

userController.post("/token", async (req, res) => {
  const token = req.body.getToken;
  console.log("token", token);
  if (token) {
    await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(402)
          .json({ isVerify: false, message: "사용자 인증에 실패하였습니다." });
      } else
        return res.status(200).json({
          isVerify: true,
          message: "사용자 인증에 성공하였습니다.",
          decoded,
        });
    });
  } else {
    return res.status(404).json({ message: "토큰이 없습니다. " });
  }
});

module.exports = userController;
