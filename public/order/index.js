const signinEmail = document.getElementById("signin_email");
const signinPassword = document.getElementById("signin_password");
const signinButton = document.getElementById("signin_button");

signupButton.addEventListener("click", async () => {
  const order = {
    email: signupEmail.value,
    password: singupPassword.value,
    nickname: signupNickname.value,
  };
  console.log(order);
  try {
    const signupResult = await fetch("/api/order/", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (signupResult.ok) {
      console.log(user);
      alert("회원가입 성공");
    } else {
      alert("(!)회원가입 실패");
    }
  } catch (err) {
    console.error(err);
  }
});
