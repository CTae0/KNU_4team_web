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

  const quantityInput = document.getElementById("purchase-quantity");
  const errorElem = document.getElementById("quantity-error");

  quantityInput.addEventListener("input", () => {
    if (quantityInput.value > v.stock) {
      errorElem.style.display = "block";
    } else {
      errorElem.style.display = "none";
    }
  });

  const addToCartButton = document.getElementById("add-to-cart-button");

  addToCartButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
      alert("유효한 수량을 입력해주세요.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(
      (item) => item.productId === v.productId
    );

    let totalQuantityInCart = quantity;
    if (existingProductIndex > -1) {
      totalQuantityInCart += cart[existingProductIndex].quantity;
    }

    if (totalQuantityInCart > v.stock) {
      alert("수량이 재고를 초과하였습니다.");
      return;
    }

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity = totalQuantityInCart;
    } else {
      cart.push({
        productId: v.productId,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("장바구니에 담겼습니다.");
  });

  const checkoutButton = document.getElementById("checkout-button");

  checkoutButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
      alert("유효한 수량을 입력해주세요.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(
      (item) => item.productId === v.productId
    );

    let totalQuantityInCart = quantity;
    if (existingProductIndex > -1) {
      totalQuantityInCart += cart[existingProductIndex].quantity;
    }

    if (totalQuantityInCart > v.stock) {
      alert("수량이 재고를 초과하였습니다.");
      return;
    }

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity = totalQuantityInCart;
    } else {
      cart.push({
        productId: v.productId,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // 알림 표시 및 장바구니 페이지로 이동
    alert("장바구니 페이지로 이동합니다.");
    window.location.href = "/cart"; // 장바구니 페이지로 리디렉션
  });
};

renderProductList();
