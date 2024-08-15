const fetchProductList = async () => {
  try {
    const fetchResult = await fetch("/api/product/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (fetchResult.ok) {
      const result = await fetchResult.json();
      console.log("fetchResult 전송", result.data);
      return result.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

const productListWrapper = document.getElementById("product-detail");

const renderProductList = async () => {
  const productList = await fetchProductList();
  if (!productList || productList.length === 0) {
    console.log("empty productList");
    return;
  }
  const queryString = window.location.search;
  const productNumberMatch = queryString.match(/\d+/);
  const productNumber = productNumberMatch ? productNumberMatch[0] : "";
  console.log("productNumber: ", productNumber);
  const v = productList[productNumber];
  const itemElem = document.createElement("div");
  console.log(productList[0]);
  itemElem.innerHTML = `
    <div class="product-img">
        <img src="${v.imgUrl}" alt="${
    v.title
  }" style="max-width: 100%; height: auto;"/>
    </div>
    <div class="product-info">
        <div>[상품번호]: ${v.productId + 1} 번</div>
        <div>${v.title}</div>
        <div>[가격]: ${v.price}</div>
        <div>[상세설명]: ${v.description}</div>
        <div>[재고]: ${v.stock}</div>
        <div>[구매수량]: <input type="number" id="purchase-quantity" min="1" value="1" /></div>
        <div id="quantity-error" style="color: red; display: none;">수량을 초과하였습니다.</div>
    </div>
    <div class="button-container">
        <button class="button" id="add-to-cart-button">장바구니</button>
        <button class="button checkout" id="checkout-button">결제</button>
    </div>
  `;
  productListWrapper.append(itemElem);

  // 구매수량 input 요소
  const quantityInput = document.getElementById("purchase-quantity");
  const errorElem = document.getElementById("quantity-error");

  // 구매수량이 재고보다 높으면 오류 메시지 표시하는 이벤트 리스너
  quantityInput.addEventListener("input", () => {
    if (quantityInput.value > v.stock) {
      errorElem.style.display = "block";
    } else {
      errorElem.style.display = "none";
    }
  });

  // 장바구니 버튼 요소
  const addToCartButton = document.getElementById("add-to-cart-button");

  addToCartButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);

    // 수량이 유효한지 확인
    if (isNaN(quantity) || quantity < 1) {
      alert("유효한 수량을 입력해주세요.");
      return;
    }

    // 로컬 스토리지에서 기존 장바구니 불러오기
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 상품이 이미 장바구니에 있는지 확인
    const existingProductIndex = cart.findIndex(
      (item) => item.productId === v.productId
    );

    let totalQuantityInCart = quantity;
    if (existingProductIndex > -1) {
      // 장바구니에 이미 있는 경우, 기존 수량에 새 수량을 더함
      totalQuantityInCart += cart[existingProductIndex].quantity;
    }

    // 수량이 재고를 초과하는지 확인
    if (totalQuantityInCart > v.stock) {
      alert("수량이 재고를 초과하였습니다.");
      return;
    }

    // 상품이 이미 장바구니에 있는 경우 수량 업데이트
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity = totalQuantityInCart;
    } else {
      // 새로운 상품인 경우 추가
      cart.push({
        productId: v.productId,
        quantity: quantity,
      });
    }

    // 로컬 스토리지에 장바구니 저장
    localStorage.setItem("cart", JSON.stringify(cart));

    // 알림 표시
    alert("장바구니에 담겼습니다.");
  });

  // 결제 버튼 요소
  const checkoutButton = document.getElementById("checkout-button");

  checkoutButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);

    // 수량이 유효한지 확인
    if (isNaN(quantity) || quantity < 1) {
      alert("유효한 수량을 입력해주세요.");
      return;
    }

    // 로컬 스토리지에서 기존 장바구니 불러오기
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 상품이 이미 장바구니에 있는지 확인
    const existingProductIndex = cart.findIndex(
      (item) => item.productId === v.productId
    );

    let totalQuantityInCart = quantity;
    if (existingProductIndex > -1) {
      // 장바구니에 이미 있는 경우, 기존 수량에 새 수량을 더함
      totalQuantityInCart += cart[existingProductIndex].quantity;
    }

    // 수량이 재고를 초과하는지 확인
    if (totalQuantityInCart > v.stock) {
      alert("수량이 재고를 초과하였습니다.");
      return;
    }

    // 상품이 이미 장바구니에 있는 경우 수량 업데이트
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity = totalQuantityInCart;
    } else {
      // 새로운 상품인 경우 추가
      cart.push({
        productId: v.productId,
        quantity: quantity,
      });
    }

    // 로컬 스토리지에 장바구니 저장
    localStorage.setItem("cart", JSON.stringify(cart));

    // 알림 표시 및 장바구니 페이지로 이동
    alert("결제 페이지로 이동합니다.");
    window.location.href = "/cart"; // 장바구니 페이지로 리디렉션
  });
};

renderProductList();
