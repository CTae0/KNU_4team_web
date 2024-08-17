document.addEventListener("DOMContentLoaded", async () => {
  try {
    const getToken = localStorage.getItem("token");
    const tokenCheck = await fetch("/api/user/token", {
      method: "post",
      body: JSON.stringify({ getToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (tokenCheck.ok) {
      const result = await tokenCheck.json();
      console.log(result.isVerify);
      if (!result.isVerify) {
        alert("로그인 후 이용해주세요.");
        window.location.href = "../signin"; // 로그인 페이지로 리다이렉트
      }
      console.log(result);
    } else {
      alert("로그인 후 이용해주세요.");
      window.location.href = "../signin/";
    }
  } catch (err) {
    console.log(err);
    alert("(!) 로그인 오류");
    window.location.href = "../signin/"; // 로그인 페이지로 리다이렉트
  }
  // api call
  // ---> token 인증 결과값을 {isVerifed: boolean}
  // if(isVerfied){
  //
  // } else { location.href = "/signin" }
  // 현재 사용 자의 정보 표시
  const userEmail = document.getElementById("user_email");
  const userNickname = document.getElementById("user_nickname");
  const newNicknameInput = document.getElementById("new_nickname");
  const changeNicknameButton = document.getElementById(
    "change_nickname_button"
  );
  const logoutButton = document.getElementById("logout_button");

  // 로그인 시 클라이언트 측에서 임의로 사용자 정보 설정 (테스트용)
  userEmail.textContent = "user@example.com"; // 실제 사용자의 이메일
  userNickname.textContent = "CurrentNickname"; // 실제 사용자의 닉네임

  // 닉네임 변경 버튼 클릭 이벤트
  changeNicknameButton.addEventListener("click", () => {
    const newNickname = newNicknameInput.value;
    if (newNickname) {
      // 서버와의 실제 통신 없이 임시로 업데이트 (테스트용)
      userNickname.textContent = newNickname;
      newNicknameInput.value = "";
      alert("Nickname updated successfully!");
    } else {
      alert("Please enter a new nickname.");
    }
  });

  // 로그아웃 버튼 클릭 이벤트
  logoutButton.addEventListener("click", async () => {
    // 실제 로그아웃 로직 (서버와 통신 필요)
    await localStorage.removeItem("token");
    await localStorage.removeItem("cart");
    alert("로그아웃 하였습니다.");
    window.location.href = "../signin/"; // 로그인 페이지로 리다이렉트
  });
});
