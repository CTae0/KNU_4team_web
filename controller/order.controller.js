const { createOrder } = require("../service/order.service");
const orderController = require("express").Router();

orderController.post("/", async (req, res) => {
  const {
    ordererName,
    ordererEmail,
    ordererPhone,
    shippingName,
    shippingAddress,
    shippingPhone,
  } = req.body;

  // 필드 검증
  if (
    !ordererName ||
    !ordererEmail ||
    !ordererPhone ||
    !shippingName ||
    !shippingAddress ||
    !shippingPhone
  ) {
    return res.status(400).json({
      result: false,
      message: "모든 필드를 입력해야 합니다.",
    });
  }

  // 전화번호가 숫자인지 확인하는 부분 수정
  if (isNaN(Number(ordererPhone)) || isNaN(Number(shippingPhone))) {
    return res.status(400).json({
      result: false,
      message: "잘못된 전화번호 형식입니다.",
    });
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(ordererEmail)) {
    return res.status(400).json({
      result: false,
      message: "잘못된 이메일 형식입니다.",
    });
  }

  try {
    const order = {
      ordererName,
      ordererEmail,
      ordererPhone,
      shippingName,
      shippingAddress,
      shippingPhone,
    };

    await createOrder(order);

    return res.status(201).json({
      result: true,
      message: "주문이 성공적으로 생성되었습니다.",
    });
  } catch (error) {
    console.error("주문 생성 오류:", error);
    return res.status(500).json({
      result: false,
      message: "주문 생성에 실패하였습니다.",
    });
  }
});

module.exports = orderController;
