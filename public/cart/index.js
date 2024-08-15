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

const updateCartItemQuantity = (productId, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex((item) => item.productId === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const removeCartItem = (productId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems(); // Re-render cart items after removal
};

const renderCartItems = async () => {
  const productList = await fetchProductList();
  if (!productList) {
    console.log("empty productList");
    return;
  }

  const cartItemsContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>장바구니가 비어 있습니다.</p>";
    updateCartSummary(0, 0); // Update the total price and quantity to 0
    return;
  }

  // 장바구니 항목 그룹화
  const groupedCartItems = cart.reduce((acc, item) => {
    if (!acc[item.productId]) {
      acc[item.productId] = { ...item };
    } else {
      acc[item.productId].quantity += item.quantity;
    }
    return acc;
  }, {});

  // 장바구니 항목 렌더링
  cartItemsContainer.innerHTML = ""; // Clear previous content
  Object.values(groupedCartItems).forEach((cartItem) => {
    const product = productList.find((p) => p.productId === cartItem.productId);

    if (product) {
      const itemElem = document.createElement("div");
      itemElem.classList.add("cart-item");
      itemElem.innerHTML = `
            <img src="${product.imgUrl}" alt="${product.title}" />
            <div>
              <div>상품명: ${product.title}</div>
              <div>가격: ${product.price} 원</div>
              <div>상세설명: ${product.description}</div>
              <div>
                선택한 수량: 
                <input type="number" class="quantity-input" data-product-id="${product.productId}" value="${cartItem.quantity}" min="1" max="${product.stock}" style="width: 60px;" />
              </div>
              <button class="remove-button" data-product-id="${product.productId}">X</button>
            </div>
          `;
      cartItemsContainer.appendChild(itemElem);
    }
  });

  // 수량 조절 기능 이벤트 리스너
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const productId = parseInt(event.target.getAttribute("data-product-id"));
      const newQuantity = parseInt(event.target.value);

      if (newQuantity < 1) {
        alert("수량은 최소 1개 이상이어야 합니다.");
        event.target.value = 1;
        return;
      }

      const product = productList.find((p) => p.productId === productId);
      if (newQuantity > product.stock) {
        alert("재고 수량을 초과하였습니다.");
        event.target.value = product.stock;
        return;
      }

      // 장바구니 수량 업데이트
      updateCartItemQuantity(productId, newQuantity);
    });
  });

  // 항목 삭제 기능 이벤트 리스너
  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.getAttribute("data-product-id"));
      removeCartItem(productId);
    });
  });

  // 총 가격 및 상품 갯수 업데이트
  updateCartSummary();
};

const updateCartSummary = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = await fetchProductList();

  if (!productList) {
    document.getElementById("total-price").textContent = "총 가격: 0 원";
    document.getElementById("total-quantity").textContent =
      "총 상품 갯수: 0 개";
    return;
  }

  let totalPrice = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    const product = productList.find((p) => p.productId === cartItem.productId);
    if (product) {
      totalPrice += product.price * cartItem.quantity;
      totalQuantity += cartItem.quantity;
    }
  });

  document.getElementById(
    "total-price"
  ).textContent = `총 가격: ${totalPrice} 원`;
  document.getElementById(
    "total-quantity"
  ).textContent = `총 상품 갯수: ${totalQuantity} 개`;
};

document.getElementById("checkout-button").addEventListener("click", () => {
  // Handle checkout logic here
  alert("구매하기 버튼이 클릭되었습니다.");
});

renderCartItems();
