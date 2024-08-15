document.addEventListener("DOMContentLoaded", async () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  setInterval(nextSlide, 3000); // 3초 간격으로 슬라이드

  showSlide(slideIndex); // 초기 슬라이드 표시

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
      if (result.isVerify) {
        document.querySelector(".signup").style.display = "none";
        document.querySelector(".login").style.display = "none";
        document.querySelector(".cart").style.display = "block";
        document.querySelector(".mypage").style.display = "block";
        document.querySelector(".logout").style.display = "block";
      }
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
  const logoutButton = document.querySelector(".logout");
  logoutButton.addEventListener("click", async () => {
    await localStorage.removeItem("token");
    alert("로그아웃에 성공하였습니다.");
    location.reload();
  });

  const logoButton = document.querySelector(".logo");
  logoButton.addEventListener("click", async () => {
    await window.location.reload();
  });
});
